import { type CallExpression, Node } from 'ts-morph';

import { eachCall, memberName, renameMember, renameTypeMember, type RewriteRule, unhandled } from '../rule';

/** v4 takes the members as one array; v3 takes them variadic. */
const spreadArrayArgument = (call: CallExpression): string => {
  const [argument, ...rest] = call.getArguments();
  if (argument === undefined || rest.length > 0 || !Node.isArrayLiteralExpression(argument)) {
    unhandled(call, 'expected exactly one array literal argument');
  }
  return argument
    .getElements()
    .map((element) => element.getText())
    .join(', ');
};

export const literals = (): RewriteRule => ({
  name: 'schema-literals',
  claims: ['Schema.Literals'],
  apply: (file) =>
    eachCall(file, (call) => {
      if (memberName(call, 'Schema') !== 'Literals') return;
      call.replaceWithText(`Schema.Literal(${spreadArrayArgument(call)})`);
    }),
});

/**
 * v4 narrows a literal schema with `.pick([...])`; v3 has no such method, so the
 * narrowed set becomes a fresh `Schema.Literal`.
 *
 * `.pick` also exists on a v4 struct with the same spelling, so the rule only fires
 * on a receiver this file declares as a literal schema and refuses everything else.
 */
export const literalPick = (): RewriteRule => ({
  name: 'schema-literal-pick',
  claims: [],
  apply: (file) => {
    // Runs after `literals()`, so the initializer already reads `Schema.Literal(`.
    const literalSchemas = new Set(
      file
        .getVariableDeclarations()
        .filter((declaration) => declaration.getInitializer()?.getText().startsWith('Schema.Literal('))
        .map((declaration) => declaration.getName()),
    );
    eachCall(file, (call) => {
      const callee = call.getExpression();
      if (!Node.isPropertyAccessExpression(callee) || callee.getName() !== 'pick') return;
      if (!literalSchemas.has(callee.getExpression().getText())) {
        unhandled(call, '`.pick` on something other than a literal schema declared in this file');
      }
      call.replaceWithText(`Schema.Literal(${spreadArrayArgument(call)})`);
    });
  },
});

export const union = (): RewriteRule => ({
  name: 'schema-union',
  claims: ['Schema.Union'],
  apply: (file) =>
    eachCall(file, (call) => {
      if (memberName(call, 'Schema') !== 'Union') return;
      call.replaceWithText(`Schema.Union(${spreadArrayArgument(call)})`);
    }),
});

export const optionalKey = (): RewriteRule => ({
  name: 'schema-optional-key',
  claims: ['Schema.optionalKey'],
  apply: (file) =>
    eachCall(file, (call) => {
      if (memberName(call, 'Schema') !== 'optionalKey') return;
      const [value, ...rest] = call.getArguments();
      if (value === undefined || rest.length > 0) unhandled(call, 'optionalKey outside the (schema) form');
      // Plain v3 `optional` also widens the field with `undefined`. `exact` is the
      // v4 `optionalKey` meaning: the key may be absent, nothing more.
      call.replaceWithText(`Schema.optionalWith(${value.getText()}, { exact: true })`);
    }),
});

export const record = (): RewriteRule => ({
  name: 'schema-record',
  claims: ['Schema.Record'],
  apply: (file) =>
    eachCall(file, (call) => {
      if (memberName(call, 'Schema') !== 'Record') return;
      const [key, value, ...rest] = call.getArguments();
      if (key === undefined || value === undefined || rest.length > 0) {
        unhandled(call, 'Schema.Record outside the (key, value) form');
      }
      call.replaceWithText(`Schema.Record({ key: ${key.getText()}, value: ${value.getText()} })`);
    }),
});

/** v4 splits schema and codec; v3 has one `Schema.Schema<A, I, R>`. */
export const codecType = (): RewriteRule => ({
  name: 'schema-codec-type',
  claims: ['Schema.Codec'],
  apply: (file) => renameTypeMember(file, 'Schema', 'Codec', 'Schema'),
});

export const decodeUnknown = (): RewriteRule => ({
  name: 'schema-decode-unknown',
  claims: ['Schema.decodeUnknownEffect'],
  apply: (file) => renameMember(file, 'Schema', 'decodeUnknownEffect', 'decodeUnknown'),
});
