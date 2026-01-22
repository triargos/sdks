import { Schema } from 'effect';

export class FileSchema extends Schema.Class<FileSchema>('FileSchema')({
  fileName: Schema.String,
  fileSize: Schema.Number,
  lastModified: Schema.String,
}) {}

export class DirectorySchema extends Schema.Class<DirectorySchema>('DirectorySchema')({
  name: Schema.String,
  files: Schema.Array(FileSchema),
}) {}

export class DirectoryContentSchema extends Schema.Class<DirectoryContentSchema>('DirectoryContentSchema')({
  name: Schema.String,
  directories: Schema.Array(DirectorySchema),
  files: Schema.Array(FileSchema),
}) {}
