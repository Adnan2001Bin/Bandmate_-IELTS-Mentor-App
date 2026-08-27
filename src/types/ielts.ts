/** IELTS is reported in half bands. Modelling that keeps invalid scores unrepresentable. */
export type Band = 4 | 4.5 | 5 | 5.5 | 6 | 6.5 | 7 | 7.5 | 8 | 8.5 | 9;

export const BANDS: readonly Band[] = [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9];

/** The four scored skills. */
export type Skill = 'listening' | 'reading' | 'writing' | 'speaking';

export const SKILLS: readonly Skill[] = ['listening', 'reading', 'writing', 'speaking'];

/** Everything the Practice tab offers — the four skills plus the two support areas. */
export type PracticeArea = Skill | 'vocabulary' | 'grammar';

export const PRACTICE_AREAS: readonly PracticeArea[] = [
  'listening',
  'reading',
  'writing',
  'speaking',
  'vocabulary',
  'grammar',
];

export type TestType = 'academic' | 'general';

/** Official marking criteria. Writing and speaking share three of the four. */
export type WritingCriterion =
  'taskResponse' | 'coherenceCohesion' | 'lexicalResource' | 'grammaticalRange';

export type SpeakingCriterion =
  'fluencyCoherence' | 'lexicalResource' | 'grammaticalRange' | 'pronunciation';

export type CriterionScore<TCriterion extends string> = {
  criterion: TCriterion;
  band: Band;
  note: string;
};

export type SkillBands = Record<Skill, Band>;
