export type ServiceErrorKind =
  'network' | 'timeout' | 'unauthorized' | 'notFound' | 'validation' | 'server' | 'unknown';

/**
 * One error shape for the whole app, so error and retry UI never has to know
 * whether the failure came from a mock, an HTTP call or a parse.
 */
export class ServiceError extends Error {
  readonly kind: ServiceErrorKind;
  readonly status?: number;

  constructor(kind: ServiceErrorKind, message: string, status?: number) {
    super(message);
    this.name = 'ServiceError';
    this.kind = kind;
    this.status = status;
  }

  static fromStatus(status: number, message: string): ServiceError {
    if (status === 401 || status === 403) return new ServiceError('unauthorized', message, status);
    if (status === 404) return new ServiceError('notFound', message, status);
    if (status === 422) return new ServiceError('validation', message, status);
    if (status >= 500) return new ServiceError('server', message, status);
    return new ServiceError('unknown', message, status);
  }
}

export function isServiceError(error: unknown): error is ServiceError {
  return error instanceof ServiceError;
}
