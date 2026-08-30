import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { View } from 'react-native';

import { BandScore } from '@/components/ielts';
import { MiraMark } from '@/components/mira';
import { Button, ErrorState, Rule, Screen, Skeleton, Text } from '@/components/ui';
import { usePlanDebrief } from '@/features/plan/use-today-plan';

export default function SessionDebriefScreen() {
  const router = useRouter();
  const { data, isPending, isError, refetch } = usePlanDebrief();

  if (isPending) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View className="gap-4 px-6 pt-8">
          <Skeleton height={80} />
          <Skeleton height={48} />
        </View>
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View className="px-6 pt-8">
          <ErrorState onRetry={() => void refetch()} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <View className="border-b-2 border-divider px-6 pb-5 pt-6">
        <Text variant="kicker" tone="subtle">
          Session {data.sessionNumber} complete — {data.minutes} min
        </Text>
        <View className="mt-2 flex-row items-end gap-3.5">
          <Text variant="displayLg">
            {data.completed}
            <Text variant="displaySm" tone="subtle">
              /{data.total}
            </Text>
          </Text>
          <View className="pb-1.5">
            <Text variant="label">Tasks done</Text>
            <Text variant="caption" tone="muted" className="mt-0.5">
              today&apos;s chain
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-row border-b-2 border-divider">
        <View className="flex-1 border-r border-divider px-4 py-3.5">
          <Text variant="h2">+{data.xp}</Text>
          <Text variant="kicker" tone="subtle" className="mt-1">
            XP
          </Text>
        </View>
        <View className="flex-1 border-r border-divider px-4 py-3.5">
          <Text variant="h2">{data.streakDays}</Text>
          <Text variant="kicker" tone="subtle" className="mt-1">
            Day streak
          </Text>
        </View>
        <View className="flex-1 px-4 py-3.5">
          {data.liftBand !== null ? (
            <BandScore value={data.liftBand} size="md" />
          ) : (
            <Text variant="h2">—</Text>
          )}
          <Text variant="kicker" tone="subtle" className="mt-1">
            {data.liftSkill ?? 'Band'}
          </Text>
        </View>
      </View>

      <View className="flex-row gap-3 px-6 py-5">
        <MiraMark size={34} />
        <View className="flex-1">
          <Text variant="kicker" tone="subtle" className="mb-2">
            One pattern worth naming
          </Text>
          <Text variant="bodySm">{data.pattern}</Text>
        </View>
      </View>

      <Rule weight="section" />

      <View className="px-6 pb-2 pt-5">
        {data.next ? (
          <Text variant="bodySm" tone="muted" className="mb-3">
            Next in today&apos;s plan — <Text variant="label">{data.next.title}</Text>,{' '}
            {data.next.minutes} min.
          </Text>
        ) : (
          <Text variant="bodySm" tone="muted" className="mb-3">
            That&apos;s the plan. Rest, or open Practice if you still have room.
          </Text>
        )}

        {data.next ? (
          <Button
            label="Continue"
            trailingIcon={ArrowRight}
            onPress={() => router.replace('/session/index')}
          />
        ) : (
          <Button
            label="Back to Today"
            trailingIcon={ArrowRight}
            onPress={() => router.replace('/')}
          />
        )}

        <Button
          label="Open Practice"
          variant="ghost"
          size="md"
          onPress={() => router.replace('/(tabs)/practice')}
          className="mt-1 px-0"
        />
      </View>
    </Screen>
  );
}
