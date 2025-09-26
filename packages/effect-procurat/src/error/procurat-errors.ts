import { Schema } from 'effect';

export class ProcuratErrorSchema extends Schema.Class<ProcuratErrorSchema>('ProcuratErrorSchema')({
  code: Schema.Number,
  message: Schema.String,
}) {}

export const ProcuratErrorDetailsSchema = Schema.Struct({
  status: Schema.Number,
  message: Schema.String,
  endpoint: Schema.String,
});

export class ProcuratNotFoundError extends Schema.TaggedError<ProcuratNotFoundError>()(
  'ProcuratNotFoundError',
  ProcuratErrorDetailsSchema,
) {}

export class ProcuratUnauthorizedError extends Schema.TaggedError<ProcuratUnauthorizedError>()(
  'ProcuratUnauthorizedError',
  ProcuratErrorDetailsSchema,
) {}

export class ProcuratServerError extends Schema.TaggedError<ProcuratServerError>()(
  'ProcuratServerError',
  ProcuratErrorDetailsSchema,
) {}

export class ProcuratBadRequestError extends Schema.TaggedError<ProcuratBadRequestError>()(
  'ProcuratBadRequestError',
  ProcuratErrorDetailsSchema,
) {}