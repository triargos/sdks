import { Context, Layer } from 'effect';
import { makeReadResource } from '../internal/read-resource';
import { Country } from '../schema/country-schema';

export class ProcuratCountry extends Context.Service<ProcuratCountry>()('ProcuratCountry', {
  make: makeReadResource({ name: 'country', path: '/countries', schema: Country }),
}) {
  static readonly layer = Layer.effect(this)(this.make);
}
