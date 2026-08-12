import { Schema } from 'effect';

// v4 takes the members as one array (`Schema.Literals<L>`); v3 takes them variadic,
// so the literal tuple must be non-empty and spread back into `Schema.Literal`.
export const membersOf =
  <const L extends readonly [string, ...Array<string>]>(schema: Schema.Literal<[...L]>) =>
  <const T extends Readonly<Record<string, L[number]>>>(
    members: T &
      (L[number] extends T[keyof T] ? unknown : { readonly MISSING_MEMBERS: Exclude<L[number], T[keyof T]> }),
  ): T =>
    members;
