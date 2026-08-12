import { type CallExpression, type ClassDeclaration, Node, type SourceFile, SyntaxKind } from 'ts-morph';

import { ensureNamedImport, memberName, rewriteUntilDone, type RewriteRule, unhandled } from '../rule';

/** The `Context.Service<Self, Shape>()(...)` call of an `extends` clause. */
const serviceCall = (declaration: ClassDeclaration): CallExpression | undefined => {
  const extended = declaration.getExtends()?.getExpression();
  if (extended === undefined || !Node.isCallExpression(extended)) return undefined;
  const constructor = extended.getExpression();
  if (!Node.isCallExpression(constructor) || memberName(constructor, 'Context') !== 'Service') return undefined;
  return extended;
};

const findServiceClass = (file: SourceFile): ClassDeclaration | undefined =>
  file.getClasses().find((declaration) => serviceCall(declaration) !== undefined);

/**
 * v4 `Context.Service` is one construct with two forms. v3 splits them:
 *
 * - `Context.Service<Self, Shape>()(tag)` is a plain key -> `Context.Tag(tag)<Self, Shape>()`.
 * - `Context.Service<Self>()(tag, { make })` also infers the shape from `make`.
 *   v3 `Context.Tag` cannot infer, so `make` is hoisted to a const and the shape
 *   is read back off it.
 */
export const contextService = (): RewriteRule => ({
  name: 'context-service',
  claims: ['Context.Service'],
  apply: (file) =>
    rewriteUntilDone(file, findServiceClass, (declaration) => {
      const call = serviceCall(declaration)!;
      const constructor = call.getExpression() as CallExpression;
      const className = declaration.getName();
      if (className === undefined) unhandled(declaration, 'Context.Service on an unnamed class');

      const [self, shape] = constructor.getTypeArguments();
      const [tag, options, ...rest] = call.getArguments();
      if (self === undefined || tag === undefined || rest.length > 0) {
        unhandled(call, 'Context.Service outside the <Self, Shape?>()(tag, options?) form');
      }

      if (options === undefined) {
        if (shape === undefined) unhandled(constructor, 'Context.Service without a make needs a Shape type argument');
        call.replaceWithText(`Context.Tag(${tag.getText()})<${self.getText()}, ${shape.getText()}>()`);
        return;
      }

      if (shape !== undefined) unhandled(constructor, 'Context.Service with both a Shape type argument and a make');
      if (!Node.isObjectLiteralExpression(options))
        unhandled(options, 'Context.Service options must be an object literal');
      const properties = options.getProperties();
      const [make] = properties;
      if (
        properties.length !== 1 ||
        make === undefined ||
        !Node.isPropertyAssignment(make) ||
        make.getName() !== 'make'
      ) {
        unhandled(options, 'Context.Service options other than a single `make`');
      }

      const makeName = `make${className}`;
      const makeText = make.getInitializerOrThrow().getText();

      ensureNamedImport(file, 'effect', 'Effect');
      call.replaceWithText(
        `Context.Tag(${tag.getText()})<${self.getText()}, Effect.Effect.Success<typeof ${makeName}>>()`,
      );
      declaration.insertProperty(0, { isStatic: true, isReadonly: true, name: 'make', initializer: makeName });
      file.insertStatements(declaration.getChildIndex(), `const ${makeName} = ${makeText};\n`);
    }),
});

export const contextServiceShape = (): RewriteRule => ({
  name: 'context-service-shape',
  claims: [],
  apply: (file) => {
    for (const qualified of file.getDescendantsOfKind(SyntaxKind.QualifiedName).reverse()) {
      if (qualified.wasForgotten() || qualified.getText() !== 'Context.Service.Shape') continue;
      qualified.replaceWithText('Context.Tag.Service');
    }
  },
});
