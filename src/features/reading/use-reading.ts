import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/lib/query-keys';
import { services } from '@/services';

export function useReadingSets() {
  return useQuery({
    queryKey: queryKeys.reading.sets,
    queryFn: () => services.reading.listSets(),
  });
}

export function useReadingSet(id: string) {
  return useQuery({
    queryKey: queryKeys.reading.set(id),
    queryFn: () => services.reading.getSet(id),
    enabled: id.length > 0,
  });
}

export function useReadingSaved() {
  return useQuery({
    queryKey: queryKeys.reading.saved,
    queryFn: () => services.reading.listSaved(),
  });
}

export function useSubmitReading() {
  return useMutation({
    mutationFn: services.reading.submit,
  });
}

export function useSaveReadingQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: services.reading.saveQuestion,
    onSuccess: (items) => {
      queryClient.setQueryData(queryKeys.reading.saved, items);
    },
  });
}

export function useUnsaveReadingQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: services.reading.unsaveQuestion,
    onSuccess: (items) => {
      queryClient.setQueryData(queryKeys.reading.saved, items);
    },
  });
}
