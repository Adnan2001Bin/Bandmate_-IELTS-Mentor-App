import { useRouter, type Href } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { View } from 'react-native';

import { MiraNote, PlanTaskRow } from '@/components/ielts';
import { AppHeader } from '@/components/layout';
import { Button, ErrorState, Rule, Screen, Skeleton, Text } from '@/components/ui';
import { SESSION_HREF } from '@/features/listening';
import { useMentorHome } from '@/features/mentor';
import { PRACTICE_HREF } from '@/features/practice/routes';
import type { MentorPlanLine } from '@/types';

function hrefFor(task: MentorPlanLine): Href {
  if (task.area === 'speaking') {
    return SESSION_HREF;
  }
  if (task.area === 'writing') {
    return '/practice/writing/t2-opinion' as Href;
  }
  return PRACTICE_HREF[task.area];
}

export default function MiraPlanScreen() {
  const router = useRouter();
  const { data, isPending, isError, refetch } = useMentorHome();

  if (isPending) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Study plan" kicker="Mira" size="compact" onBack={() => router.back()} />
        <View className="gap-3 px-6 pt-6">
          <Skeleton height={96} />
        </View>
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Study plan" kicker="Mira" size="compact" onBack={() => router.back()} />
        <View className="px-6 pt-6">
          <ErrorState onRetry={() => void refetch()} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <AppHeader title="Study plan" kicker="Mira" size="compact" onBack={() => router.back()} />

      <View className="px-6 pt-6">
        <Text variant="kicker" tone="subtle">
          {data.plan.minutes} min · {data.currentBand.toFixed(1)} → {data.targetBand.toFixed(1)}
        </Text>
        <Text variant="h2" className="mt-2 uppercase">
          {data.plan.title}
        </Text>
      </View>

      <View className="px-6 pt-5">
        <MiraNote kicker="Why this mix" title="Fluency first" body={data.plan.why} />
      </View>

      <View className="px-6 pt-4">
        <Rule weight="section" />
        {data.plan.tasks.map((task) => (
          <View key={task.title}>
            <PlanTaskRow
              task={{
                id: task.title,
                area: task.area,
                title: task.title,
                reason: task.reason,
                minutes: task.minutes,
                tags: [],
                status: 'pending',
              }}
              onPress={() => router.push(hrefFor(task))}
            />
            <Rule />
          </View>
        ))}
      </View>

      <View className="px-6 pb-2 pt-5">
        <Button
          label="Open today’s session"
          trailingIcon={ArrowRight}
          onPress={() => router.push(SESSION_HREF)}
        />
        <Text variant="caption" tone="muted" className="mt-3">
          Cut from your test date. Not a live model. Swap a block from Today if you want the bench.
        </Text>
      </View>
    </Screen>
  );
}
