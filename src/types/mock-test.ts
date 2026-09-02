import type { Band, PracticeArea, Skill, SkillBands, TestType } from './ielts';

export type MockSectionId = Skill;

export type MockSectionBrief = {
  id: MockSectionId;
  title: string;
  minutes: number;
  items: number;
  brief: string;
};

export type MockTestSummary = {
  id: string;
  title: string;
  kicker: string;
  testType: TestType;
  minutes: number;
  recommended: boolean;
  lastBand: Band | null;
};

export type MockTest = MockTestSummary & {
  prediction: string;
  rules: readonly string[];
  sections: readonly MockSectionBrief[];
};

export type MockQuestionTypeScore = {
  type: string;
  correct: number;
  total: number;
};

export type MockSectionResult = {
  skill: Skill;
  band: Band;
  correct: number | null;
  total: number | null;
  note: string;
};

export type MockReport = {
  id: string;
  mockId: string;
  title: string;
  completedAt: string;
  overall: Band;
  target: Band;
  gap: number;
  skills: SkillBands;
  honestRead: string;
  pattern: string;
  sections: readonly MockSectionResult[];
  types: readonly MockQuestionTypeScore[];
  xp: number;
};

export type MockPlanProposal = {
  title: string;
  body: string;
  minutes: number;
  tasks: readonly { area: PracticeArea; title: string; minutes: number }[];
};
