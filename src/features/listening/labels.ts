import type { ListeningQuestionType } from '@/types';

export const QUESTION_TYPE_LABEL: Record<ListeningQuestionType, string> = {
  multipleChoice: 'Multiple choice',
  matching: 'Matching',
  formCompletion: 'Form completion',
  sentenceCompletion: 'Sentence completion',
  noteCompletion: 'Note completion',
  tableCompletion: 'Table completion',
  flowChartCompletion: 'Flow-chart completion',
  mapLabeling: 'Map labeling',
  diagramLabeling: 'Diagram labeling',
};

export const ACCENT_LABEL = {
  british: 'British',
  american: 'American',
  australian: 'Australian',
  canadian: 'Canadian',
} as const;

export const DIFFICULTY_LABEL = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
} as const;
