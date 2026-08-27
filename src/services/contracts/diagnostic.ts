import type { DiagnosticResult, StudyProfile } from '@/types';

export type VoiceSampleInput = {
  /** How long the learner actually spoke. Short samples lower confidence. */
  seconds: number;
  /** Shapes the target rule on the result, not the estimate itself. */
  study: StudyProfile;
};

/**
 * The diagnostic estimates a starting band. Today that is a mock; behind a real
 * backend the same call uploads the sample and returns the model's assessment.
 */
export type DiagnosticService = {
  submitVoiceSample(input: VoiceSampleInput): Promise<DiagnosticResult>;
  /** Used when the learner skips the recording, so a plan can still be built. */
  estimateWithoutSample(study: StudyProfile): Promise<DiagnosticResult>;
};
