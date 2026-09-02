import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { View } from 'react-native';

import { ExplanationCard, PracticeResult } from '@/components/ielts';
import { Button, Rule, Screen, Text } from '@/components/ui';
import {
  GRAMMAR_LIBRARY_HREF,
  grammarLessonHref,
  grammarPracticeHref,
  useGrammarAttemptStore,
} from '@/features/grammar';

export default function GrammarResultScreen() {
  const router = useRouter();
  const { lessonId = '' } = useLocalSearchParams<{ lessonId: string }>();
  const result = useGrammarAttemptStore((state) => state.result);
  const start = useGrammarAttemptStore((state) => state.start);

  if (!result || result.lessonId !== lessonId) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View className="px-6 pt-8">
          <Text variant="body" tone="muted">
            No drill result. Open the lesson from the library.
          </Text>
          <Button
            label="Grammar library"
            className="mt-4"
            onPress={() => router.replace(GRAMMAR_LIBRARY_HREF)}
          />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <PracticeResult
        kicker="Grammar drill"
        correct={result.correct}
        total={result.total}
        headline="Held"
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
            <View key={item.questionId} className="py-2">
              <ExplanationCard
                kicker="Missed"
                body={item.why}
                given={item.given || '—'}
                expected={item.correct}
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
            start(lessonId);
            router.replace(grammarPracticeHref(lessonId));
          }}
        />
        <Button
          label="Back to lesson"
          variant="ghost"
          size="md"
          className="mt-1 px-0"
          onPress={() => router.replace(grammarLessonHref(lessonId))}
        />
      </View>
    </Screen>
  );
}
