import { ListRow } from '@/components/ui';
import type { PlanTask } from '@/types';

export type PlanTaskRowProps = {
  task: PlanTask;
  onPress?: () => void;
};

/** One task in a plan list — the bench, today's remaining chain, a swap. */
export function PlanTaskRow({ task, onPress }: PlanTaskRowProps) {
  return (
    <ListRow
      label={task.title}
      description={`${task.minutes} min · ${task.reason}`}
      onPress={onPress}
    />
  );
}
