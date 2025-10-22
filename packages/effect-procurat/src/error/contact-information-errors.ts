import { Schema } from 'effect';
import { CreateContactInformationSchema } from '../schema/contact-information-schema';
import { ProcuratBadRequestError, ProcuratServerError } from './procurat-errors';

export class CreateContactInformationError extends Schema.TaggedError<CreateContactInformationError>()(
  'CreateContactInformationError',
  {
    cause: Schema.Union(ProcuratBadRequestError, ProcuratServerError),
    data: CreateContactInformationSchema,
  },
) {}

export class FindContactInformationByPersonError extends Schema.TaggedError<FindContactInformationByPersonError>()(
  'FindContactInformationByPersonError',
  {
    cause: ProcuratServerError,
    personId: Schema.Number,
  },
) {}
