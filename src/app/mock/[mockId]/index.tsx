import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { View } from 'react-native';

import { MiraNote } from '@/components/ielts';
import { AppHeader } from '@/components/layout';
import { Button, ErrorState, Rule, Screen, Skeleton, Tag, Text } from '@/components/ui';
import { mockRunHref, useMockAttemptStore, useMockTest } from '@/features/mock';

export default function MockLobbyScreen() {
  const router = useRouter();
  const { mockId = '' } = useLocalSearchParams<{ mockId: string }>();
  const { data, isPending, isError, refetch } = useMockTest(mockId);
  const start = useMockAttemptStore((state) => state.start);

  if (isPending) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Test lobby" kicker="Mock" size="compact" onBack={() => router.back()} />
        <View className="gap-3 px-6 pt-6">
          <Skeleton height={96} />
        </View>
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Test lobby" kicker="Mock" size="compact" onBack={() => router.back()} />
        <View className="px-6 pt-6">
          <ErrorState onRetry={() => void refetch()} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <AppHeader title={data.title} kicker="Lobby" size="compact" onBack={() => router.back()} />

      <View className="flex-row border-b-2 border-divider px-6 py-4">
        <View className="flex-1">
          <Text variant="kicker" tone="subtle">
            Sitting
          </Text>
          <Text variant="h3" className="mt-1">
            {data.minutes} min
          </Text>
        </View>
        <View className="flex-1">
          <Text variant="kicker" tone="subtle">
            Type
          </Text>
          <Tag
            label={data.testType === 'academic' ? 'Academic' : 'General Training'}
            className="mt-2"
            tone="ink"
          />
        </View>
      </View>

      <View className="px-6 pt-5">
        <MiraNote kicker="Mira’s prediction" title="Do not expect 7.0 from this sitting" body={data.prediction} />
      </View>

      <View className="px-6 pt-5">
        <Text variant="kicker" tone="subtle" className="pb-2">
          Papers
        </Text>
        <Rule weight="section" />
        {data.sections.map((item) => (
          <View key={item.id}>
            <View className="py-3">
              <Text variant="h4">{item.title}</Text>
              <Text variant="caption" tone="muted" className="mt-1">
                {item.minutes} min · {item.items} items
              </Text>
            </View>
            <Rule />
          </View>
        ))}
      </View>

      <View className="px-6 pt-5">
        <Text variant="kicker" tone="subtle" className="mb-2">
          Exam rules
        </Text>
        {data.rules.map((rule) => (
          <Text key={rule} variant="bodySm" tone="muted" className="mb-2">
            {rule}
          </Text>
        ))}
      </View>

      <View className="px-6 pb-2 pt-5">
        <Button
          label="Start the sitting"
          trailingIcon={ArrowRight}
          onPress={() => {
            start(data.id);
            router.push(mockRunHref(data.id));
          }}
        />
      </View>
    </Screen>
  );
}
