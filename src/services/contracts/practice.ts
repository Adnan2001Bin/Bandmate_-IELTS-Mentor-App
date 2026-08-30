import type { PracticeHub } from '@/types';

export type PracticeService = {
  getHub(): Promise<PracticeHub>;
};
