import { Stack } from 'expo-router';

/**
 * Routes presented as modals. Grouped so presentation is declared once here
 * rather than repeated at every call site.
 */
export default function ModalsLayout() {
  return <Stack screenOptions={{ headerShown: false, presentation: 'modal' }} />;
}
