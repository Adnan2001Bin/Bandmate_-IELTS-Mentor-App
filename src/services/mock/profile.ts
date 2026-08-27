import { mockUserProfile } from '@/mocks/user';
import type { StudyProfile } from '@/types';
import type { ProfileService, UserProfile } from '../contracts';
import { delay } from './latency';

// Held in module scope so edits survive navigation within a session, the way a
// real backend would. It resets on reload, which is correct for mock data.
let profile: UserProfile = mockUserProfile;

export const mockProfileService: ProfileService = {
  async getProfile() {
    await delay();
    return profile;
  },

  async updateStudyProfile(input: Partial<StudyProfile>) {
    await delay();
    profile = { ...profile, study: { ...profile.study, ...input } };
    return profile;
  },
};
