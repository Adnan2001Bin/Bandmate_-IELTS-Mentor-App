import { View } from 'react-native';

import { Tag, Text } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { LeagueMember } from '@/types';

export type LeagueRowProps = {
  rank: number;
  member: LeagueMember;
  className?: string;
};

/** Opt-in league line. Never the hero of Progress. */
export function LeagueRow({ rank, member, className }: LeagueRowProps) {
  return (
    <View className={cn('flex-row items-center gap-3 py-3', className)}>
      <Text variant="h3" className="w-8">
        {rank}
      </Text>
      <View className="flex-1">
        <View className="flex-row items-center gap-2">
          <Text variant="h4">{member.name}</Text>
          {member.you ? <Tag label="You" tone="accent" /> : null}
        </View>
        <Text variant="caption" tone="muted">
          {member.streakDays}-day streak
        </Text>
      </View>
      <Text variant="label">{member.xp} XP</Text>
    </View>
  );
}
