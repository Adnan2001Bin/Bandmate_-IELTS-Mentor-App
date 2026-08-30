import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { View } from 'react-native';

import { ResultCard } from '@/components/ielts';
import { MiraMark } from '@/components/mira';
import { Button, ListRow, Rule, Screen, Text } from '@/components/ui';
import {
  READING_LIBRARY_HREF,
  readingReviewHref,
  useReadingAttemptStore,
} from '@/features/reading';
import { useProfile } from '@/features/profile/use-profile';

export default function ReadingResultScreen() {
  const router = useRouter();
  const { setId = '' } = useLocalSearchParams<{ setId: string }>();
  const result = useReadingAttemptStore((state) => state.result);
  const { data: profile } = useProfile();

  if (!result || result.setId !== setId) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View className="px-6 pt-8">
          <Text variant="body" tone="muted">
            No result for this set. Sit the paper from the library.
          </Text>
          <Button
            label="Reading library"
            className="mt-4"
            onPress={() => router.replace(READING_LIBRARY_HREF)}
          />
        </View>
      </Screen>
    );
  }

  const headline = result.correct >= result.total - 1 ? 'Best reading set' : 'Reading set';

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <ResultCard
        kicker={`Passage complete — ${result.mode}`}
        correct={result.correct}
        total={result.total}
        headline={headline}
        detail="this paper"
        xp={result.xp}
        streakDays={profile?.streakDays ?? 0}
        band={result.band}
        bandLabel="Reading"
      />

      <Text variant="caption" tone="muted" className="px-6 pt-3">
        AI estimated band — for practice purposes only.
      </Text>

      <View className="flex-row gap-3 px-6 py-5">
        <MiraMark size={34} />
        <View className="flex-1">
          <Text variant="kicker" tone="subtle" className="mb-2">
            One pattern worth naming
          </Text>
          <Text variant="bodySm">{result.pattern}</Text>
        </View>
      </View>

      {result.mistakes.length > 0 ? (
        <View className="px-6">
          <Text variant="kicker" tone="subtle" className="pb-3">
            Open these in review
          </Text>
          <Rule weight="section" />
          {result.mistakes.map((item) => (
            <View key={item.questionId}>
              <ListRow
                label={`Q${item.number}`}
                description={item.explanation}
                onPress={() => router.push(readingReviewHref(setId, item.number))}
              />
              <Rule />
            </View>
          ))}
        </View>
      ) : (
        <View className="px-6 pb-2">
          <Text variant="bodySm" tone="muted">
            Nothing to bank. Read the passage again only if you want the locate once more.
          </Text>
        </View>
      )}

      <View className="px-6 pb-2 pt-5">
        <Button
          label="Review answers"
          trailingIcon={ArrowRight}
          onPress={() => router.push(readingReviewHref(setId))}
        />
        <Button
          label="Back to library"
          variant="ghost"
          size="md"
          onPress={() => router.replace(READING_LIBRARY_HREF)}
          className="mt-1 px-0"
        />
      </View>
    </Screen>
  );
}
