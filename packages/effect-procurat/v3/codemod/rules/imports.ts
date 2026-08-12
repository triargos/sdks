import { Node, SyntaxKind } from 'ts-morph';

import { type RewriteRule, unhandled } from '../rule';

/** v4 ships the HTTP stack inside `effect`; v3 keeps it in `@effect/platform`. */
const MODULES: Record<string, string> = {
  'effect/unstable/http': '@effect/platform',
  'effect/unstable/http/HttpClientError': '@effect/platform/HttpClientError',
  'effect/unstable/http/HttpClientResponse': '@effect/platform/HttpClientResponse',
};

export const httpModuleSpecifiers = (): RewriteRule => ({
  name: 'http-module-specifiers',
  claims: Object.keys(MODULES),
  apply: (file) => {
    for (const declaration of file.getImportDeclarations()) {
      const specifier = declaration.getModuleSpecifierValue();
      if (!specifier.startsWith('effect/unstable/')) continue;
      const v3 = MODULES[specifier];
      if (v3 === undefined) unhandled(declaration, `no v3 module for \`${specifier}\``);
      declaration.setModuleSpecifier(v3);
    }
  },
});

/**
 * v4 raises `SchemaError` from `effect/SchemaError`; v3 raises `ParseError` from
 * `effect/ParseResult`. Only the type is imported here, so the rename is local.
 */
export const schemaErrorType = (): RewriteRule => ({
  name: 'schema-error-type',
  claims: ['effect/SchemaError', 'SchemaError'],
  apply: (file) => {
    const declaration = file.getImportDeclaration(
      (candidate) => candidate.getModuleSpecifierValue() === 'effect/SchemaError',
    );
    if (declaration === undefined) return;

    const named = declaration.getNamedImports();
    if (named.length !== 1 || named[0]!.getName() !== 'SchemaError') {
      unhandled(declaration, 'effect/SchemaError imported as something other than `SchemaError`');
    }
    declaration.setModuleSpecifier('effect/ParseResult');
    named[0]!.getNameNode().replaceWithText('ParseError');

    for (const identifier of file.getDescendantsOfKind(SyntaxKind.Identifier).reverse()) {
      if (identifier.wasForgotten() || identifier.getText() !== 'SchemaError') continue;
      if (Node.isImportSpecifier(identifier.getParent())) continue;
      identifier.replaceWithText('ParseError');
    }
  },
});
