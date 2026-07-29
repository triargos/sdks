import { Context, Layer } from 'effect';
import { makeReadResource } from '../../internal/read-resource';
import { County } from './county-schema';

export class ProcuratCounty extends Context.Service<ProcuratCounty>()('ProcuratCounty', {
  make: makeReadResource({ name: 'county', path: '/districts', schema: County }),
}) {
  static readonly layer = Layer.effect(this)(this.make);
}
