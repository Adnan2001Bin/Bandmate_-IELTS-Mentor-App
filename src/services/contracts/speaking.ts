import type {
  SpeakingAnswer,
  SpeakingEvaluation,
  SpeakingMode,
  SpeakingTopic,
  SpeakingTopicSummary,
} from '@/types';

export type SpeakingSubmitInput = {
  topicId: string;
  mode: SpeakingMode;
  answers: readonly SpeakingAnswer[];
};

export type SpeakingService = {
  listTopics(): Promise<SpeakingTopicSummary[]>;
  getTopic(id: string): Promise<SpeakingTopic>;
  submit(input: SpeakingSubmitInput): Promise<SpeakingEvaluation>;
};
