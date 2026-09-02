import type { PracticeArea } from './ielts';

export type MistakeCategory = {
  id: string;
  area: PracticeArea;
  title: string;
  count: number;
};

export type Mistake = {
  id: string;
  area: PracticeArea;
  category: string;
  prompt: string;
  given: string;
  expected: string;
  why: string;
  href: string;
};
