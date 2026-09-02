import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { AppHeader } from '@/components/layout';
import { ErrorState, ListRow, Rule, Screen, Skeleton, Text } from '@/components/ui';
import { useProgressHistory } from '@/features/progress';
import type { HistoryKind } from '@/types';

const KIND_LABEL: Record<HistoryKind, string> = {
  mock: 'Mock',
  practice: 'Practice',
  session: 'Session',
};

function formatWhen(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function HistoryScreen() {
  const router = useRouter();
  const { data, isPending, isError, refetch } = useProgressHistory();

  if (isPending) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="History" kicker="Progress" size="compact" onBack={() => router.back()} />
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
        <AppHeader title="History" kicker="Progress" size="compact" onBack={() => router.back()} />
        <View className="px-6 pt-6">
          <ErrorState onRetry={() => void refetch()} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <AppHeader title="History" kicker="Progress" size="compact" onBack={() => router.back()} />

      <View className="px-6 pt-5">
        <Text variant="bodySm" tone="muted">
          Practice, sessions, and sittings. A band is shown only when that sitting produced one.
        </Text>
      </View>

      <View className="px-6 pt-4">
        <Rule weight="section" />
        {data.map((item) => (
          <View key={item.id}>
            <ListRow
              label={item.title}
              description={`${KIND_LABEL[item.kind]} · ${formatWhen(item.at)}`}
              value={item.band !== null ? item.band.toFixed(1) : undefined}
            />
            <Rule />
          </View>
        ))}
      </View>
    </Screen>
  );
}
