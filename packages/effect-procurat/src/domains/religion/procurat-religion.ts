import { Context, Effect, Layer, Schema } from 'effect';
import { HttpClientResponse } from '@effect/platform';
import { ProcuratHttpClient } from '../../shared/http-client';
import { ProcuratError, UnknownProcuratError } from '../../shared/errors';
import { ReligionSchema } from './religion-schema';
import { ReligionNotFound } from './religion-errors';

const make = Effect.gen(function* () {
  const http = yield* ProcuratHttpClient;

  const findAll: () => Effect.Effect<
    ReadonlyArray<ReligionSchema>,
    ProcuratError | UnknownProcuratError
  > = Effect.fn('religion.findAll')(function* () {
    return yield* http.get('/religions').pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Schema.Array(ReligionSchema))),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  const findById: (args: {
    id: number;
  }) => Effect.Effect<
    ReligionSchema,
    ReligionNotFound | ProcuratError | UnknownProcuratError
  > = Effect.fn('religion.findById')(function* ({ id }: { id: number }) {
    return yield* http.get(`/religions/${id}`).pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(ReligionSchema)),
      Effect.catchTag('ProcuratError', (e): Effect.Effect<never, ReligionNotFound | ProcuratError> =>
        e.status === 404 ? Effect.fail(new ReligionNotFound({ religionId: id })) : Effect.fail(e),
      ),
      Effect.catchTags({
        RequestError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ResponseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
        ParseError: (e) => new UnknownProcuratError({ message: e.message, cause: e }),
      }),
    );
  });

  return { findAll, findById };
});

export class ProcuratReligion extends Context.Tag('@triargos/procurat/Religion')<
  ProcuratReligion,
  Effect.Effect.Success<typeof make>
>() {
  static layer = Layer.effect(ProcuratReligion, make);
}
