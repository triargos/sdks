import { Node, SyntaxKind } from 'ts-morph';

import type { RewriteRule } from '../rule';

/** Runs last: the rules above are what leave an import dead. */
export const unusedImports = (): RewriteRule => ({
  name: 'unused-imports',
  claims: [],
  apply: (file) => {
    const used = new Set(
      file
        .getDescendantsOfKind(SyntaxKind.Identifier)
        .filter((identifier) => !Node.isImportSpecifier(identifier.getParent()))
        .map((identifier) => identifier.getText()),
    );
    for (const declaration of file.getImportDeclarations()) {
      const named = declaration.getNamedImports();
      if (named.length === 0) continue;
      for (const specifier of named) {
        const local = (specifier.getAliasNode() ?? specifier.getNameNode()).getText();
        if (!used.has(local)) specifier.remove();
      }
      if (declaration.getNamedImports().length === 0) declaration.remove();
    }
  },
});
