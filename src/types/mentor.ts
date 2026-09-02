import type { Band, PracticeArea } from './ielts';

export type MentorRole = 'user' | 'mira';

export type MentorActionKind =
  | 'speaking'
  | 'writing'
  | 'vocabulary'
  | 'grammar'
  | 'listening'
  | 'reading'
  | 'session'
  | 'plan';

export type MentorAction = {
  id: string;
  label: string;
  href: string;
  kind: MentorActionKind;
};

export type MentorMessageStatus = 'sent' | 'pending' | 'error';

export type MentorMessage = {
  id: string;
  role: MentorRole;
  body: string;
  createdAt: string;
  status: MentorMessageStatus;
  actions?: readonly MentorAction[];
};

export type MentorPrompt = {
  id: string;
  label: string;
  text: string;
};

export type MentorPlanLine = {
  title: string;
  minutes: number;
  area: PracticeArea;
  reason: string;
};

export type MentorHome = {
  greeting: string;
  headline: string;
  body: string;
  contextLine: string;
  currentBand: Band;
  targetBand: Band;
  daysToTest: number;
  prompts: readonly MentorPrompt[];
  entries: readonly MentorAction[];
  plan: {
    title: string;
    minutes: number;
    why: string;
    tasks: readonly MentorPlanLine[];
  };
  lastMira: { body: string; at: string } | null;
  hasHistory: boolean;
};

export type MentorThread = {
  id: string;
  messages: MentorMessage[];
  prompts: readonly MentorPrompt[];
};
