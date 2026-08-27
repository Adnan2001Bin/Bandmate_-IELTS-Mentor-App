import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { View } from 'react-native';

import { DateField } from '@/components/form';
import { OnboardingStep } from '@/components/onboarding';
import { Rule, SegmentedControl, SelectionRow, Text } from '@/components/ui';
import { assessTestDate, MIN_LEAD_DAYS } from '@/features/onboarding/feasibility';
import { addDays } from '@/lib/date';
import { useOnboardingStore } from '@/store';
import type { Band, TestType } from '@/types';

const TARGETS: readonly { band: Band; label: string; description: string }[] = [
  {
    band: 6,
    label: 'Most undergraduate courses',
    description: 'No individual band below 5.5',
  },
  {
    band: 7,
    label: 'Skilled migration, most PR points',
    description: 'No individual band below 6.5',
  },
  {
    band: 7.5,
    label: 'Competitive postgrad, licensing',
    description: 'Nursing and medical boards sit here',
  },
  {
    band: 8,
    label: 'Top-tier and specialist routes',
    description: 'Rarely required — check your body first',
  },
];

const TEST_TYPES: readonly { value: TestType; label: string }[] = [
  { value: 'academic', label: 'Academic' },
  { value: 'general', label: 'General Training' },
];

export default function TargetStep() {
  const router = useRouter();
  const { targetBand, testDate, testType } = useOnboardingStore((state) => state.draft);
  const setDraft = useOnboardingStore((state) => state.setDraft);

  const feasibility = useMemo(() => assessTestDate(testDate), [testDate]);
  const canContinue = targetBand !== null && feasibility !== null && !feasibility.tooSoon;

  return (
    <OnboardingStep
      index={1}
      kicker="Step 02 — your target"
      title="WHAT BAND DO YOU NEED?"
      description="I work backwards from this. An unreachable target is worse than a slower, honest plan."
      canContinue={canContinue}
      onContinue={() => router.push('/time')}
    >
      {TARGETS.map((option) => {
        const selected = targetBand === option.band;

        return (
          <SelectionRow
            key={option.band}
            label={option.label}
            description={option.description}
            selected={selected}
            onPress={() => setDraft({ targetBand: option.band })}
            leading={
              <Text
                variant="h1"
                tone={selected ? 'onPrimary' : 'subtle'}
                className="w-[52px] text-[30px] leading-8"
              >
                {option.band.toFixed(1)}
              </Text>
            }
          />
        );
      })}

      <Rule weight="section" className="my-3" />

      <DateField
        label="Test date"
        value={testDate}
        onChange={(iso) => setDraft({ testDate: iso })}
        placeholder="When do you sit it?"
        minimumDate={addDays(new Date(), 1)}
        hint={feasibility?.note ?? "Not booked yet? Pick roughly when you'll sit it."}
        hintTone={feasibility?.tooSoon ? 'error' : feasibility ? 'accent' : 'muted'}
      />

      <View className="mt-4 gap-2">
        <Text variant="kicker" tone="subtle">
          Test type
        </Text>
        <SegmentedControl
          options={TEST_TYPES}
          value={testType}
          onChange={(value) => setDraft({ testType: value })}
        />
      </View>

      {feasibility && !feasibility.tooSoon ? (
        <Text variant="caption" tone="muted" className="mt-2">
          {feasibility.realisticGain >= 1
            ? `That is room for a real move. I'll pace it rather than cram it.`
            : `More than +${(feasibility.realisticGain + 0.5).toFixed(1)} would need longer. I'll tell you that rather than sell you a fantasy.`}
        </Text>
      ) : (
        <Text variant="caption" tone="muted" className="mt-2">
          I need at least {MIN_LEAD_DAYS} days to build a plan worth following.
        </Text>
      )}
    </OnboardingStep>
  );
}
