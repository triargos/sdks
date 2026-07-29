import { Context, Layer } from 'effect';
import { makeReadResource } from '../../internal/read-resource';
import { Religion } from './religion-schema';

export class ProcuratReligion extends Context.Service<ProcuratReligion>()('ProcuratReligion', {
  make: makeReadResource({ name: 'religion', path: '/religions', schema: Religion }),
}) {
  static readonly layer = Layer.effect(this)(this.make);
}
