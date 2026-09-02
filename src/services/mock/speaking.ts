import { flattenTurns, snapBand, speakingXp } from '@/lib/speaking';
import { mockSpeakingTopics } from '@/mocks/speaking';
import type {
  Band,
  CriterionScore,
  SpeakingAnswer,
  SpeakingCriterion,
  SpeakingEvaluation,
  SpeakingFix,
  SpeakingMode,
  SpeakingTopic,
  SpeakingTranscriptLine,
} from '@/types';
import { ServiceError } from '../api/errors';
import type { SpeakingService } from '../contracts';
import { delay } from './latency';

function summaryOf(topic: SpeakingTopic) {
  return {
    id: topic.id,
    title: topic.title,
    theme: topic.theme,
    minutes: topic.minutes,
    recommended: topic.recommended,
  };
}

function part2Duration(topic: SpeakingTopic, answers: readonly SpeakingAnswer[]): number {
  const found = answers.find((item) => item.questionId === topic.part2.id);
  return found?.durationMs ?? 0;
}

function meanDuration(answers: readonly SpeakingAnswer[]): number {
  if (answers.length === 0) {
    return 0;
  }
  return answers.reduce((sum, item) => sum + item.durationMs, 0) / answers.length;
}

function shift(band: Band, delta: number): Band {
  return snapBand(band + delta);
}

function buildTranscript(
  topic: SpeakingTopic,
  mode: SpeakingMode,
  answers: readonly SpeakingAnswer[],
): SpeakingTranscriptLine[] {
  const turns = flattenTurns(topic, mode);
  const lines: SpeakingTranscriptLine[] = [];
  let cursor = 0;

  for (const turn of turns) {
    const spoken = answers.find((item) => item.questionId === turn.id)?.durationMs ?? 0;
    const prompt = turn.part === 2 ? turn.title : turn.prompt;

    lines.push({
      id: `${turn.id}-ex`,
      atMs: cursor,
      speaker: 'examiner',
      text: prompt,
    });

    if (spoken > 0) {
      lines.push({
        id: `${turn.id}-you`,
        atMs: cursor + Math.min(2_000, Math.floor(spoken * 0.08)),
        speaker: 'you',
        text: turn.script.you,
        better: turn.script.better,
        why: turn.script.why,
      });
      cursor += spoken;
    } else {
      cursor += 1_500;
    }
  }

  return lines;
}

function criteriaFor(
  part2Ms: number,
  meanMs: number,
  mode: SpeakingMode,
): readonly CriterionScore<SpeakingCriterion>[] {
  const leftEarly = part2Ms > 0 && part2Ms < 40_000;
  const thin = meanMs < 12_000;
  const held = part2Ms >= 90_000;

  let fluency: Band = 6;
  if (leftEarly || thin) {
    fluency = 5.5;
  }
  if (held && !thin) {
    fluency = 6.5;
  }
  if (mode === 'challenge' && held) {
    fluency = shift(fluency, -0.5);
  }

  const lexical: Band = thin ? 5.5 : 6;
  const grammar: Band = 6;
  const pronunciation: Band = 6.5;

  return [
    {
      criterion: 'fluencyCoherence',
      band: fluency,
      note: leftEarly
        ? 'You left Part 2 before the two minutes. Fluency is also staying until the last bullet.'
        : held
          ? 'You held Part 2. The remaining stall is the filler at the start of each turn.'
          : 'Turns were short. Add one reason after the answer so the line has a shape.',
    },
    {
      criterion: 'lexicalResource',
      band: lexical,
      note: 'You leaned on “good”, “things”, and “basically”. Name the object.',
    },
    {
      criterion: 'grammaticalRange',
      band: grammar,
      note: 'Simple present did the job. Part 3 needed one conditional — “If rents rise, workers leave.”',
    },
    {
      criterion: 'pronunciation',
      band: pronunciation,
      note: 'The mock cannot hear you. This band is a stand-in until a recording URI exists. Treat it as practice only.',
    },
  ];
}

function twoFixes(part2Ms: number): readonly [SpeakingFix, SpeakingFix] {
  const early = part2Ms > 0 && part2Ms < 40_000;

  return [
    {
      id: 'fix-fillers',
      title: 'Drop “I think”',
      body: 'You open with “I think”, “actually”, and “basically”. Start with the place, the number, or the view. Mira is naming a pattern, not a mood.',
    },
    early
      ? {
          id: 'fix-part2',
          title: 'Hold the last minute of Part 2',
          body: 'You stopped before the cue was done. Use the bullets in order, then one last line on why it matters. The clock is two minutes for a reason.',
        }
      : {
          id: 'fix-part3',
          title: 'Take a position in Part 3',
          body: '“Both” and “it depends” are pauses. Pick a side, then one example. You can name the limit in the next sentence.',
        },
  ];
}

function overall(criteria: readonly CriterionScore<SpeakingCriterion>[]): Band {
  const sum = criteria.reduce((total, item) => total + item.band, 0);
  return snapBand(sum / criteria.length);
}

export const mockSpeakingService: SpeakingService = {
  async listTopics() {
    await delay();
    return mockSpeakingTopics.map(summaryOf);
  },

  async getTopic(id) {
    await delay();
    const topic = mockSpeakingTopics.find((item) => item.id === id);

    if (!topic) {
      throw new ServiceError('notFound', 'That speaking topic is not in the library.');
    }

    return topic;
  },

  async submit({ topicId, mode, answers }) {
    await delay(900);
    const topic = mockSpeakingTopics.find((item) => item.id === topicId);

    if (!topic) {
      throw new ServiceError('notFound', 'That speaking topic is not in the library.');
    }

    const part2Ms = part2Duration(topic, answers);
    const meanMs = meanDuration(answers);
    const totalMs = answers.reduce((sum, item) => sum + item.durationMs, 0);
    const items = criteriaFor(part2Ms, meanMs, mode);
    const band = overall(items);
    const transcript = buildTranscript(topic, mode, answers);

    const evaluation: SpeakingEvaluation = {
      topicId,
      mode,
      band,
      criteria: items,
      pattern:
        'You frequently use “actually”, “basically”, and “I think”. Start with the fact. The filler is the stall, not a style.',
      twoFixes: twoFixes(part2Ms),
      strengths:
        part2Ms >= 90_000
          ? ['You stayed on the Part 2 cue until the clock asked you to stop.', 'Part 1 answers had a place in them, not only a yes.']
          : ['You answered what was asked. The next job is length, not a new topic.'],
      weaknesses:
        part2Ms > 0 && part2Ms < 40_000
          ? ['Part 2 ended early.', 'Fillers at the start of almost every turn.']
          : ['Fillers at the start of almost every turn.', 'Part 3 often ended on “it depends”.'],
      metrics: {
        totalMs,
        wpm: totalMs < 1_000 ? 0 : Math.min(140, Math.round(88 + totalMs / 8_000)),
        pauseCount: Math.max(1, Math.floor(totalMs / 9_000)),
        fillerCount: 3,
      },
      transcript,
      recommendations: [
        {
          id: 'rec-vocab',
          area: 'vocabulary',
          label: 'Swap the fillers',
          reason: 'Practice precise openers so “I think” is not the default first word.',
        },
        {
          id: 'rec-grammar',
          area: 'grammar',
          label: 'Conditionals for Part 3',
          reason: 'One “if” sentence turns a shrug into a view.',
        },
      ],
      xp: speakingXp(band, mode),
    };

    return evaluation;
  },
};
