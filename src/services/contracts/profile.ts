import type { DiagnosticResult, NotificationPrefs, StudyProfile, User } from '@/types';


export type UserProfile = {
  user: User;
  study: StudyProfile;
  diagnostic: DiagnosticResult | null;
  streakDays: number;
  xp: number;
};

export type ProfileService = {
  getProfile(): Promise<UserProfile>;
  updateStudyProfile(input: Partial<StudyProfile>): Promise<UserProfile>;
  /** Stores the estimate the plan is built from. */
  saveDiagnostic(result: DiagnosticResult): Promise<UserProfile>;
  updateUser(input: { name: string }): Promise<UserProfile>;
  getNotificationPrefs(): Promise<NotificationPrefs>;
  setNotificationPrefs(input: Partial<NotificationPrefs>): Promise<NotificationPrefs>;
};
