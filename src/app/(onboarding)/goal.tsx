import { useRouter } from 'expo-router';

import { OnboardingStep } from '@/components/onboarding';
import { SelectionRow } from '@/components/ui';
import { useOnboardingStore } from '@/store';
import type { StudyGoal } from '@/types';

const GOALS: readonly { value: StudyGoal; label: string; description: string }[] = [
  {
    value: 'university',
    label: 'University admission',
    description: 'An offer letter or a visa depends on this score.',
  },
  {
    value: 'migration',
    label: 'Skilled migration',
    description: 'Points-based residency, where every half band counts.',
  },
  {
    value: 'licensing',
    label: 'Professional licensing',
    description: 'Nursing, medical or engineering registration.',
  },
  {
    value: 'work',
    label: 'Work or promotion',
    description: 'An employer or a role has asked for proof.',
  },
  {
    value: 'other',
    label: 'Something else',
    description: "Tell Mira later — it won't change the plan much.",
  },
];

export default function GoalStep() {
  const router = useRouter();
  const goal = useOnboardingStore((state) => state.draft.goal);
  const setDraft = useOnboardingStore((state) => state.setDraft);

  return (
    <OnboardingStep
      index={0}
      kicker="Step 01 — why you're here"
      title="WHAT IS THIS SCORE FOR?"
      description="Different goals weight the four skills differently. This is the one thing that changes how I read your results."
      canContinue={goal !== null}
      onContinue={() => router.push('/target')}
    >
      {GOALS.map((option) => (
        <SelectionRow
          key={option.value}
          label={option.label}
          description={option.description}
          selected={goal === option.value}
          onPress={() => setDraft({ goal: option.value })}
        />
      ))}
    </OnboardingStep>
  );
}
