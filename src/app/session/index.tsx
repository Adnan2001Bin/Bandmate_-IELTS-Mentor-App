import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { useEffect } from 'react';
import { View } from 'react-native';

import { PracticeCard } from '@/components/ielts';
import { AppHeader } from '@/components/layout';
import { Button, ErrorState, Screen, Skeleton, StepProgress, Text } from '@/components/ui';
import { LISTENING_LIBRARY_HREF } from '@/features/listening';
import { usePlanActions, useTodayPlan } from '@/features/plan/use-today-plan';

/**
 * Chains today's tasks. The actual listening / writing / speaking modules are
 * Phase 07 — this shell walks you from one brief to the next.
 */
export default function SessionRunnerScreen() {
  const router = useRouter();
  const { data: plan, isPending, isError, refetch } = useTodayPlan();
  const { completeTask } = usePlanActions();

  const pending = plan?.tasks.filter((task) => task.status === 'pending') ?? [];
  const done = plan?.tasks.filter((task) => task.status === 'done').length ?? 0;
  const current = pending[0];

  useEffect(() => {
    if (!isPending && plan && !current) {
      router.replace('/session/debrief');
    }
  }, [isPending, plan, current, router]);

  if (isPending || (plan && !current)) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View className="gap-4 px-6 pt-8">
          <Skeleton height={12} />
          <Skeleton height={80} />
        </View>
      </Screen>
    );
  }

  if (isError || !plan || !current) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View className="px-6 pt-8">
          <ErrorState onRetry={() => void refetch()} />
        </View>
      </Screen>
    );
  }

  const stepIndex = done;

  return (
    <Screen edges={['top', 'bottom']}>
      <AppHeader
        title="Today's session"
        kicker={`Task ${stepIndex + 1} of ${plan.tasks.length}`}
        size="compact"
        onBack={() => router.back()}
      />

      <View className="px-6 pt-4">
        <StepProgress total={plan.tasks.length} current={stepIndex} />
      </View>

      <View className="flex-1 px-6 pt-8">
        <PracticeCard task={current} />
        <Text variant="caption" tone="subtle" className="mt-6">
          Completing this brief moves you along today&apos;s chain. The full{' '}
          {current.area} module is next.
        </Text>
      </View>

      <View className="px-6 pb-2 pt-3">
        {current.area === 'listening' ? (
          <Button
            label="Open listening set"
            trailingIcon={ArrowRight}
            onPress={() => router.push(LISTENING_LIBRARY_HREF)}
          />
        ) : null}
        <Button
          label={pending.length > 1 ? 'Mark done · next' : 'Mark done · finish'}
          trailingIcon={current.area === 'listening' ? undefined : ArrowRight}
          variant={current.area === 'listening' ? 'ghost' : 'primary'}
          size={current.area === 'listening' ? 'md' : 'lg'}
          loading={completeTask.isPending}
          onPress={() => {
            completeTask.mutate(current.id, {
              onSuccess: (next) => {
                const still = next.tasks.some((task) => task.status === 'pending');
                if (!still) {
                  router.replace('/session/debrief');
                }
              },
            });
          }}
        />
        <Button
          label="Change plan"
          variant="ghost"
          size="md"
          onPress={() => router.push('/plan-change')}
          className="mt-1 px-0"
        />
      </View>
    </Screen>
  );
}
