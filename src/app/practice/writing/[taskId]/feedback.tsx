import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { MiraNote, RewriteCompare, SentenceFeedback } from '@/components/ielts';
import { AppHeader } from '@/components/layout';
import { Button, Screen, Text, TextArea } from '@/components/ui';
import { useCheckRewrite, useWritingAttemptStore, WRITING_LIBRARY_HREF } from '@/features/writing';

export default function WritingFeedbackScreen() {
  const router = useRouter();
  const { taskId = '' } = useLocalSearchParams<{ taskId: string }>();
  const evaluation = useWritingAttemptStore((state) => state.evaluation);
  const check = useCheckRewrite();
  const [attempt, setAttempt] = useState('');

  if (!evaluation || evaluation.taskId !== taskId) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View className="px-6 pt-8">
          <Text variant="body" tone="muted">
            No evaluation to review.
          </Text>
          <Button
            label="Writing library"
            className="mt-4"
            onPress={() => router.replace(WRITING_LIBRARY_HREF)}
          />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <AppHeader title="The sentences" kicker={evaluation.wordCount + ' words'} size="compact" onBack={() => router.back()} />

      <View className="px-6 pt-5">
        <Text variant="kicker" tone="subtle" className="mb-2">
          Sentence-level
        </Text>
        {evaluation.sentences.length === 0 ? (
          <Text variant="bodySm" tone="muted">
            No local flags in this script. The band still sits in the four criteria.
          </Text>
        ) : (
          evaluation.sentences.map((item) => <SentenceFeedback key={item.id} item={item} />)
        )}
      </View>

      <View className="px-6 pt-8">
        <Text variant="h4" className="mb-4">
          Your paragraph, rewritten
        </Text>
        <RewriteCompare rewrite={evaluation.rewrite} />
      </View>

      <View className="px-6 pt-8 pb-2">
        <Text variant="h4">Rewrite it yourself</Text>
        <Text variant="bodySm" tone="muted" className="mt-2">
          Do not copy the rewrite. Change the claim. Mira will only check that you moved.
        </Text>
        <TextArea
          value={attempt}
          onChangeText={setAttempt}
          minHeight={140}
          className="mt-4"
          placeholder="Your version"
        />
        <Button
          label="Check my rewrite"
          className="mt-4"
          loading={check.isPending}
          disabled={attempt.trim().length === 0}
          onPress={() =>
            check.mutate({ original: evaluation.rewrite.original, attempt })
          }
        />
        {check.data ? (
          <View className="mt-4">
            <MiraNote
              kicker={check.data.ok ? 'What you caught' : 'What happened'}
              title={check.data.ok ? 'You moved it.' : 'Not yet.'}
              body={check.data.note}
            />
          </View>
        ) : null}
      </View>
    </Screen>
  );
}
