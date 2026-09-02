import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { AppHeader } from '@/components/layout';
import { ErrorState, ListRow, Rule, Screen, Skeleton, Tag, Text } from '@/components/ui';
import { MOCK_REPORTS_HREF, mockLobbyHref, useMockTests } from '@/features/mock';

export default function MockLibraryScreen() {
  const router = useRouter();
  const { data, isPending, isError, refetch } = useMockTests();

  if (isPending) {
    return (
      <Screen>
        <AppHeader title="Mock" kicker="Full test, timed" />
        <View className="gap-3 px-6 pt-4">
          <Skeleton height={72} />
          <Skeleton height={72} />
        </View>
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen>
        <AppHeader title="Mock" kicker="Full test, timed" />
        <View className="px-6 pt-6">
          <ErrorState onRetry={() => void refetch()} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <AppHeader title="Mock" kicker="Full test, timed" />

      <View className="px-6 pt-5">
        <Text variant="bodySm" tone="muted">
          Four papers, one sitting. The clock is real. The 40 answers are a model script — not a live
          Cambridge paper.
        </Text>
      </View>

      <View className="px-6 pt-4">
        <Rule weight="section" />
        {data.map((item) => (
          <View key={item.id}>
            <ListRow
              label={item.title}
              description={`${item.kicker} · ${item.minutes} min${item.lastBand ? ` · last ${item.lastBand.toFixed(1)}` : ''}`}
              accessory={item.recommended ? <Tag label="Today" tone="accent" /> : undefined}
              onPress={() => router.push(mockLobbyHref(item.id))}
            />
            <Rule />
          </View>
        ))}
      </View>

      <View className="px-6 pb-2 pt-4">
        <ListRow
          label="Past reports"
          description="Band breakdown by sitting"
          onPress={() => router.push(MOCK_REPORTS_HREF)}
        />
        <Rule weight="section" />
      </View>
    </Screen>
  );
}
