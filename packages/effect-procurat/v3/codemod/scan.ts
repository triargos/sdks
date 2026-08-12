import { Node, type SourceFile, SyntaxKind } from 'ts-morph';

export interface UnclaimedConstruct {
  readonly construct: string;
  readonly file: string;
  readonly line: number;
}

const isEffectModule = (specifier: string) => specifier === 'effect' || specifier.startsWith('effect/');

/**
 * Every Effect construct the v4 SDK reaches for, as `"Namespace.member"` plus the
 * module specifiers it imports from.
 *
 * Scans the v4 sources, not the rewritten output: an unclaimed construct is
 * reported at the line the author is editing.
 *
 * `tsc` against real v3 typings already catches anything v3 does not have. This
 * catches the dangerous half `tsc` cannot see — constructs that exist in both
 * majors and mean different things (`Schema.Date`, `Schema.optional`).
 */
export const scanUnclaimed = (
  files: ReadonlyArray<SourceFile>,
  claimed: ReadonlySet<string>,
): ReadonlyArray<UnclaimedConstruct> => {
  const unclaimed: Array<UnclaimedConstruct> = [];
  const seen = new Set<string>();

  const record = (construct: string, node: Node) => {
    if (claimed.has(construct)) return;
    const file = node.getSourceFile().getFilePath();
    const line = node.getStartLineNumber();
    const key = `${construct}@${file}:${line}`;
    if (seen.has(key)) return;
    seen.add(key);
    unclaimed.push({ construct, file, line });
  };

  for (const file of files) {
    const namespaces = new Set<string>();

    for (const declaration of file.getImportDeclarations()) {
      const specifier = declaration.getModuleSpecifierValue();
      if (!isEffectModule(specifier)) continue;
      record(specifier, declaration);
      for (const named of declaration.getNamedImports()) {
        namespaces.add((named.getAliasNode() ?? named.getNameNode()).getText());
      }
      const namespaceImport = declaration.getNamespaceImport();
      if (namespaceImport) namespaces.add(namespaceImport.getText());
    }

    for (const identifier of file.getDescendantsOfKind(SyntaxKind.Identifier)) {
      if (!namespaces.has(identifier.getText())) continue;
      const parent = identifier.getParent();
      if (Node.isImportSpecifier(parent) || Node.isNamespaceImport(parent)) continue;
      // The member half of `Layer.Layer` / `Effect.Effect` — already recorded whole.
      if (Node.isQualifiedName(parent) && parent.getRight() === identifier) continue;
      if (Node.isPropertyAccessExpression(parent) && parent.getNameNode() === identifier) continue;

      if (Node.isPropertyAccessExpression(parent) && parent.getExpression() === identifier) {
        record(`${identifier.getText()}.${parent.getName()}`, identifier);
      } else if (Node.isQualifiedName(parent) && parent.getLeft() === identifier) {
        record(`${identifier.getText()}.${parent.getRight().getText()}`, identifier);
      } else {
        record(identifier.getText(), identifier);
      }
    }
  }

  return unclaimed;
};
