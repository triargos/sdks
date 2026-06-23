import { Schema } from 'effect';

export class RelationshipValidationError extends Schema.TaggedError<RelationshipValidationError>()(
  'RelationshipValidationError',
  {
    message: Schema.String,
    code: Schema.Number,
    kind: Schema.Literal('addChildToParent', 'addParentToChild'),
    personToAddId: Schema.Number,
    basePersonId: Schema.Number,
  },
) {}
