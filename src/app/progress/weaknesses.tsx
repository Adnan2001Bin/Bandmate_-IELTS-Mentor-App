import { useRouter, type Href } from 'expo-router';
import { View } from 'react-native';

import { MiraNote } from '@/components/ielts';
import { AppHeader } from '@/components/layout';
import { ErrorState, ListRow, Rule, Screen, Skeleton, Tag, Text } from '@/components/ui';
import { useWeaknesses } from '@/features/progress';
import type { Weakness } from '@/types';

const COST_LABEL: Record<Weakness['cost'], string> = {
  high: 'High cost',
  medium: 'Medium',
  held: 'Held',
};

const COST_TONE: Record<Weakness['cost'], 'accent' | 'outline' | 'ink'> = {
  high: 'accent',
  medium: 'outline',
  held: 'ink',
};

export default function WeaknessesScreen() {
  const router = useRouter();
  const { data, isPending, isError, refetch } = useWeaknesses();

  if (isPending) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Weaknesses" kicker="Progress" size="compact" onBack={() => router.back()} />
        <View className="gap-3 px-6 pt-6">
          <Skeleton height={72} />
          <Skeleton height={72} />
        </View>
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Weaknesses" kicker="Progress" size="compact" onBack={() => router.back()} />
        <View className="px-6 pt-6">
          <ErrorState onRetry={() => void refetch()} />
        </View>
      </Screen>
    );
  }

  const first = data[0];

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <AppHeader title="Weaknesses" kicker="Progress" size="compact" onBack={() => router.back()} />

      {first ? (
        <View className="px-6 pt-5">
          <MiraNote
            kicker="The leak"
            title={first.title}
            body={`${first.evidence} ${first.fix}`}
          />
        </View>
      ) : null}

      <View className="px-6 pt-5">
        <Text variant="bodySm" tone="muted">
          Ranked by how much band it is costing. Held means leave it — the minutes belong elsewhere.
        </Text>
      </View>

      <View className="px-6 pt-4">
        <Rule weight="section" />
        {data.map((item) => (
          <View key={item.id}>
            <ListRow
              label={item.title}
              description={item.evidence}
              accessory={<Tag label={COST_LABEL[item.cost]} tone={COST_TONE[item.cost]} />}
              onPress={() => router.push(item.href as Href)}
            />
            <Rule />
          </View>
        ))}
      </View>
    </Screen>
  );
}
