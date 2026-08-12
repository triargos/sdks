import { type CallExpression, type Node, type SourceFile, SyntaxKind } from 'ts-morph';

/**
 * A v4 construct a rule takes responsibility for: a module specifier
 * (`"effect/unstable/http"`) or a namespace member (`"Schema.Literals"`).
 */
export type Claim = string;

export interface RewriteRule {
  readonly name: string;
  readonly claims: ReadonlyArray<Claim>;
  readonly apply: (file: SourceFile) => void;
}

/**
 * A rule met a shape it was not written for. Same contract as an unclaimed
 * construct: stop, name the spot, add a rule — never guess.
 */
export class UnhandledShape extends Error {
  constructor(node: Node, what: string) {
    const file = node.getSourceFile().getFilePath();
    const line = node.getStartLineNumber();
    super(`${what} at ${file}:${line}\n  ${node.getText().slice(0, 200)}`);
    this.name = 'UnhandledShape';
  }
}

/** Declared as a function so TypeScript narrows control flow after a call. */
export function unhandled(node: Node, what: string): never {
  throw new UnhandledShape(node, what);
}

/**
 * Visits calls children-first so a rule that replaces a whole expression only
 * ever swallows text its inner rewrites already produced.
 */
export const eachCall = (file: SourceFile, visit: (call: CallExpression) => void): void => {
  for (const call of file.getDescendantsOfKind(SyntaxKind.CallExpression).reverse()) {
    if (call.wasForgotten()) continue;
    visit(call);
  }
};

/**
 * Rewrites one node per pass and re-reads the file between passes.
 *
 * A rule that replaces a whole statement re-parses the file, which forgets every
 * other node the rule is holding. `select` runs against a fresh tree each time.
 */
export const rewriteUntilDone = <A extends Node>(
  file: SourceFile,
  select: (file: SourceFile) => A | undefined,
  rewrite: (node: A) => void,
): void => {
  for (;;) {
    const node = select(file);
    if (node === undefined) return;
    rewrite(node);
  }
};

export const ensureNamedImport = (file: SourceFile, moduleSpecifier: string, name: string): void => {
  const existing = file.getImportDeclaration(
    (declaration) => declaration.getModuleSpecifierValue() === moduleSpecifier,
  );
  if (!existing) {
    file.addImportDeclaration({ moduleSpecifier, namedImports: [name] });
    return;
  }
  if (existing.getNamedImports().some((named) => named.getName() === name)) return;
  existing.addNamedImport(name);
};

/** `Literals` for the callee of `Schema.Literals([...])`, else undefined. */
export const memberName = (call: CallExpression, namespace: string): string | undefined => {
  const callee = call.getExpression();
  if (!callee.isKind(SyntaxKind.PropertyAccessExpression)) return undefined;
  if (callee.getExpression().getText() !== namespace) return undefined;
  return callee.getName();
};

/** Renames `Namespace.member` in value positions, e.g. `Layer.unwrap` -> `Layer.unwrapEffect`. */
export const renameMember = (file: SourceFile, namespace: string, from: string, to: string): void => {
  for (const access of file.getDescendantsOfKind(SyntaxKind.PropertyAccessExpression).reverse()) {
    if (access.wasForgotten()) continue;
    if (access.getExpression().getText() !== namespace || access.getName() !== from) continue;
    access.getNameNode().replaceWithText(to);
  }
};

/** Renames `Namespace.Member` in type positions, e.g. `Schema.Codec<A, I>` -> `Schema.Schema<A, I>`. */
export const renameTypeMember = (file: SourceFile, namespace: string, from: string, to: string): void => {
  for (const qualified of file.getDescendantsOfKind(SyntaxKind.QualifiedName).reverse()) {
    if (qualified.wasForgotten()) continue;
    if (qualified.getLeft().getText() !== namespace || qualified.getRight().getText() !== from) continue;
    qualified.getRight().replaceWithText(to);
  }
};
