import { ApiException } from './api-exception';

export class MissingAuthenticationException extends ApiException {
  constructor(message: string, status: number) {
    super(message, status);
    this.name = 'NoAuthenticationException';
  }
}
