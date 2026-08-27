import { Stack } from 'expo-router';

/** The flow always starts at step one. */
export const unstable_settings = {
  anchor: 'goal',
  initialRouteName: 'goal',
};

export default function OnboardingLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
