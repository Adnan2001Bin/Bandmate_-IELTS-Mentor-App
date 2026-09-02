import { View } from 'react-native';

import { InkPanel, StatCell, Text } from '@/components/ui';
import { formatClock } from '@/lib/speaking';
import type { Band, SpeakingEvaluation as Evaluation } from '@/types';

import { CriterionRow } from './criterion-row';

export type SpeakingEvaluationProps = {
  evaluation: Evaluation;
  target?: Band;
};

/** Debrief body: metrics, the two fixes, four criteria. Band lives on the screen header. */
export function SpeakingEvaluation({ evaluation, target }: SpeakingEvaluationProps) {
  const [first, second] = evaluation.twoFixes;

  return (
    <View>
      <View className="flex-row border-y-2 border-divider">
        <StatCell
          label="Spoken"
          value={formatClock(evaluation.metrics.totalMs)}
          className="flex-1 px-6"
        />
        <StatCell label="Pace" value={String(evaluation.metrics.wpm)} detail="wpm" className="flex-1 px-6" />
        <StatCell
          label="Fillers"
          value={String(evaluation.metrics.fillerCount)}
          tone="accent"
          className="flex-1 px-6"
        />
      </View>

      <View className="px-6 pt-6">
        <Text variant="kicker" tone="subtle" className="mb-3">
          The two fixes
        </Text>
        <InkPanel>
          <Text variant="kicker" tone="onInverseMuted">
            01
          </Text>
          <Text variant="h3" tone="onInverse" className="mt-2">
            {first.title}
          </Text>
          <Text variant="bodySm" tone="onInverseMuted" className="mt-2">
            {first.body}
          </Text>
        </InkPanel>
        <View className="mt-2 border-2 border-divider p-5">
          <Text variant="kicker" tone="subtle">
            02
          </Text>
          <Text variant="h4" className="mt-2">
            {second.title}
          </Text>
          <Text variant="bodySm" tone="muted" className="mt-2">
            {second.body}
          </Text>
        </View>
      </View>

      <View className="px-6 pt-6">
        <Text variant="kicker" tone="subtle" className="pb-1">
          Four criteria
        </Text>
        {evaluation.criteria.map((item) => (
          <CriterionRow
            key={item.criterion}
            criterion={item.criterion}
            band={item.band}
            note={item.note}
            target={target}
          />
        ))}
      </View>
    </View>
  );
}
