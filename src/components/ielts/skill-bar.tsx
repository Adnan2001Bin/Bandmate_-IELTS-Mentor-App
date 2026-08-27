import { View } from 'react-native';

import { ProgressBar, Text } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { Band, Skill } from '@/types';

const SKILL_LABELS: Record<Skill, string> = {
  listening: 'Listening',
  reading: 'Reading',
  writing: 'Writing',
  speaking: 'Speaking',
};

/** Bands run 4 to 9 on screen; anything below 4 is not reported. */
const FLOOR = 4;
const CEILING = 9;

const toRatio = (band: number) => (band - FLOOR) / (CEILING - FLOOR);

export type SkillBarProps = {
  skill: Skill;
  band: Band;
  target: Band;
  className?: string;
};

/**
 * One skill against the target: the bar is where you are, the rule is where you
 * need to be. Bars that fall short of the target carry the accent.
 */
export function SkillBar({ skill, band, target, className }: SkillBarProps) {
  const isShort = target - band >= 1;

  return (
    <View className={cn('flex-row items-center gap-3 border-t border-divider py-3', className)}>
      <Text variant="label" className="w-[68px]">
        {SKILL_LABELS[skill]}
      </Text>

      <ProgressBar
        value={toRatio(band)}
        target={toRatio(target)}
        height={18}
        tone={isShort ? 'accent' : 'ink'}
        className="flex-1"
        accessibilityLabel={`${SKILL_LABELS[skill]} band ${band}, target ${target}`}
      />

      <Text variant="h3" className="w-8 text-right">
        {band.toFixed(1)}
      </Text>
    </View>
  );
}
