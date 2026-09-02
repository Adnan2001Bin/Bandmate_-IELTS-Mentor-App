import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { TestTimer } from '@/components/ielts';
import { AppHeader } from '@/components/layout';
import { Button, ErrorState, Screen, Skeleton, Text } from '@/components/ui';
import {
  mockAnalyzingHref,
  mockLobbyHref,
  useMockAttemptStore,
  useMockTest,
} from '@/features/mock';
import { formatClock } from '@/lib/listening';

export default function MockRunScreen() {
  const router = useRouter();
  const { mockId = '' } = useLocalSearchParams<{ mockId: string }>();
  const { data, isPending, isError, refetch } = useMockTest(mockId);
  const storeMockId = useMockAttemptStore((state) => state.mockId);
  const sectionIndex = useMockAttemptStore((state) => state.sectionIndex);
  const sectionStartedAt = useMockAttemptStore((state) => state.sectionStartedAt);
  const nextSection = useMockAttemptStore((state) => state.nextSection);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (isPending) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View className="gap-3 px-6 pt-8">
          <Skeleton height={24} />
          <Skeleton height={120} />
        </View>
      </Screen>
    );
  }

  const section = data?.sections[sectionIndex];

  if (isError || !data || !section || storeMockId !== mockId || !sectionStartedAt) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View className="px-6 pt-8">
          <ErrorState
            onRetry={() => {
              if (storeMockId !== mockId) {
                router.replace(mockLobbyHref(mockId));
                return;
              }
              void refetch();
            }}
          />
        </View>
      </Screen>
    );
  }

  const durationMs = section.minutes * 60 * 1000;
  const remainingMs = Math.max(0, durationMs - (now - sectionStartedAt));
  const isLast = sectionIndex >= data.sections.length - 1;

  return (
    <Screen edges={['top', 'bottom']}>
      <AppHeader
        title={section.title}
        kicker={`Paper ${sectionIndex + 1} of ${data.sections.length}`}
        size="compact"
        onBack={() => router.back()}
        action={<TestTimer remainingMs={remainingMs} warnBelowMs={5 * 60 * 1000} />}
      />

      <View className="flex-1 px-6 pt-6">
        <Text variant="kicker" tone="subtle">
          {formatClock(remainingMs)} left · {section.items} items
        </Text>
        <Text variant="h2" className="mt-3 uppercase">
          {section.title}
        </Text>
        <Text variant="bodySm" tone="muted" className="mt-3">
          {section.brief}
        </Text>
        <Text variant="caption" tone="muted" className="mt-6">
          Submit when you would turn the paper in. You do not have to wait out the clock.
        </Text>
      </View>

      <View className="px-6 pb-2 pt-3">
        <Button
          label={isLast ? 'Submit sitting' : 'Submit this paper'}
          trailingIcon={ArrowRight}
          onPress={() => {
            if (isLast) {
              router.replace(mockAnalyzingHref(mockId));
              return;
            }
            nextSection();
          }}
        />
      </View>
    </Screen>
  );
}
