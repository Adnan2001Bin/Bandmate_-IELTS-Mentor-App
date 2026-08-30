import { useMutation, useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/lib/query-keys';
import { services } from '@/services';

export function useListeningSets() {
  return useQuery({
    queryKey: queryKeys.listening.sets,
    queryFn: () => services.listening.listSets(),
  });
}

export function useListeningSet(id: string) {
  return useQuery({
    queryKey: queryKeys.listening.set(id),
    queryFn: () => services.listening.getSet(id),
    enabled: id.length > 0,
  });
}

export function useSubmitListening() {
  return useMutation({
    mutationFn: services.listening.submit,
  });
}
