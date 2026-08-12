import { Schema } from 'effect';

/** What `GET /health` reports about the installation behind the API. */
export class Health extends Schema.Class<Health>('Health')({
  databaseVersion: Schema.Number,
  build: Schema.Number,
  productionVersion: Schema.String,
  databaseValid: Schema.Boolean,
  databaseLocked: Schema.Boolean,
  nightShiftManagerRunning: Schema.Boolean,
  isProduction: Schema.Boolean,
  centralSqlCommandEnabled: Schema.Boolean,
  /** Kept raw: the API declares a plain string and names no format. */
  lastUpdateStart: Schema.String,
  lastUpdateEnd: Schema.String,
  lastUpdateFailed: Schema.String,
}) {}
