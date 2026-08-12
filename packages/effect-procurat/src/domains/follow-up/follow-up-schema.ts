import { Schema } from 'effect';
import { type DateCodec, ProcuratDate } from '../../shared/date';

export class FollowUp extends Schema.Class<FollowUp>('FollowUp')({
  id: Schema.Number,
  dueDate: ProcuratDate,
  assignedPersonId: Schema.NullOr(Schema.Number),
  assignedGroupId: Schema.Number,
  subject: Schema.String,
  message: Schema.String,
  referencedPersonId: Schema.NullOr(Schema.Number),
  referencedFile: Schema.NullOr(Schema.String),
  completed: Schema.Boolean,
}) {}

/** The codec is a parameter only while the API rolls over. See `shared/date`. */
export const createFollowUpFields = (date: DateCodec) =>
  Schema.Struct({
    dueDate: date,
    assignedPersonId: Schema.NullOr(Schema.Number),
    assignedGroupId: Schema.NullOr(Schema.Number),
    subject: Schema.String,
    message: Schema.String,
    referencedPersonId: Schema.NullOr(Schema.Number),
    referencedFile: Schema.NullOr(Schema.String),
    completed: Schema.Boolean,
  });

export class CreateFollowUp extends Schema.Opaque<CreateFollowUp>()(createFollowUpFields(ProcuratDate)) {}

export const updateFollowUpFields = (date: DateCodec) =>
  Schema.Struct({
    id: Schema.Number,
    dueDate: date,
    assignedPersonId: Schema.NullOr(Schema.Number),
    assignedGroupId: Schema.Number,
    subject: Schema.String,
    message: Schema.String,
    referencedPersonId: Schema.NullOr(Schema.Number),
    referencedFile: Schema.NullOr(Schema.String),
    completed: Schema.Boolean,
  });

export class UpdateFollowUp extends Schema.Opaque<UpdateFollowUp>()(updateFollowUpFields(ProcuratDate)) {}
