import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * The only module that talks to device storage. Everything else goes through
 * this, so swapping in SecureStore or a synced backend is a one-file change.
 */
export const storageKeys = {
  appearanceMode: 'bandmate.appearance-mode',
  authSession: 'bandmate.auth-session',
  onboardingProfile: 'bandmate.onboarding-profile',
  writingDrafts: 'bandmate.writing-drafts',
  readingSaved: 'bandmate.reading-saved',
  vocabularyProgress: 'bandmate.vocabulary-progress',
  mentorThread: 'bandmate.mentor-thread',
} as const;

export type StorageKey = (typeof storageKeys)[keyof typeof storageKeys];

async function get<T>(key: StorageKey): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw === null ? null : (JSON.parse(raw) as T);
  } catch {
    // A corrupt or unreadable entry should degrade to "no value", never crash a screen.
    return null;
  }
}

async function set<T>(key: StorageKey, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignored: persistence is a convenience here, not a correctness requirement.
  }
}

async function remove(key: StorageKey): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch {
    // Ignored for the same reason as `set`.
  }
}

export const storage = { get, set, remove };
