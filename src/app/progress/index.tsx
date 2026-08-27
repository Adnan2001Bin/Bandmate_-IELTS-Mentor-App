import { useRouter, type Href } from 'expo-router';
import { History, ScanSearch } from 'lucide-react-native';
import { View } from 'react-native';

import { AppHeader } from '@/components/layout';
import { ListRow, Rule, Screen, Tag, Text } from '@/components/ui';
import type { IconComponent } from '@/components/ui';

const ROUTES: readonly { href: Href; label: string; description: string; icon: IconComponent }[] = [
  { href: '/progress/history', label: 'History', description: 'Every session and test, by date', icon: History },
  { href: '/progress/weaknesses', label: 'Weaknesses', description: 'What is costing you the most band', icon: ScanSearch },
];

export default function ProgressScreen() {
  const router = useRouter();

  return (
    <Screen scroll>
      <AppHeader
        title="Progress"
        kicker="Where you stand"
        size="compact"
        onBack={() => router.back()}
      />

      <View className="gap-4 px-6 pt-6">
        <Tag label="Phase 09" tone="outline" />
        <Text variant="body" tone="muted">
          The band forecast, the skill trajectory chart and the streak strip are built here in
          Phase 09.
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
