import { useRouter } from 'expo-router';
import { X } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { PlanTaskRow } from '@/components/ielts';
import { AppHeader } from '@/components/layout';
import { Button, ErrorState, Rule, Screen, Skeleton, Text } from '@/components/ui';
import { usePlanActions, usePlanBench, useTodayPlan } from '@/features/plan/use-today-plan';
import { control, iconSize, useTheme } from '@/theme';

export default function PlanChangeModal() {
  const router = useRouter();
  const { colors } = useTheme();
  const { data: plan, isPending: planPending, isError: planError, refetch: refetchPlan } =
    useTodayPlan();
  const { data: bench, isPending: benchPending, isError: benchError, refetch: refetchBench } =
    usePlanBench();
  const { skipToday, swapFeatured } = usePlanActions();

  const featured = plan?.tasks.find((task) => task.status === 'pending');
  const isPending = planPending || benchPending;
  const isError = planError || benchError;
  const busy = skipToday.isPending || swapFeatured.isPending;

  const close = () => router.back();

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <AppHeader
        title="Change study plan"
        kicker="Today"
        size="compact"
        action={
          <Pressable
            onPress={close}
            accessibilityRole="button"
            accessibilityLabel="Close"
            hitSlop={8}
            className="items-center justify-center active:opacity-60"
            style={{ width: control.minTouch, height: control.minTouch }}
          >
            <X size={iconSize.xl} color={colors.text} strokeWidth={2.25} />
          </Pressable>
        }
      />

      {isPending ? (
        <View className="gap-3 px-6 pt-6">
          <Skeleton height={48} />
          <Skeleton height={72} />
        </View>
      ) : isError || !plan || !bench ? (
        <View className="px-6 pt-6">
          <ErrorState
            onRetry={() => {
              void refetchPlan();
              void refetchBench();
            }}
          />
        </View>
      ) : (
        <View className="px-6 pt-6">
          <Text variant="kicker" tone="subtle" className="mb-2">
            Featured today
          </Text>
          {featured ? (
            <Text variant="h3">{featured.title}</Text>
          ) : (
            <Text variant="body" tone="muted">
              Nothing left in today&apos;s queue.
            </Text>
          )}
          <Text variant="caption" tone="muted" className="mt-2">
            Swap the featured brief for something on the bench, or skip the rest of
            today. The streak holds either way.
          </Text>

          <Rule weight="section" className="mt-5" />

          <Text variant="kicker" tone="subtle" className="pb-3 pt-5">
            Swap in
          </Text>
          {bench.length === 0 || !featured ? (
            <Text variant="bodySm" tone="muted" className="pb-4">
              No bench tasks to swap.
            </Text>
          ) : (
            bench.map((task, index) => (
              <View key={task.id}>
                {index > 0 ? <Rule /> : null}
                <PlanTaskRow
                  task={task}
                  onPress={() => {
                    if (busy) return;
                    swapFeatured.mutate(task.id, { onSuccess: close });
                  }}
                />
              </View>
            ))
          )}
          <Rule weight="section" />

          {featured ? (
            <View className="pt-5">
              <Button
                label="Skip remaining today"
                variant="outline"
                loading={skipToday.isPending}
                disabled={busy}
                onPress={() => skipToday.mutate(undefined as void, { onSuccess: close })}
              />
            </View>
          ) : null}
        </View>
      )}
    </Screen>
  );
}
