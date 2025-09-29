import { Schema } from 'effect';

export class GroupSchema extends Schema.Class<GroupSchema>("GroupSchema")({
  id: Schema.Number,
  parentGroupId: Schema.NullOr(Schema.Number),
  name: Schema.String,
  shortName: Schema.String,
  type: Schema.String,
  grades: Schema.Array(Schema.Number),
  schoolYear: Schema.NullOr(Schema.String),
  additionalType: Schema.NullOr(Schema.String),
  sortKey: Schema.Number,
}) {}