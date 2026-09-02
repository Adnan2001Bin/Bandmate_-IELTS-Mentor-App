import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { View } from 'react-native';

import { PracticeResult } from '@/components/ielts';
import { Button, Screen, Text } from '@/components/ui';
import {
  VOCABULARY_LIBRARY_HREF,
  VOCABULARY_REVIEW_HREF,
  useVocabAttemptStore,
} from '@/features/vocabulary';

export default function VocabReviewResultScreen() {
  const router = useRouter();
  const result = useVocabAttemptStore((state) => state.reviewResult);

  if (!result) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View className="px-6 pt-8">
          <Text variant="body" tone="muted">
            No review result. Start from the due queue.
          </Text>
          <Button
            label="Review"
            className="mt-4"
            onPress={() => router.replace(VOCABULARY_REVIEW_HREF)}
          />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <PracticeResult
        kicker="Spaced review"
        correct={result.knew}
        total={result.reviewed}
        headline="Held"
        xp={result.xp}
        pattern={result.pattern}
      />

      <View className="px-6 pb-2 pt-5">
        <Button
          label="Back to library"
          trailingIcon={ArrowRight}
          onPress={() => router.replace(VOCABULARY_LIBRARY_HREF)}
        />
      </View>
    </Screen>
  );
}
