import { apiConfig } from './api/config';
import type { AuthService, DiagnosticService, ProfileService } from './contracts';
import { mockAuthService } from './mock/auth';
import { mockDiagnosticService } from './mock/diagnostic';
import { mockProfileService } from './mock/profile';

/**
 * The single place that decides where data comes from. Screens import from here
 * and never reach into `mock/` directly, so `apiConfig.useMocks` is the only
 * thing that has to change when a backend lands.
 */
type ServiceRegistry = {
  auth: AuthService;
  profile: ProfileService;
  diagnostic: DiagnosticService;
};

const mockServices: ServiceRegistry = {
  auth: mockAuthService,
  profile: mockProfileService,
  diagnostic: mockDiagnosticService,
};

function resolveServices(): ServiceRegistry {
  if (apiConfig.useMocks) {
    return mockServices;
  }

  // HTTP implementations land alongside the backend; until then the mocks are
  // the only implementation, and falling back to them beats crashing.
  return mockServices;
}

export const services = resolveServices();

export { ServiceError, isServiceError } from './api/errors';
export type { ServiceErrorKind } from './api/errors';
export * from './contracts';
