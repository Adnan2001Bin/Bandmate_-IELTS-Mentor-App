import type {
  Band,
  MockReport,
  MockSectionBrief,
  MockSectionResult,
  MockTest,
  Skill,
  TestType,
} from '@/types';

function section(
  id: Skill,
  title: string,
  minutes: number,
  items: number,
  brief: string,
): MockSectionBrief {
  return { id, title, minutes, items, brief };
}

const ACADEMIC_SECTIONS: readonly MockSectionBrief[] = [
  section(
    'listening',
    'Listening',
    30,
    40,
    'Four sections, one sitting. The recording is a clock in this build — duration is real, the 40 answers are a model script.',
  ),
  section(
    'reading',
    'Reading',
    60,
    40,
    'Three Academic passages. You may submit the paper before the hour. Locate is not in exam mode.',
  ),
  section(
    'writing',
    'Writing',
    60,
    2,
    'Task 1 then Task 2. Word counts still apply. Mira marks a model script, not your live essay, in this sitting.',
  ),
  section(
    'speaking',
    'Speaking',
    14,
    3,
    'Parts 1–3. The microphone is still a clock. Fillers and the transcript come from the mock after you stop.',
  ),
];

const GT_SECTIONS: readonly MockSectionBrief[] = [
  section('listening', 'Listening', 30, 40, 'Same listening paper as Academic. Timing is exam-real.'),
  section(
    'reading',
    'Reading',
    60,
    40,
    'General Training: section 1 notices, section 2 work, section 3 one long text.',
  ),
  section(
    'writing',
    'Writing',
    60,
    2,
    'Task 1 is a letter. Task 2 is the essay. Model script on submit.',
  ),
  section('speaking', 'Speaking', 14, 3, 'Parts 1–3. Same honesty as the practice speaking set.'),
];

const CHECKPOINT_SECTIONS: readonly MockSectionBrief[] = [
  section('listening', 'Listening', 8, 10, 'A short listening paper. Not the onboarding voice clip — that already happened.'),
  section('reading', 'Reading', 12, 10, 'One passage. Enough to re-cut the plan, not a full 40.'),
  section('writing', 'Writing', 15, 1, 'One Task 2 paragraph. Cohesion only.'),
  section('speaking', 'Speaking', 8, 3, 'A compressed Part 1–2. Fluency is still the read.'),
];

function test(
  id: string,
  title: string,
  kicker: string,
  testType: TestType,
  recommended: boolean,
  lastBand: Band | null,
  prediction: string,
  rules: readonly string[],
  sections: readonly MockSectionBrief[],
): MockTest {
  return {
    id,
    title,
    kicker,
    testType,
    minutes: sections.reduce((sum, item) => sum + item.minutes, 0),
    recommended,
    lastBand,
    prediction,
    rules,
    sections,
  };
}

const RULES_FULL = [
  'No pause between papers except the printed break. This app lets you leave a paper early.',
  'Listening is played once. Here the clock runs; there is no copyrighted recording.',
  'Writing Task 2 is worth more. Submit both tasks before the hour ends.',
  'Speaking is live with Mira. The mark is AI estimated — for practice only.',
] as const;

export const mockTests: readonly MockTest[] = [
  test(
    'academic-full',
    'Academic mock',
    'Full sitting',
    'academic',
    true,
    6,
    'You will land around 6.0. Writing cohesion and fluency still cap the overall. Do not expect 7.0 from one sitting.',
    RULES_FULL,
    ACADEMIC_SECTIONS,
  ),
  test(
    'general-full',
    'General Training mock',
    'Full sitting',
    'general',
    false,
    null,
    'Same overall shape as Academic. The letter is the extra leak if you write “Dear manager” and stop.',
    RULES_FULL,
    GT_SECTIONS,
  ),
  test(
    'checkpoint',
    'Diagnostic sitting',
    'Short checkpoint',
    'academic',
    false,
    6,
    'A re-cut, not a second onboarding. The voice diagnostic already set 6.0. This sitting checks whether fluency moved.',
    [
      'Shorter papers. Not 40+40.',
      'The onboarding voice clip is not this sitting.',
      'Use it when you want a new read without a full Saturday.',
    ],
    CHECKPOINT_SECTIONS,
  ),
];

function skillResult(
  skill: Skill,
  band: Band,
  correct: number | null,
  total: number | null,
  note: string,
): MockSectionResult {
  return { skill, band, correct, total, note };
}

export function reportFor(mockId: string, completedAt: string): MockReport {
  const test = mockTests.find((item) => item.id === mockId) ?? mockTests[0];
  const academic = mockId !== 'general-full';

  return {
    id: `report-${mockId}-${completedAt.slice(0, 10)}`,
    mockId: test.id,
    title: test.title,
    completedAt,
    overall: 6,
    target: 7,
    gap: 1,
    skills: { listening: 6.5, reading: 6, writing: 5.5, speaking: 6 },
    honestRead:
      academic
        ? 'Overall 6.0. Listening is the only skill at the target line. Writing 5.5 is cohesion, not ideas. Speaking 6.0 is fluency — you restart. That is still the plan.'
        : 'Overall 6.0. The letter was polite and empty. Task 2 held. Fluency still leaks in Part 2.',
    pattern: 'Finish the sentence. Then write three paragraphs that actually hold.',
    sections: [
      skillResult('listening', 6.5, mockId === 'checkpoint' ? 8 : 28, mockId === 'checkpoint' ? 10 : 40, 'MCQ held. Map labels slipped.'),
      skillResult('reading', 6, mockId === 'checkpoint' ? 6 : 24, mockId === 'checkpoint' ? 10 : 40, 'TFNG: you argued with “not given”.'),
      skillResult('writing', 5.5, null, null, 'Task response is 6. Cohesion is 5.5. “Very” still sits in the last paragraph.'),
      skillResult('speaking', 6, null, null, 'Pronunciation is 7. Fluency is 5.5. You restarted the cue twice.'),
    ],
    types: [
      { type: 'Multiple choice', correct: 6, total: 8 },
      { type: 'Map / diagram', correct: 2, total: 5 },
      { type: 'TFNG', correct: 5, total: 8 },
      { type: 'Summary completion', correct: 4, total: 6 },
    ],
    xp: 80,
  };
}

export const seedMockReports: readonly MockReport[] = [
  {
    ...reportFor('academic-full', '2026-08-02T10:00:00.000Z'),
    id: 'report-academic-aug2',
    overall: 6,
  },
  {
    ...reportFor('checkpoint', '2026-08-20T16:00:00.000Z'),
    id: 'report-checkpoint-aug20',
    title: 'Diagnostic sitting',
    overall: 6,
  },
];

export const mockPlanProposal = {
  title: 'Keep fluency first',
  body: 'The mock did not move the overall. Writing 5.5 and speaking fluency still cap 7.0. Tomorrow stays speaking-led. I will not swap in a full reading paper.',
  minutes: 18,
  tasks: [
    { area: 'speaking' as const, title: 'Live speaking with Mira', minutes: 8 },
    { area: 'writing' as const, title: 'Writing T2 · cohesion rebuild', minutes: 6 },
    { area: 'grammar' as const, title: 'Articles, ten items', minutes: 4 },
  ],
};
