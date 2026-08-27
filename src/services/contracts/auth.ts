import type { AuthSession } from '@/types';

export type SignInInput = {
  email: string;
  password: string;
};

export type SignUpInput = SignInInput & {
  name: string;
};

/**
 * Authentication is mocked for now — see `mock/auth.ts`. UI depends on this
 * contract only, so a real implementation drops in without touching a screen.
 */
export type AuthService = {
  getSession(): Promise<AuthSession | null>;
  signIn(input: SignInInput): Promise<AuthSession>;
  signUp(input: SignUpInput): Promise<AuthSession>;
  signOut(): Promise<void>;
  /** Flips `hasCompletedOnboarding`, which is what the route guard reads. */
  completeOnboarding(): Promise<AuthSession>;
};
