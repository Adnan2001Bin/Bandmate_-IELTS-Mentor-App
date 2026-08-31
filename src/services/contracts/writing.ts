import type {
  WritingEvaluation,
  WritingMode,
  WritingMethod,
  WritingRewriteCheck,
  WritingTask,
  WritingTaskSummary,
} from '@/types';

export type WritingSubmitInput = {
  taskId: string;
  body: string;
  mode: WritingMode;
  method: WritingMethod;
  remainingMs: number;
};

export type WritingDraftInput = {
  taskId: string;
  body: string;
  remainingMs: number;
};

export type WritingRewriteInput = {
  original: string;
  attempt: string;
};

export type WritingService = {
  listTasks(): Promise<WritingTaskSummary[]>;
  getTask(id: string): Promise<WritingTask>;
  listDrafts(): Promise<WritingDraftInput[]>;
  getDraft(taskId: string): Promise<WritingDraftInput | null>;
  saveDraft(input: WritingDraftInput): Promise<void>;
  clearDraft(taskId: string): Promise<void>;
  submit(input: WritingSubmitInput): Promise<WritingEvaluation>;
  simulateOcr(taskId: string): Promise<string>;
  checkRewrite(input: WritingRewriteInput): Promise<WritingRewriteCheck>;
};
