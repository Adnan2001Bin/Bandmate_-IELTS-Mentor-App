import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { View } from 'react-native';

import { AppHeader } from '@/components/layout';
import { Button, ErrorState, ListRow, Rule, Screen, Skeleton, Tag, Text } from '@/components/ui';
import { speakingTopicHref, useSpeakingTopics } from '@/features/speaking';

export default function SpeakingLibraryScreen() {
  const router = useRouter();
  const { data, isPending, isError, refetch } = useSpeakingTopics();

  if (isPending) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Speaking" kicker="Practice" size="compact" onBack={() => router.back()} />
        <View className="gap-3 px-6 pt-4">
          <Skeleton height={72} />
          <Skeleton height={72} />
        </View>
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Speaking" kicker="Practice" size="compact" onBack={() => router.back()} />
        <View className="px-6 pt-6">
          <ErrorState onRetry={() => void refetch()} />
        </View>
      </Screen>
    );
  }

  const surprise = () => {
    const pick = data[Math.floor(Math.random() * data.length)];
    if (pick) {
      router.push(speakingTopicHref(pick.id, 'random'));
    }
  };

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <AppHeader title="Speaking" kicker="Practice" size="compact" onBack={() => router.back()} />

      <View className="px-6 pt-5">
        <Text variant="bodySm" tone="muted">
          Parts 1 to 3. Original topics. The clock is real; the microphone is not wired yet. Pick a
          topic, or let Mira choose.
        </Text>
        <Button
          label="Surprise me"
          trailingIcon={ArrowRight}
          className="mt-4"
          onPress={surprise}
        />
      </View>

      <View className="px-6 pt-4">
        <Rule weight="section" />
        {data.map((topic) => (
          <View key={topic.id}>
            <ListRow
              label={topic.title}
              description={`${topic.theme} · ${topic.minutes} min · Parts 1–3`}
              accessory={topic.recommended ? <Tag label="Today" tone="accent" /> : undefined}
              onPress={() => router.push(speakingTopicHref(topic.id))}
            />
            <Rule />
          </View>
        ))}
      </View>
    </Screen>
  );
}
