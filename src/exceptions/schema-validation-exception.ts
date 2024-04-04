export class SchemaValidationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SchemaValidationException';
  }
}
