import { useRouter, type Href } from 'expo-router';
import { ClipboardList, FileBarChart } from 'lucide-react-native';
import { View } from 'react-native';

import { AppHeader } from '@/components/layout';
import { ListRow, Rule, Screen, Tag, Text } from '@/components/ui';
import type { IconComponent } from '@/components/ui';

const ROUTES: readonly { href: Href; label: string; description: string; icon: IconComponent }[] = [
  { href: '/mock/lobby', label: 'Take a mock test', description: 'Full test under exam timing', icon: ClipboardList },
  { href: '/mock/report', label: 'Past reports', description: 'Band breakdown by section', icon: FileBarChart },
];

export default function MockScreen() {
  const router = useRouter();

  return (
    <Screen scroll>
      <AppHeader title="Mock" kicker="Full test, timed" />

      <View className="gap-4 px-6 pt-6">
        <Tag label="Phase 09" tone="outline" />
        <Text variant="body" tone="muted">
          The lobby, the timed runner and the band report are built here in Phase 09.
        </Text>
      </View>

      <View className="mt-6 px-6">
        <Rule weight="section" />
        {ROUTES.map((route, index) => (
          <View key={route.label}>
            {index > 0 ? <Rule /> : null}
            <ListRow
              label={route.label}
              description={route.description}
              icon={route.icon}
              onPress={() => router.push(route.href)}
            />
          </View>
        ))}
        <Rule weight="section" />
      </View>
    </Screen>
  );
}
