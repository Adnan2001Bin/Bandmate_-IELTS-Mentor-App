import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/lib/query-keys';
import { services } from '@/services';
import { useOnboardingStore, useSessionStore } from '@/store';
import type { DiagnosticResult, StudyProfile } from '@/types';

type CompleteInput = {
  study: StudyProfile;
  diagnostic: DiagnosticResult;
};

/**
 * The one write that ends onboarding: the answers and the estimate are saved,
 * then the session flag flips and the root guard swaps the auth stack for the
 * tabs. Screens never navigate to the tabs themselves.
 */
export function useCompleteOnboarding() {
  const queryClient = useQueryClient();
  const setSession = useSessionStore((state) => state.setSession);
  const reset = useOnboardingStore((state) => state.reset);

  return useMutation({
    async mutationFn({ study, diagnostic }: CompleteInput) {
      await services.profile.updateStudyProfile(study);
      await services.profile.saveDiagnostic(diagnostic);
      return services.auth.completeOnboarding();
    },

    async onSuccess(session) {
      await queryClient.invalidateQueries({ queryKey: queryKeys.profile });
      reset();
      setSession(session);
    },
  });
}
