import { Schema } from 'effect';

/** What `GET /health` reports about the installation behind the API. */
export const Health = Schema.Struct({
  databaseVersion: Schema.Number,
  build: Schema.Number,
  productionVersion: Schema.String,
  databaseValid: Schema.Boolean,
  databaseLocked: Schema.Boolean,
  nightShiftManagerRunning: Schema.Boolean,
  isProduction: Schema.Boolean,
  centralSqlCommandEnabled: Schema.Boolean,
  /** Kept raw: the API declares a plain string and names no format. Null until a first update runs. */
  lastUpdateStart: Schema.NullOr(Schema.String),
  lastUpdateEnd: Schema.NullOr(Schema.String),
  lastUpdateFailed: Schema.NullOr(Schema.String),
});
export type Health = typeof Health.Type;
