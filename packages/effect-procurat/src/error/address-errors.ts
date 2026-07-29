import { Data } from 'effect';
import type { CreateAddressSchema } from '../schema/address-schema';
import { ProcuratBadRequestError, ProcuratNotFoundError, ProcuratServerError } from './procurat-errors';

export class ListAddressesError extends Data.TaggedError('ListAddressesError')<{
  readonly cause: ProcuratServerError;
}> {}

export class AddressNotFoundError extends Data.TaggedError('AddressNotFoundError')<{
  readonly cause: ProcuratNotFoundError;
  readonly addressId: number;
}> {}

export class FindAddressError extends Data.TaggedError('FindAddressError')<{
  readonly cause: ProcuratServerError;
  readonly addressId: number;
}> {}

export class CreateAddressError extends Data.TaggedError('CreatAddressError')<{
  readonly cause: ProcuratServerError | ProcuratBadRequestError;
  readonly data: CreateAddressSchema;
}> {}
