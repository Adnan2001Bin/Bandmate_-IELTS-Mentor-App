import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { View } from 'react-native';

import { ExplanationCard, PracticeResult } from '@/components/ielts';
import { Button, Rule, Screen, Text } from '@/components/ui';
import {
  VOCABULARY_LIBRARY_HREF,
  useVocabAttemptStore,
  vocabCategoryHref,
  vocabQuizHref,
  vocabWordHref,
} from '@/features/vocabulary';

export default function VocabQuizResultScreen() {
  const router = useRouter();
  const { categoryId = '' } = useLocalSearchParams<{ categoryId: string }>();
  const result = useVocabAttemptStore((state) => state.result);
  const startQuiz = useVocabAttemptStore((state) => state.startQuiz);

  if (!result || result.categoryId !== categoryId) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View className="px-6 pt-8">
          <Text variant="body" tone="muted">
            No quiz result. Open the set from the library.
          </Text>
          <Button
            label="Vocabulary library"
            className="mt-4"
            onPress={() => router.replace(VOCABULARY_LIBRARY_HREF)}
          />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <PracticeResult
        kicker="Mini quiz"
        correct={result.correct}
        total={result.total}
        headline="Vocabulary"
        xp={result.xp}
        pattern={result.pattern}
      />

      {result.mistakes.length > 0 ? (
        <View className="px-6 pt-2">
          <Text variant="kicker" tone="subtle" className="pb-2">
            Missed
          </Text>
          <Rule weight="section" />
          {result.mistakes.map((item) => (
            <View key={item.wordId} className="py-2">
              <ExplanationCard
                kicker="Missed"
                body={item.why}
                given={item.given || '—'}
                expected={item.correct}
              />
              <Button
                label="Open the word"
                variant="ghost"
                size="md"
                className="px-0"
                onPress={() => router.push(vocabWordHref(categoryId, item.wordId))}
              />
              <Rule />
            </View>
          ))}
        </View>
      ) : null}

      <View className="px-6 pb-2 pt-5">
        <Button
          label="Practice again"
          trailingIcon={ArrowRight}
          onPress={() => {
            startQuiz(categoryId);
            router.replace(vocabQuizHref(categoryId));
          }}
        />
        <Button
          label="Back to set"
          variant="ghost"
          size="md"
          className="mt-1 px-0"
          onPress={() => router.replace(vocabCategoryHref(categoryId))}
        />
      </View>
    </Screen>
  );
}
