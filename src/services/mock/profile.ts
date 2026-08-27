import { storage, storageKeys } from '@/lib/storage';
import { mockUserProfile } from '@/mocks/user';
import type { DiagnosticResult, StudyProfile } from '@/types';
import type { ProfileService, UserProfile } from '../contracts';
import { delay } from './latency';

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

export const mockProfileService: ProfileService = {
  async getProfile() {
    await delay();
    return load();
  },

  async updateStudyProfile(input: Partial<StudyProfile>) {
    await delay();
    const profile = await load();
    return save({ ...profile, study: { ...profile.study, ...input } });
  },

  async saveDiagnostic(result: DiagnosticResult) {
    await delay();
    const profile = await load();
    return save({ ...profile, diagnostic: result });
  },
};
