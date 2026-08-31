import type {
  TestType,
  WritingLetterTone,
  WritingTask1Chart,
  WritingTask2Type,
  WritingTaskKind,
} from '@/types';

export const KIND_LABEL: Record<WritingTaskKind, string> = {
  task1: 'Task 1',
  task2: 'Task 2',
};

export const TEST_TYPE_LABEL: Record<TestType, string> = {
  academic: 'Academic',
  general: 'General Training',
};

export const CHART_LABEL: Record<WritingTask1Chart, string> = {
  lineGraph: 'Line graph',
  barChart: 'Bar chart',
  pieChart: 'Pie chart',
  table: 'Table',
  process: 'Process',
  map: 'Map',
  mixed: 'Mixed chart',
};

export const LETTER_LABEL: Record<WritingLetterTone, string> = {
  formal: 'Formal letter',
  semiFormal: 'Semi-formal letter',
  informal: 'Informal letter',
};

export const ESSAY_LABEL: Record<WritingTask2Type, string> = {
  opinion: 'Opinion',
  discussion: 'Discussion',
  advantages: 'Advantages / disadvantages',
  problemSolution: 'Problem / solution',
  twoPart: 'Two-part question',
  agreeDisagree: 'Agree / disagree',
};

export function taskTypeLabel(task: {
  kind: WritingTaskKind;
  chart?: WritingTask1Chart;
  letterTone?: WritingLetterTone;
  essayType?: WritingTask2Type;
}): string {
  if (task.chart) {
    return CHART_LABEL[task.chart];
  }
  if (task.letterTone) {
    return LETTER_LABEL[task.letterTone];
  }
  if (task.essayType) {
    return ESSAY_LABEL[task.essayType];
  }
  return KIND_LABEL[task.kind];
}
