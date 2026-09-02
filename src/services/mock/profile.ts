import { storage, storageKeys } from '@/lib/storage';
import { mockUserProfile } from '@/mocks/user';
import type { AuthSession, NotificationPrefs } from '@/types';
import type { ProfileService, UserProfile } from '../contracts';
import { delay } from './latency';

const DEFAULT_NOTIFICATIONS: NotificationPrefs = {
  dailyReminder: true,
  streak: true,
  vocabDue: true,
  writingNudge: false,
  examCountdown: true,
};

// Cached in module scope so repeat reads are instant, and mirrored to storage so
// what onboarding captured survives a reload — which is what a backend would do.
let cached: UserProfile | null = null;

async function load(): Promise<UserProfile> {
  if (!cached) {
    cached = (await storage.get<UserProfile>(storageKeys.onboardingProfile)) ?? mockUserProfile;
  }

  return cached;
}

async function save(next: UserProfile): Promise<UserProfile> {
  cached = next;
  await storage.set(storageKeys.onboardingProfile, next);
  return next;
}

/** Sign-in identity lives on the session; the study profile is a separate write. */
async function withSessionUser(profile: UserProfile): Promise<UserProfile> {
  const session = await storage.get<AuthSession>(storageKeys.authSession);
  if (!session) {
    return profile;
  }
  return {
    ...profile,
    user: { ...profile.user, name: session.user.name, email: session.user.email },
  };
}

export const mockProfileService: ProfileService = {
  async getProfile() {
    await delay();
    return withSessionUser(await load());
  },

  async updateStudyProfile(input) {
    await delay();
    const profile = await load();
    const saved = await save({ ...profile, study: { ...profile.study, ...input } });
    return withSessionUser(saved);
  },

  async saveDiagnostic(result) {
    await delay();
    const profile = await load();
    const saved = await save({ ...profile, diagnostic: result });
    return withSessionUser(saved);
  },

  async updateUser({ name }) {
    await delay();
    const trimmed = name.trim();
    const profile = await load();
    const session = await storage.get<AuthSession>(storageKeys.authSession);
    if (session) {
      await storage.set(storageKeys.authSession, {
        ...session,
        user: { ...session.user, name: trimmed },
      });
    }
    const saved = await save({ ...profile, user: { ...profile.user, name: trimmed } });
    return withSessionUser(saved);
  },

  async getNotificationPrefs() {
    await delay();
    const stored = await storage.get<NotificationPrefs>(storageKeys.notificationPrefs);
    return stored ? { ...DEFAULT_NOTIFICATIONS, ...stored } : { ...DEFAULT_NOTIFICATIONS };
  },

  async setNotificationPrefs(input) {
    await delay(200);
    const current = await storage.get<NotificationPrefs>(storageKeys.notificationPrefs);
    const next = { ...DEFAULT_NOTIFICATIONS, ...current, ...input };
    await storage.set(storageKeys.notificationPrefs, next);
    return next;
  },
};
