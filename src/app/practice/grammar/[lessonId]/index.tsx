import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { View } from 'react-native';

import { GrammarLesson } from '@/components/ielts';
import { AppHeader } from '@/components/layout';
import { Button, ErrorState, Screen, Skeleton, Tag } from '@/components/ui';
import {
  GRAMMAR_LIBRARY_HREF,
  grammarPracticeHref,
  useGrammarAttemptStore,
  useGrammarLesson,
} from '@/features/grammar';

export default function GrammarLessonScreen() {
  const router = useRouter();
  const { lessonId = '' } = useLocalSearchParams<{ lessonId: string }>();
  const { data, isPending, isError, refetch } = useGrammarLesson(lessonId);
  const start = useGrammarAttemptStore((state) => state.start);

  if (isPending) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View className="gap-3 px-6 pt-8">
          <Skeleton height={24} />
          <Skeleton height={80} />
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
      <AppHeader title={data.title} kicker={data.kicker} size="compact" onBack={() => router.back()} />

      <View className="px-6 pt-5">
        <View className="mb-4 flex-row flex-wrap gap-1">
          <Tag label={`${data.minutes} min`} tone="outline" />
          <Tag label={`${data.questionCount} items`} tone="outline" />
          {data.recommended ? <Tag label="Today" tone="accent" /> : null}
        </View>
        <GrammarLesson lesson={data} />
      </View>

      <View className="px-6 pb-2 pt-6">
        <Button
          label="Start practice"
          trailingIcon={ArrowRight}
          onPress={() => {
            start(data.id);
            router.push(grammarPracticeHref(data.id));
          }}
        />
        <Button
          label="Back to library"
          variant="ghost"
          size="md"
          className="mt-1 px-0"
          onPress={() => router.replace(GRAMMAR_LIBRARY_HREF)}
        />
      </View>
    </Screen>
  );
}
