import { apiConfig } from './api/config';
import type {
  AuthService,
  DiagnosticService,
  ListeningService,
  PlanService,
  PracticeService,
  ProfileService,
  ReadingService,
  SpeakingService,
  VocabularyService,
  GrammarService,
  WritingService,
} from './contracts';
import { mockAuthService } from './mock/auth';
import { mockDiagnosticService } from './mock/diagnostic';
import { mockListeningService } from './mock/listening';
import { mockPlanService } from './mock/plan';
import { mockPracticeService } from './mock/practice';
import { mockProfileService } from './mock/profile';
import { mockReadingService } from './mock/reading';
import { mockSpeakingService } from './mock/speaking';
import { mockVocabularyService } from './mock/vocabulary';
import { mockGrammarService } from './mock/grammar';
import { mockWritingService } from './mock/writing';

/**
 * The single place that decides where data comes from. Screens import from here
 * and never reach into `mock/` directly, so `apiConfig.useMocks` is the only
 * thing that has to change when a backend lands.
 */
type ServiceRegistry = {
  auth: AuthService;
  profile: ProfileService;
  diagnostic: DiagnosticService;
  plan: PlanService;
  practice: PracticeService;
  listening: ListeningService;
  reading: ReadingService;
  writing: WritingService;
  speaking: SpeakingService;
  vocabulary: VocabularyService;
  grammar: GrammarService;
};

const mockServices: ServiceRegistry = {
  auth: mockAuthService,
  profile: mockProfileService,
  diagnostic: mockDiagnosticService,
  plan: mockPlanService,
  practice: mockPracticeService,
  listening: mockListeningService,
  reading: mockReadingService,
  writing: mockWritingService,
  speaking: mockSpeakingService,
  vocabulary: mockVocabularyService,
  grammar: mockGrammarService,
};

function resolveServices(): ServiceRegistry {
  if (apiConfig.useMocks) {
    return mockServices;
  }

  // HTTP implementations land alongside the backend; until then the mocks are
  // the only implementation, and falling back to them beats crashing.
  return mockServices;
}

export const services = resolveServices();

export { ServiceError, isServiceError } from './api/errors';
export type { ServiceErrorKind } from './api/errors';
export * from './contracts';
