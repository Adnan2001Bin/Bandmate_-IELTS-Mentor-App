import type { ReadingDifficulty, ReadingQuestionType, TestType } from '@/types';

export const QUESTION_TYPE_LABEL: Record<ReadingQuestionType, string> = {
  multipleChoice: 'Multiple choice',
  trueFalseNotGiven: 'True / False / Not Given',
  yesNoNotGiven: 'Yes / No / Not Given',
  matchingHeadings: 'Matching headings',
  matchingInformation: 'Matching information',
  matchingSentenceEndings: 'Matching sentence endings',
  sentenceCompletion: 'Sentence completion',
  summaryCompletion: 'Summary completion',
  diagramLabeling: 'Diagram labeling',
};

export const DIFFICULTY_LABEL: Record<ReadingDifficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

export const TEST_TYPE_LABEL: Record<TestType, string> = {
  academic: 'Academic',
  general: 'General Training',
};
