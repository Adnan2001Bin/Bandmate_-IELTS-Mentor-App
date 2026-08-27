import Constants from 'expo-constants';

/**
 * There is no backend yet. `useMocks` is the single switch that flips the whole
 * app onto real HTTP once one exists — set `EXPO_PUBLIC_API_URL` and it flips.
 */
const apiUrl = process.env.EXPO_PUBLIC_API_URL ?? '';

export const apiConfig = {
  baseUrl: apiUrl,
  useMocks: apiUrl.length === 0,
  timeoutMs: 15_000,
  appVersion: Constants.expoConfig?.version ?? '0.0.0',
} as const;
