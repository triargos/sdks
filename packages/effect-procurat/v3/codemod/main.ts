import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, symlinkSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

import { Project } from 'ts-morph';

import { identicalInV3 } from './identical';
import { UnhandledShape } from './rule';
import { rules } from './rules';
import { scanUnclaimed } from './scan';

const packageRoot = path.resolve(import.meta.dirname, '../..');
const sourceRoot = path.join(packageRoot, 'src');
const v3Root = path.join(packageRoot, 'v3');
const generatedRoot = path.join(v3Root, 'generated');
const overridesRoot = path.join(v3Root, 'overrides');
const distRoot = path.join(packageRoot, 'dist', 'v3');

const relativeSourceFiles = (root: string): ReadonlyArray<string> => {
  if (!existsSync(root)) return [];
  return readdirSync(root, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.ts'))
    .map((entry) => path.relative(root, path.join(entry.parentPath, entry.name)));
};

const generate = (): void => {
  const overridden = new Set(relativeSourceFiles(overridesRoot));

  // No tsconfig: every rule is syntax-level, so the type checker never loads.
  const project = new Project({ skipAddingFilesFromTsConfig: true });
  project.addSourceFilesAtPaths(path.join(sourceRoot, '**/*.ts'));
  const files = project
    .getSourceFiles()
    .filter((file) => !overridden.has(path.relative(sourceRoot, file.getFilePath())));

  const claimed = new Set<string>([...identicalInV3, ...rules.flatMap((rule) => [...rule.claims])]);
  const unclaimed = scanUnclaimed(files, claimed);
  if (unclaimed.length > 0) {
    console.error('Unhandled Effect v4 constructs — add a rule in v3/codemod/rules:\n');
    for (const { construct, file, line } of unclaimed) {
      console.error(`  ${construct}\n    ${path.relative(packageRoot, file)}:${line}`);
    }
    process.exit(1);
  }

  for (const file of files) {
    for (const rule of rules) {
      try {
        rule.apply(file);
      } catch (cause) {
        if (cause instanceof UnhandledShape) {
          console.error(`Rule "${rule.name}" met a shape it does not handle:\n${cause.message}`);
          process.exit(1);
        }
        throw cause;
      }
    }
    file.formatText();
  }

  rmSync(generatedRoot, { recursive: true, force: true });
  for (const file of files) {
    const target = path.join(generatedRoot, path.relative(sourceRoot, file.getFilePath()));
    mkdirSync(path.dirname(target), { recursive: true });
    project.getFileSystem().writeFileSync(target, file.getFullText());
  }
  for (const relative of overridden) {
    const target = path.join(generatedRoot, relative);
    mkdirSync(path.dirname(target), { recursive: true });
    cpSync(path.join(overridesRoot, relative), target);
  }

  console.log(`Generated ${files.length} rewritten and ${overridden.size} overridden file(s) in v3/generated`);
};

const run = (command: string, args: ReadonlyArray<string>): void => {
  execFileSync(command, [...args], { cwd: v3Root, stdio: 'inherit' });
};

/**
 * The v3 tree is the only `effect@3` install in the repo. CI always starts without
 * it; locally it survives between runs, so the lockfile install is skipped.
 */
const installV3Dependencies = (): void => {
  if (existsSync(path.join(v3Root, 'node_modules'))) return;
  run('npm', [existsSync(path.join(v3Root, 'package-lock.json')) ? 'ci' : 'install']);
};

const build = (): void => {
  generate();
  installV3Dependencies();
  run('npx', ['--no-install', 'tsc', '--noEmit', '-p', 'tsconfig.generated.json']);
  run('npx', ['--no-install', 'tsdown']);
};

/**
 * Points node's resolver at the v3 dependency tree so the smoke tests exercise the
 * published artifact instead of a stand-in. Without it `dist/v3` would resolve
 * `effect` from the package's own node_modules — v4.
 */
const linkV3Dependencies = (): void => {
  const link = path.join(distRoot, 'node_modules');
  rmSync(link, { recursive: true, force: true });
  symlinkSync(path.join(v3Root, 'node_modules'), link, 'junction');
};

const check = (): void => {
  build();
  linkV3Dependencies();
  try {
    run('npx', ['--no-install', 'tsc', '--noEmit', '-p', 'tsconfig.test.json']);
    run('npx', ['--no-install', 'vitest', 'run']);
  } finally {
    // The link must not survive into `npm pack`.
    rmSync(path.join(distRoot, 'node_modules'), { recursive: true, force: true });
  }
  console.log('v3 SDK generated, typechecked, built and smoke-tested');
};

const command = process.argv[2];
if (command === 'generate') generate();
else if (command === 'build') build();
else if (command === 'check') check();
else {
  console.error('usage: main.ts <generate|build|check>');
  process.exit(1);
}
