import { Data } from 'effect';
import type { CreateContactInformationSchema } from '../schema/contact-information-schema';
import { ProcuratBadRequestError, ProcuratServerError } from './procurat-errors';

export class CreateContactInformationError extends Data.TaggedError('CreateContactInformationError')<{
  readonly cause: ProcuratBadRequestError | ProcuratServerError;
  readonly data: CreateContactInformationSchema;
}> {}

export class FindContactInformationByPersonError extends Data.TaggedError('FindContactInformationByPersonError')<{
  readonly cause: ProcuratServerError;
  readonly personId: number;
}> {}
