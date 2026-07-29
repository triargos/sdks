import { Data } from 'effect';
import type { ContactPersonCreationSchema } from '../schema/communication-schema';
import { ProcuratBadRequestError, ProcuratServerError } from './procurat-errors';

export class CreateContactPersonError extends Data.TaggedError('CreateContactPersonError')<{
  readonly cause: ProcuratBadRequestError | ProcuratServerError;
  readonly data: ContactPersonCreationSchema;
}> {}
