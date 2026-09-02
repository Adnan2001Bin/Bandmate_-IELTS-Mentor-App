import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/lib/query-keys';
import { services } from '@/services';
import { useSessionStore } from '@/store';
import type { NotificationPrefs, StudyProfile } from '@/types';

export function useProfile() {
  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: () => services.profile.getProfile(),
  });
}

export function useUpdateStudyProfile() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (input: Partial<StudyProfile>) => services.profile.updateStudyProfile(input),
    onSuccess: (profile) => {
      client.setQueryData(queryKeys.profile, profile);
      void client.invalidateQueries({ queryKey: queryKeys.plan.today });
    },
  });
}

export function useUpdateUserName() {
  const client = useQueryClient();
  const setSession = useSessionStore((state) => state.setSession);
  const session = useSessionStore((state) => state.session);

  return useMutation({
    mutationFn: (name: string) => services.profile.updateUser({ name }),
    onSuccess: (profile) => {
      client.setQueryData(queryKeys.profile, profile);
      if (session) {
        setSession({ ...session, user: { ...session.user, name: profile.user.name } });
      }
    },
  });
}

export function useNotificationPrefs() {
  return useQuery({
    queryKey: queryKeys.settings.notifications,
    queryFn: () => services.profile.getNotificationPrefs(),
  });
}

export function useSetNotificationPrefs() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (input: Partial<NotificationPrefs>) => services.profile.setNotificationPrefs(input),
    onSuccess: (prefs) => {
      client.setQueryData(queryKeys.settings.notifications, prefs);
    },
  });
}
