import { ApiException } from './api-exception';

export class ResourceForbiddenException extends ApiException {
  constructor(message: string, status: number) {
    super(message, status);
    this.name = 'ResourceForbiddenException';
  }
}
