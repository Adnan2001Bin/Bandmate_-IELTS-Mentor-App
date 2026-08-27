import { Stack } from 'expo-router';

/** Each practice area pushes onto this stack, keeping routing local to the feature. */
export default function PracticeLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
