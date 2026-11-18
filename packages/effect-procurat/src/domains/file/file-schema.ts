import { Schema } from 'effect';

/** Named `FileEntry` rather than `File` to stay clear of the platform `File` global. */
export const FileEntry = Schema.Struct({
  fileName: Schema.String,
  fileSize: Schema.Number,
  lastModified: Schema.String,
});
export type FileEntry = typeof FileEntry.Type;

export const Directory = Schema.Struct({
  name: Schema.String,
  files: Schema.Array(FileEntry),
});
export type Directory = typeof Directory.Type;

export const DirectoryContent = Schema.Struct({
  name: Schema.String,
  directories: Schema.Array(Directory),
  files: Schema.Array(FileEntry),
});
export type DirectoryContent = typeof DirectoryContent.Type;
