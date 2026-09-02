import { storage, storageKeys } from '@/lib/storage';
import { mockUserProfile } from '@/mocks/user';
import type { AuthSession } from '@/types';
import { ServiceError } from '../api/errors';
import type { AuthService, SignInInput, SignUpInput, UserProfile } from '../contracts';
import { delay } from './latency';

function createSession(name: string, email: string, hasCompletedOnboarding: boolean): AuthSession {
  return {
    user: { id: mockUserProfile.user.id, name, email },
    token: `mock-token-${Date.now()}`,
    hasCompletedOnboarding,
  };
}

async function persist(session: AuthSession): Promise<AuthSession> {
  await storage.set(storageKeys.authSession, session);
  return session;
}

export const mockAuthService: AuthService = {
  async getSession() {
    await delay(200);
    return storage.get<AuthSession>(storageKeys.authSession);
  },

  async signIn({ email, password }: SignInInput) {
    await delay();

    if (password.length < 6) {
      throw new ServiceError('validation', 'That password is too short.');
    }

    // Keep the name they already chose; seed only if this device has no profile yet.
    const stored = await storage.get<UserProfile>(storageKeys.onboardingProfile);
    const name = stored?.user.name ?? mockUserProfile.user.name;
    return persist(createSession(name, email, true));
  },

  async signUp({ name, email }: SignUpInput) {
    await delay();
    return persist(createSession(name, email, false));
  },

  async signOut() {
    await delay(150);
    await storage.remove(storageKeys.authSession);
  },

  async completeOnboarding() {
    await delay(200);
    const session = await storage.get<AuthSession>(storageKeys.authSession);

    if (!session) {
      throw new ServiceError('unauthorized', 'You are not signed in.');
    }

    return persist({ ...session, hasCompletedOnboarding: true });
  },
};
