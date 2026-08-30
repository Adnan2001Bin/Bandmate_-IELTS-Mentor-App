import type { ListeningMode, ListeningResult, ListeningSet, ListeningSetSummary } from '@/types';

export type ListeningSubmitInput = {
  setId: string;
  mode: ListeningMode;
  answers: Record<string, string>;
};

export type ListeningService = {
  listSets(): Promise<ListeningSetSummary[]>;
  getSet(id: string): Promise<ListeningSet>;
  submit(input: ListeningSubmitInput): Promise<ListeningResult>;
};
