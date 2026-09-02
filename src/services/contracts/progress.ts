import type { HistoryEntry, LeagueMember, ProgressSnapshot, Weakness } from '@/types';

export type ProgressService = {
  getSnapshot(): Promise<ProgressSnapshot>;
  listHistory(): Promise<readonly HistoryEntry[]>;
  listWeaknesses(): Promise<readonly Weakness[]>;
  getLeague(): Promise<{ optedIn: boolean; members: readonly LeagueMember[] }>;
  setLeagueOptIn(optedIn: boolean): Promise<{ optedIn: boolean; members: readonly LeagueMember[] }>;
};
