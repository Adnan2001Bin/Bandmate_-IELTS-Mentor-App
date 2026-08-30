import { Tag } from '@/components/ui';
import type { PracticeStatus } from '@/types';

const LABELS: Record<PracticeStatus, string> = {
  recommended: "Today's work",
  gap: 'Below target',
  maintenance: 'Hold the line',
  support: 'Support',
};

export type PracticeStatusTagProps = {
  status: PracticeStatus;
};

export function PracticeStatusTag({ status }: PracticeStatusTagProps) {
  return <Tag label={LABELS[status]} tone={status === 'recommended' || status === 'gap' ? 'accent' : 'outline'} />;
}
