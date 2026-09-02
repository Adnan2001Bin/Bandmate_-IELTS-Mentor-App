import type { GrammarLesson, GrammarLessonSummary, GrammarResult } from '@/types';

export type GrammarSubmitInput = {
  lessonId: string;
  answers: Record<string, string>;
};

export type GrammarService = {
  listLessons(): Promise<GrammarLessonSummary[]>;
  getLesson(id: string): Promise<GrammarLesson>;
  submit(input: GrammarSubmitInput): Promise<GrammarResult>;
};
