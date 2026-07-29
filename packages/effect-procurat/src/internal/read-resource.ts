import { Effect, Schema } from 'effect';
import { ProcuratHttpClient } from '../http-client';
import { decodeJson } from './decode';
import { operation } from './operation';

/** Shared body for the read-only reference endpoints: list-all plus find-by-id. */
export const makeReadResource = <A, I>(options: {
  readonly name: string;
  readonly path: string;
  readonly schema: Schema.Codec<A, I>;
}) =>
  Effect.gen(function* () {
    const http = yield* ProcuratHttpClient;

    const findAll = operation(`${options.name}.findAll`, () =>
      http.get(options.path).pipe(Effect.flatMap(decodeJson(Schema.Array(options.schema)))),
    );

    const findById = operation(`${options.name}.findById`, (params: { id: number }) =>
      http.get(`${options.path}/${params.id}`).pipe(Effect.flatMap(decodeJson(options.schema))),
    );

    return { findAll, findById };
  });
