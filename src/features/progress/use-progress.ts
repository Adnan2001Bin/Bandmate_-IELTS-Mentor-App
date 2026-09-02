import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/lib/query-keys';
import { services } from '@/services';

export function useProgressSnapshot() {
  return useQuery({
    queryKey: queryKeys.progress.snapshot,
    queryFn: () => services.progress.getSnapshot(),
  });
}

export function useProgressHistory() {
  return useQuery({
    queryKey: queryKeys.progress.history,
    queryFn: () => services.progress.listHistory(),
  });
}

export function useWeaknesses() {
  return useQuery({
    queryKey: queryKeys.progress.weaknesses,
    queryFn: () => services.progress.listWeaknesses(),
  });
}

export function useLeague() {
  return useQuery({
    queryKey: queryKeys.progress.league,
    queryFn: () => services.progress.getLeague(),
  });
}

export function useLeagueOptIn() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (optedIn: boolean) => services.progress.setLeagueOptIn(optedIn),
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: queryKeys.progress.league });
    },
  });
}
