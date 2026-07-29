import { Schema } from 'effect';

/** Procurat's error envelope. Not part of the public surface — see `matchError`. */
export const ProcuratErrorSchema = Schema.Struct({
  code: Schema.Number,
  error: Schema.String,
});
