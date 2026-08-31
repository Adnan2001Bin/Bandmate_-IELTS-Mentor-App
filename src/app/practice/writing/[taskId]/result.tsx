import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { View } from 'react-native';

import { BandScore, CriterionRow } from '@/components/ielts';
import { MiraMark } from '@/components/mira';
import { Button, ListRow, Rule, Screen, Text } from '@/components/ui';
import {
  WRITING_LIBRARY_HREF,
  useWritingAttemptStore,
  writingFeedbackHref,
} from '@/features/writing';
import { useProfile } from '@/features/profile/use-profile';
import { PRACTICE_HREF } from '@/features/practice/routes';
import type { WritingCriterion } from '@/types';

const TASK1_LABEL: Partial<Record<WritingCriterion, string>> = {
  taskResponse: 'Task achievement',
};

export default function WritingResultScreen() {
  const router = useRouter();
  const { taskId = '' } = useLocalSearchParams<{ taskId: string }>();
  const evaluation = useWritingAttemptStore((state) => state.evaluation);
  const { data: profile } = useProfile();
  const target = profile?.study.targetBand;

  if (!evaluation || evaluation.taskId !== taskId) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View className="px-6 pt-8">
          <Text variant="body" tone="muted">
            No evaluation for this task. Write it from the library.
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

  const isTask1 = evaluation.taskId.startsWith('t1-');

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <View className="border-b-2 border-divider px-6 pb-5 pt-6">
        <Text variant="kicker" tone="subtle">
          {evaluation.method === 'handwritten' ? 'Paper' : 'Typed'} · {evaluation.mode}
        </Text>
        <View className="mt-2 flex-row items-end gap-3.5">
          <BandScore value={evaluation.band} size="lg" />
          <View className="pb-1.5">
            <Text variant="label">Writing</Text>
            <Text variant="caption" tone="muted" className="mt-0.5">
              {evaluation.wordCount} words · +{evaluation.xp} XP
            </Text>
          </View>
        </View>
      </View>

      <Text variant="caption" tone="muted" className="px-6 pt-3">
        AI estimated band — for practice purposes only.
      </Text>

      <View className="flex-row gap-3 px-6 py-5">
        <MiraMark size={34} />
        <View className="flex-1">
          <Text variant="kicker" tone="subtle" className="mb-2">
            One pattern worth naming
          </Text>
          <Text variant="bodySm">{evaluation.pattern}</Text>
        </View>
      </View>

      <View className="px-6">
        <Text variant="kicker" tone="subtle" className="pb-1">
          Four criteria
        </Text>
        {evaluation.criteria.map((item) => (
          <CriterionRow
            key={item.criterion}
            criterion={item.criterion}
            label={isTask1 ? TASK1_LABEL[item.criterion] : undefined}
            band={item.band}
            note={item.note}
            target={target}
          />
        ))}
        <Rule />
      </View>

      <View className="px-6 pt-5">
        <Text variant="kicker" tone="subtle" className="pb-2">
          Held
        </Text>
        {evaluation.strengths.map((line) => (
          <Text key={line} variant="bodySm" className="pb-1">
            {line}
          </Text>
        ))}
        <Text variant="kicker" tone="subtle" className="pb-2 pt-4">
          The gap
        </Text>
        {evaluation.weaknesses.map((line) => (
          <Text key={line} variant="bodySm" className="pb-1">
            {line}
          </Text>
        ))}
      </View>

      <View className="px-6 pt-5">
        <Text variant="kicker" tone="subtle" className="pb-3">
          Practise next
        </Text>
        <Rule weight="section" />
        {evaluation.recommendations.map((item) => (
          <View key={item.id}>
            <ListRow
              label={item.label}
              description={item.reason}
              onPress={() => router.push(PRACTICE_HREF[item.area])}
            />
            <Rule />
          </View>
        ))}
      </View>

      <View className="px-6 pb-2 pt-5">
        <Button
          label="Sentences and rewrite"
          trailingIcon={ArrowRight}
          onPress={() => router.push(writingFeedbackHref(taskId))}
        />
        <Button
          label="Back to library"
          variant="ghost"
          size="md"
          onPress={() => router.replace(WRITING_LIBRARY_HREF)}
          className="mt-1 px-0"
        />
      </View>
    </Screen>
  );
}
