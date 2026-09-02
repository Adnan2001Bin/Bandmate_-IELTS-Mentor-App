import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { AppHeader } from '@/components/layout';
import { EmptyState, ErrorState, ListRow, Rule, Screen, Skeleton } from '@/components/ui';
import { mockReportHref, useMockReports } from '@/features/mock';

export default function MockReportsScreen() {
  const router = useRouter();
  const { data, isPending, isError, refetch } = useMockReports();

  if (isPending) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Past reports" kicker="Mock" size="compact" onBack={() => router.back()} />
        <View className="gap-3 px-6 pt-6">
          <Skeleton height={72} />
        </View>
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Past reports" kicker="Mock" size="compact" onBack={() => router.back()} />
        <View className="px-6 pt-6">
          <ErrorState onRetry={() => void refetch()} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <AppHeader title="Past reports" kicker="Mock" size="compact" onBack={() => router.back()} />

      <View className="px-6 pt-4">
        <Rule weight="section" />
        {data.length === 0 ? (
          <View className="py-6">
            <EmptyState
              title="No sittings yet"
              description="Finish a mock and the band report lands here."
            />
          </View>
        ) : (
          data.map((item) => (
            <View key={item.id}>
              <ListRow
                label={item.title}
                description={`${item.completedAt.slice(0, 10)} · overall ${item.overall.toFixed(1)}`}
                onPress={() => router.push(mockReportHref(item.id))}
              />
              <Rule />
            </View>
          ))
        )}
      </View>
    </Screen>
  );
}
