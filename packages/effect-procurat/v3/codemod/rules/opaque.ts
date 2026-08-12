import { type ClassDeclaration, Node, type SourceFile } from 'ts-morph';

import { memberName, rewriteUntilDone, type RewriteRule, unhandled } from '../rule';

/** The `Schema.Struct({...})` of `class X extends Schema.Opaque<X>()(Schema.Struct({...})) {}`. */
const opaquePayload = (declaration: ClassDeclaration) => {
  const extended = declaration.getExtends()?.getExpression();
  if (extended === undefined || !Node.isCallExpression(extended)) return undefined;
  const constructor = extended.getExpression();
  if (!Node.isCallExpression(constructor) || memberName(constructor, 'Schema') !== 'Opaque') return undefined;
  return extended;
};

const findOpaqueClass = (file: SourceFile): ClassDeclaration | undefined =>
  file.getClasses().find((declaration) => opaquePayload(declaration) !== undefined);

/**
 * v3 has no opaque wrapper. The struct becomes a plain const and the class name
 * survives as a type alias, so both the value and the type call sites keep working.
 */
export const opaqueStruct = (): RewriteRule => ({
  name: 'schema-opaque',
  claims: ['Schema.Opaque'],
  apply: (file) =>
    rewriteUntilDone(file, findOpaqueClass, (declaration) => {
      const call = opaquePayload(declaration)!;
      const name = declaration.getName();
      if (name === undefined) unhandled(declaration, 'Schema.Opaque on an unnamed class');
      if (declaration.getMembers().length > 0) unhandled(declaration, 'Schema.Opaque class with a body');

      const [payload, ...rest] = call.getArguments();
      if (payload === undefined || rest.length > 0) unhandled(call, 'Schema.Opaque outside the (schema) form');

      const docs = declaration
        .getJsDocs()
        .map((doc) => `${doc.getText()}\n`)
        .join('');
      const exported = declaration.isExported() ? 'export ' : '';
      declaration.replaceWithText(
        `${docs}${exported}const ${name} = ${payload.getText()};\n\n${exported}type ${name} = typeof ${name}.Type;`,
      );
    }),
});
