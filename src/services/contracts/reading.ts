import type {
  ReadingMode,
  ReadingResult,
  ReadingSavedItem,
  ReadingSet,
  ReadingSetSummary,
} from '@/types';

export type ReadingSubmitInput = {
  setId: string;
  mode: ReadingMode;
  answers: Record<string, string>;
};

export type ReadingSaveInput = {
  setId: string;
  questionId: string;
};

export type ReadingService = {
  listSets(): Promise<ReadingSetSummary[]>;
  getSet(id: string): Promise<ReadingSet>;
  submit(input: ReadingSubmitInput): Promise<ReadingResult>;
  listSaved(): Promise<ReadingSavedItem[]>;
  saveQuestion(input: ReadingSaveInput): Promise<ReadingSavedItem[]>;
  unsaveQuestion(input: ReadingSaveInput): Promise<ReadingSavedItem[]>;
};
