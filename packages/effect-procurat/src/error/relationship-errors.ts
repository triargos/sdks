import { Data } from 'effect';
import { ProcuratBadRequestError, ProcuratServerError } from './procurat-errors';

export class CreateRelationshipError extends Data.TaggedError('CreateRelationshipError')<{
  readonly cause: ProcuratServerError | ProcuratBadRequestError;
  readonly kind: 'addChildToParent' | 'addParentToChild';
  readonly personToAddId: number;
  readonly basePersonId: number;
}> {}

export class ListRelationshipsError extends Data.TaggedError('ListRelationshipsError')<{
  readonly cause: ProcuratServerError | ProcuratBadRequestError;
  readonly personId: number;
}> {}
