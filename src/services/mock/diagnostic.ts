import type { Band, SkillBands, StudyProfile } from '@/types';
import type { DiagnosticService, VoiceSampleInput } from '../contracts';
import { delay } from './latency';

/** The reference estimate from APP_DESCRIPTION.md §17. */
const BASE_SKILLS: SkillBands = {
  listening: 6,
  reading: 6.5,
  writing: 5.5,
  speaking: 5.5,
};

const SPOKEN_SUMMARY =
  'Your vocabulary is already band 7. Fluency is what is holding you at 6 — you restart sentences instead of finishing them. That is a habit, not a knowledge gap, which is genuinely good news.';

const SKIPPED_SUMMARY =
  'This is an estimate from your target and timeline only, so treat it as a starting guess. Record a sample whenever you are ready and I will replace it with a real read.';

/** IELTS reports to the nearest half band, and averages round up at .25 / .75. */
function toOverall(skills: SkillBands): Band {
  const mean = (skills.listening + skills.reading + skills.writing + skills.speaking) / 4;
  return (Math.round(mean * 2) / 2) as Band;
}

function buildResult(skills: SkillBands, summary: string) {
  return {
    overall: toOverall(skills),
    skills,
    summary,
    completedAt: new Date().toISOString(),
  };
}

export const mockDiagnosticService: DiagnosticService = {
  async submitVoiceSample({ seconds }: VoiceSampleInput) {
    // Longer samples read as more fluent, which keeps the demo responsive to
    // what the learner actually did rather than returning one fixed answer.
    await delay(1400);

    const speaking: Band = seconds >= 25 ? 6 : BASE_SKILLS.speaking;

    return buildResult({ ...BASE_SKILLS, speaking }, SPOKEN_SUMMARY);
  },

  async estimateWithoutSample(_study: StudyProfile) {
    await delay(600);
    return buildResult(BASE_SKILLS, SKIPPED_SUMMARY);
  },
};
