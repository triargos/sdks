import { Schema } from 'effect';
import { ContactPersonCreationSchema } from '../schema/communication-schema';
import { ProcuratBadRequestError, ProcuratServerError } from './procurat-errors';

export class CreateContactPersonError extends Schema.TaggedError<CreateContactPersonError>()(
  'CreateContactPersonError',
  {
    cause: Schema.Union(ProcuratBadRequestError, ProcuratServerError),
    data: Schema.Unknown,
  },
) {}
