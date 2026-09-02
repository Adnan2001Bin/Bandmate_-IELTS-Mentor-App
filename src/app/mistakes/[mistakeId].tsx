import { useLocalSearchParams, useRouter, type Href } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { View } from 'react-native';

import { ExplanationCard } from '@/components/ielts';
import { AppHeader } from '@/components/layout';
import { Button, ErrorState, Screen, Skeleton, Tag, Text } from '@/components/ui';
import { useMistake } from '@/features/mistakes';

export default function MistakeDetailScreen() {
  const router = useRouter();
  const { mistakeId = '' } = useLocalSearchParams<{ mistakeId: string }>();
  const { data, isPending, isError, refetch } = useMistake(mistakeId);

  if (isPending) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Mistake" kicker="Notebook" size="compact" onBack={() => router.back()} />
        <View className="gap-3 px-6 pt-6">
          <Skeleton height={96} />
        </View>
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Mistake" kicker="Notebook" size="compact" onBack={() => router.back()} />
        <View className="px-6 pt-6">
          <ErrorState onRetry={() => void refetch()} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <AppHeader title={data.category} kicker="Notebook" size="compact" onBack={() => router.back()} />

      <View className="px-6 pt-5">
        <Tag label={data.area} tone="outline" />
        <Text variant="h2" className="mt-3">
          {data.prompt}
        </Text>
      </View>

      <View className="px-6 pt-5">
        <ExplanationCard body={data.why} given={data.given} expected={data.expected} />
      </View>

      <View className="px-6 pb-2 pt-6">
        <Button
          label="Practice again"
          trailingIcon={ArrowRight}
          onPress={() => router.push(data.href as Href)}
        />
        <Text variant="caption" tone="muted" className="mt-3">
          Opens the drill this miss came from. The notebook does not invent a new paper.
        </Text>
      </View>
    </Screen>
  );
}
