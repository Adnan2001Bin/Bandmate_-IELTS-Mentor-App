import type { MentorHome, MentorMessage, MentorThread } from '@/types';

export type MentorSendInput = {
  text: string;
};

export type MentorService = {
  getHome(): Promise<MentorHome>;
  getThread(): Promise<MentorThread>;
  send(input: MentorSendInput): Promise<MentorMessage>;
};
