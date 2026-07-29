import { Schema } from 'effect';

export const membersOf =
  <const L extends ReadonlyArray<string>>(schema: Schema.Literals<L>) =>
  <const T extends Readonly<Record<string, L[number]>>>(
    members: T &
      (L[number] extends T[keyof T] ? unknown : { readonly MISSING_MEMBERS: Exclude<L[number], T[keyof T]> }),
  ): T =>
    members;
