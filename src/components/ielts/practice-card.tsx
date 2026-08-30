import { View } from 'react-native';

import { Tag, Text } from '@/components/ui';
import type { PlanTask } from '@/types';

export type PracticeCardProps = {
  task: PlanTask;
};

/** The brief for one chained task inside the session runner. */
export function PracticeCard({ task }: PracticeCardProps) {
  return (
    <View className="gap-3">
      <Text variant="kicker" tone="subtle">
        {task.area}
      </Text>
      <Text variant="h1">{task.title}</Text>
      <Text variant="body" tone="muted">
        {task.reason}
      </Text>
      <Text variant="label">{task.minutes} min</Text>
      {task.tags.length > 0 ? (
        <View className="flex-row flex-wrap gap-1">
          {task.tags.map((tag) => (
            <Tag key={tag} label={tag} tone="outline" />
          ))}
        </View>
      ) : null}
    </View>
  );
}
