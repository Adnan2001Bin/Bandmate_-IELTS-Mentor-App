import { apiConfig } from './config';
import { ServiceError } from './errors';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
  signal?: AbortSignal;
};

let authToken: string | null = null;

export function setAuthToken(token: string | null): void {
  authToken = token;
}

/**
 * The HTTP transport the real services will use. Nothing calls it yet — every
 * service currently resolves to its mock — but the contracts are written against
 * this shape so switching over needs no change above the service layer.
 */
export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, signal } = options;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), apiConfig.timeoutMs);

  signal?.addEventListener('abort', () => controller.abort());

  try {
    const response = await fetch(`${apiConfig.baseUrl}${path}`, {
      method,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'X-App-Version': apiConfig.appVersion,
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    if (!response.ok) {
      throw ServiceError.fromStatus(response.status, `${method} ${path} failed`);
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof ServiceError) throw error;
    if (controller.signal.aborted) {
      throw new ServiceError('timeout', `${method} ${path} timed out`);
    }
    throw new ServiceError('network', `${method} ${path} could not reach the server`);
  } finally {
    clearTimeout(timeout);
  }
}
