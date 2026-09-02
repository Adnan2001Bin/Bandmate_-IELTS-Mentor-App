import { useRouter, type Href } from 'expo-router';
import {
  BookMarked,
  History,
  Languages,
  Palette,
  Settings,
  Target,
  TrendingUp,
} from 'lucide-react-native';
import { View } from 'react-native';

import { BandScore, StreakStrip } from '@/components/ielts';
import { AppHeader } from '@/components/layout';
import {
  ErrorState,
  ListRow,
  Monogram,
  Rule,
  Screen,
  SettingsSection,
  Skeleton,
  StatCell,
  Text,
} from '@/components/ui';
import type { IconComponent } from '@/components/ui';
import { useProfile } from '@/features/profile';
import { daysUntil } from '@/lib/date';

type Entry = { href: Href; label: string; description: string; icon: IconComponent };

const LEARNING: readonly Entry[] = [
  { href: '/progress', label: 'My progress', description: 'Forecast, history, weaknesses', icon: TrendingUp },
  { href: '/progress/history', label: 'History', description: 'Every session and test, by date', icon: History },
  { href: '/mistakes', label: 'Mistakes', description: 'Everything you got wrong, by skill', icon: BookMarked },
  { href: '/practice/vocabulary', label: 'Vocabulary', description: 'Saved words and review queue', icon: Languages },
];

const ACCOUNT: readonly Entry[] = [
  { href: '/profile/goals', label: 'Goals', description: 'Target band, test date, daily time', icon: Target },
  { href: '/profile/settings', label: 'Settings', description: 'Appearance, notifications, account', icon: Settings },
];

export default function ProfileScreen() {
  const router = useRouter();
  const { data, isPending, isError, refetch } = useProfile();

  if (isPending) {
    return (
      <Screen>
        <AppHeader title="Profile" kicker="You" />
        <View className="gap-3 px-6 pt-6">
          <Skeleton height={72} />
          <Skeleton height={96} />
        </View>
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen>
        <AppHeader title="Profile" kicker="You" />
        <View className="px-6 pt-6">
          <ErrorState onRetry={() => void refetch()} />
        </View>
      </Screen>
    );
  }

  const current = data.diagnostic?.overall ?? null;
  const days = daysUntil(data.study.testDate);

  return (
    <Screen scroll>
      <AppHeader
        title={data.user.name}
        kicker="You"
        action={
          <View className="items-end gap-2">
            <Monogram name={data.user.name} size="sm" />
            <StreakStrip days={data.streakDays} />
          </View>
        }
      />

      <View className="flex-row border-b-2 border-divider">
        <View className="flex-1 px-6 py-4">
          <Text variant="kicker" tone="subtle">
            Current
          </Text>
          {current !== null ? (
            <BandScore value={current} size="md" className="mt-1" />
          ) : (
            <Text variant="h1" className="mt-1">
              —
            </Text>
          )}
        </View>
        <View className="flex-1 px-6 py-4">
          <Text variant="kicker" tone="subtle">
            Target
          </Text>
          <BandScore value={data.study.targetBand} size="md" className="mt-1" />
        </View>
        <StatCell
          label="To test"
          value={String(Math.max(0, days))}
          detail="days"
          className="flex-1 px-6"
        />
      </View>

      <View className="px-6 pt-3">
        <Text variant="caption" tone="muted">
          {data.user.email} · AI estimated band — for practice purposes only.
        </Text>
      </View>

      <SettingsSection title="Learning">
        {LEARNING.map((entry, index) => (
          <View key={entry.label}>
            {index > 0 ? <Rule /> : null}
            <ListRow
              label={entry.label}
              description={entry.description}
              icon={entry.icon}
              onPress={() => router.push(entry.href)}
            />
          </View>
        ))}
      </SettingsSection>

      <SettingsSection title="Account">
        {ACCOUNT.map((entry, index) => (
          <View key={entry.label}>
            {index > 0 ? <Rule /> : null}
            <ListRow
              label={entry.label}
              description={entry.description}
              icon={entry.icon}
              onPress={() => router.push(entry.href)}
            />
          </View>
        ))}
      </SettingsSection>

      <SettingsSection
        title="Development"
        footer="Removed before a store build. Not a product screen."
      >
        <ListRow
          label="Design system"
          description="Component gallery"
          icon={Palette}
          onPress={() => router.push('/design-system')}
        />
      </SettingsSection>
    </Screen>
  );
}
