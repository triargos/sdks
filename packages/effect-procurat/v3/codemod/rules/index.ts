import type { RewriteRule } from '../rule';
import { configErrorType } from './config';
import { catchAllErrors, deleteRequest } from './http-client';
import { httpModuleSpecifiers, schemaErrorType } from './imports';
import { unwrapEffect } from './layer';
import { contextService, contextServiceShape } from './context';
import { opaqueStruct } from './opaque';
import { codecType, decodeUnknown, literalPick, literals, optionalKey, record, union } from './schema';
import { unusedImports } from './unused-imports';

/**
 * Rules run in this order and each one sees the previous ones' output. Three
 * constraints on placement:
 *
 * - imports first, so a later rule reads the module names it expects.
 * - inner before outer — a rule that reprints a whole declaration emits the text
 *   its children already carry, so `Schema.Opaque` and `Context.Service` run after
 *   the rules that rewrite what sits inside them.
 * - `unused-imports` last: it is the rules above that leave an import dead.
 */
export const rules: ReadonlyArray<RewriteRule> = [
  httpModuleSpecifiers(),
  schemaErrorType(),
  literals(),
  literalPick(),
  union(),
  optionalKey(),
  record(),
  codecType(),
  decodeUnknown(),
  configErrorType(),
  unwrapEffect(),
  catchAllErrors(),
  deleteRequest(),
  opaqueStruct(),
  contextServiceShape(),
  contextService(),
  unusedImports(),
];
