import { useRouter } from 'expo-router';
import { View } from 'react-native';

import {
  MiraNote,
  ProgressCard,
  SessionCard,
  StreakStrip,
} from '@/components/ielts';
import { MiraMark } from '@/components/mira';
import {
  EmptyState,
  ErrorState,
  Rule,
  Screen,
  Skeleton,
  Text,
} from '@/components/ui';
import { useTodayPlan } from '@/features/plan/use-today-plan';
import { PRACTICE_HREF } from '@/features/practice/routes';
import { SESSION_HREF } from '@/features/listening';

export default function TodayScreen() {
  const router = useRouter();
  const { data: plan, isPending, isError, refetch } = useTodayPlan();

  if (isPending) {
    return (
      <Screen>
        <View className="gap-4 px-6 pt-6">
          <Skeleton height={12} width="55%" />
          <Skeleton height={72} />
          <Skeleton height={160} />
        </View>
      </Screen>
    );
  }

  if (isError || !plan) {
    return (
      <Screen>
        <View className="px-6 pt-8">
          <ErrorState onRetry={() => void refetch()} />
        </View>
      </Screen>
    );
  }

  const next = plan.tasks.find((task) => task.status === 'pending');
  const daysLabel =
    plan.daysToTest < 0
      ? 'Test day has passed'
      : plan.daysToTest === 0
        ? 'Test day'
        : `${plan.daysToTest} to test day`;

  return (
    <Screen scroll>
      <View className="flex-row items-center justify-between px-6 pb-3 pt-4">
        <View className="flex-1 pr-3">
          <Text variant="kicker" tone="subtle" numberOfLines={1}>
            Day {plan.dayNumber} — {daysLabel}
          </Text>
        </View>
        <StreakStrip days={plan.streakDays} />
      </View>

      <View className="flex-row gap-3.5 border-b-2 border-divider px-6 pb-5">
        <MiraMark size={42} />
        <View className="flex-1">
          <Text variant="h2" className="uppercase">
            {plan.headline}
          </Text>
          <Text variant="bodySm" tone="muted" className="mt-2">
            {plan.headlineBody}
          </Text>
        </View>
      </View>

      {next ? (
        <SessionCard
          kicker={`Today's session — ${plan.totalMinutes} min`}
          title={next.title}
          tags={next.tags}
          onStart={() => router.push(SESSION_HREF)}
          onMore={() => router.push('/plan-change')}
        />
      ) : (
        <View className="px-6 py-5">
          <EmptyState
            title="That's today's plan"
            description="Nothing left in the queue. Open Practice if you still want a set, or rest."
            action={{
              label: 'Open Practice',
              onPress: () => router.push('/(tabs)/practice'),
            }}
          />
        </View>
      )}

      <ProgressCard
        forecast={plan.forecast}
        forecastDelta={plan.forecastDelta}
        mocksDone={plan.mocksDone}
        mocksTotal={plan.mocksTotal}
        onForecastPress={() => router.push('/progress')}
      />

      <View className="px-6 py-5">
        <Text variant="kicker" tone="subtle" className="mb-3">
          Mira flagged something
        </Text>
        <MiraNote
          title={plan.flag.title}
          body={plan.flag.body}
          ctaLabel={plan.flag.ctaLabel}
          onPress={() => router.push(PRACTICE_HREF[plan.flag.area])}
        />
      </View>

      <Rule weight="section" />
    </Screen>
  );
}
