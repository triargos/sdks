import { Schema } from 'effect';

/** Named `FileEntry` rather than `File` to stay clear of the platform `File` global. */
export class FileEntry extends Schema.Class<FileEntry>('FileEntry')({
  fileName: Schema.String,
  fileSize: Schema.Number,
  lastModified: Schema.String,
}) {}

export class Directory extends Schema.Class<Directory>('Directory')({
  name: Schema.String,
  files: Schema.Array(FileEntry),
}) {}

export class DirectoryContent extends Schema.Class<DirectoryContent>('DirectoryContent')({
  name: Schema.String,
  directories: Schema.Array(Directory),
  files: Schema.Array(FileEntry),
}) {}
