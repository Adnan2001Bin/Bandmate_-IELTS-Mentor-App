import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { View } from 'react-native';

import { MiraNote } from '@/components/ielts';
import { AppHeader } from '@/components/layout';
import { Button, ErrorState, ListRow, Rule, Screen, Skeleton, Text } from '@/components/ui';
import { useAcceptMockPlan, useMockPlanProposal } from '@/features/mock';

export default function MockPlanScreen() {
  const router = useRouter();
  const { reportId = '' } = useLocalSearchParams<{ reportId: string }>();
  const { data, isPending, isError, refetch } = useMockPlanProposal(reportId);
  const accept = useAcceptMockPlan();

  if (isPending) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Recut the plan" kicker="Mock" size="compact" onBack={() => router.back()} />
        <View className="px-6 pt-6">
          <Skeleton height={96} />
        </View>
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Recut the plan" kicker="Mock" size="compact" onBack={() => router.back()} />
        <View className="px-6 pt-6">
          <ErrorState onRetry={() => void refetch()} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <AppHeader title="Recut the plan" kicker="Mock" size="compact" onBack={() => router.back()} />

      <View className="px-6 pt-6">
        <MiraNote kicker={`${data.minutes} min tomorrow`} title={data.title} body={data.body} />
      </View>

      <View className="px-6 pt-5">
        <Rule weight="section" />
        {data.tasks.map((task) => (
          <View key={task.title}>
            <ListRow label={task.title} description={`${task.minutes} min · ${task.area}`} />
            <Rule />
          </View>
        ))}
      </View>

      <View className="px-6 pb-2 pt-5">
        <Button
          label="Accept this recut"
          trailingIcon={ArrowRight}
          loading={accept.isPending}
          onPress={() => {
            accept.mutate(reportId, {
              onSuccess: () => router.replace('/'),
            });
          }}
        />
        <Button
          label="Keep my plan"
          variant="ghost"
          size="md"
          className="mt-1 px-0"
          onPress={() => router.replace('/')}
        />
        <Text variant="caption" tone="muted" className="mt-3">
          Accept notes the recut. Tomorrow’s session still shows today’s chain until I write a new
          day.
        </Text>
      </View>
    </Screen>
  );
}
