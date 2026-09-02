import type { SpeakingMode } from '@/types';

export const MODE_LABEL: Record<SpeakingMode, string> = {
  practice: 'Practice',
  examiner: 'Examiner',
  challenge: 'Challenge',
};

export const MODE_BLURB: Record<SpeakingMode, string> = {
  practice: 'Hints after each turn. Live notes while you hold the mic.',
  examiner: 'No interruption until the debrief. Closer to test day.',
  challenge: 'Harder Part 3. Same Parts 1 and 2. Mira still names the pattern at the end.',
};
