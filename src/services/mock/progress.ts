import { storage, storageKeys } from '@/lib/storage';
import { mockHistory, mockLeague, mockProgress, mockWeaknesses } from '@/mocks/progress';
import type { ProgressService } from '../contracts';
import { delay } from './latency';

export const mockProgressService: ProgressService = {
  async getSnapshot() {
    await delay();
    return { ...mockProgress, skills: { ...mockProgress.skills }, trajectory: [...mockProgress.trajectory], analytics: { ...mockProgress.analytics } };
  },

  async listHistory() {
    await delay();
    return [...mockHistory];
  },

  async listWeaknesses() {
    await delay();
    return [...mockWeaknesses];
  },

  async getLeague() {
    await delay();
    const optedIn = (await storage.get<boolean>(storageKeys.leagueOptIn)) ?? false;
    return { optedIn, members: optedIn ? [...mockLeague] : [] };
  },

  async setLeagueOptIn(optedIn) {
    await delay(200);
    await storage.set(storageKeys.leagueOptIn, optedIn);
    return { optedIn, members: optedIn ? [...mockLeague] : [] };
  },
};
