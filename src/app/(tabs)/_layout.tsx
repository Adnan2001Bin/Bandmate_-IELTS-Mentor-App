import { Tabs } from 'expo-router';
import { FileText, House, MessageSquare, SlidersHorizontal, User } from 'lucide-react-native';

import { AppTabBar, type TabDefinition } from '@/components/layout';

/**
 * The five primary tabs from APP_DESCRIPTION.md §32, in the order the design
 * deck sets them. Progress is reached through Profile rather than owning a tab.
 */
const TABS: readonly TabDefinition[] = [
  { name: 'index', label: 'Today', icon: House },
  { name: 'practice', label: 'Practice', icon: SlidersHorizontal },
  { name: 'mock', label: 'Mock', icon: FileText },
  { name: 'mira', label: 'Mira', icon: MessageSquare },
  { name: 'profile', label: 'Profile', icon: User },
];

export default function TabsLayout() {
  return (
    <Tabs
      // Android's hardware back returns to Today rather than exiting the app.
      backBehavior="initialRoute"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <AppTabBar {...props} tabs={TABS} />}
    >
      {TABS.map((tab) => (
        <Tabs.Screen key={tab.name} name={tab.name} options={{ title: tab.label }} />
      ))}
    </Tabs>
  );
}
