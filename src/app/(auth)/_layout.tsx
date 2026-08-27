import { Stack } from 'expo-router';

/** Entering the group without a path lands on the welcome screen. */
export const unstable_settings = {
  anchor: 'welcome',
  initialRouteName: 'welcome',
};

export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
