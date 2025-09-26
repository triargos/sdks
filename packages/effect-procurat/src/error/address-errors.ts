import { Schema } from 'effect';
import { CreateAddressSchema } from '../schema/address-schema';
import { ProcuratBadRequestError, ProcuratNotFoundError, ProcuratServerError } from './procurat-errors';

export class ListAddressesError extends Schema.TaggedError<ListAddressesError>()('ListAddressesError', {
  cause: ProcuratServerError,
}) {}

export class AddressNotFoundError extends Schema.TaggedError<AddressNotFoundError>()('AddressNotFoundError', {
  cause: ProcuratNotFoundError,
  addressId: Schema.Number,
}) {}

export class FindAddressError extends Schema.TaggedError<FindAddressError>()('FindAddressError', {
  cause: ProcuratServerError,
  addressId: Schema.Number,
}) {}

export class CreateAddressError extends Schema.TaggedError<CreateAddressSchema>()("CreatAddressError", {
  cause: Schema.Union(ProcuratServerError, ProcuratBadRequestError),
  data: CreateAddressSchema
}) {}