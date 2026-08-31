import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/lib/query-keys';
import { services } from '@/services';

export function useWritingTasks() {
  return useQuery({
    queryKey: queryKeys.writing.tasks,
    queryFn: () => services.writing.listTasks(),
  });
}

export function useWritingTask(id: string) {
  return useQuery({
    queryKey: queryKeys.writing.task(id),
    queryFn: () => services.writing.getTask(id),
    enabled: id.length > 0,
  });
}

export function useWritingDrafts() {
  return useQuery({
    queryKey: queryKeys.writing.drafts,
    queryFn: () => services.writing.listDrafts(),
  });
}

export function useWritingDraft(taskId: string) {
  return useQuery({
    queryKey: queryKeys.writing.draft(taskId),
    queryFn: () => services.writing.getDraft(taskId),
    enabled: taskId.length > 0,
  });
}

export function useSaveWritingDraft() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: services.writing.saveDraft,
    onSuccess: (_void, input) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.writing.draft(input.taskId) });
      void queryClient.invalidateQueries({ queryKey: queryKeys.writing.drafts });
    },
  });
}

export function useSubmitWriting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: services.writing.submit,
    onSuccess: (_result, input) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.writing.draft(input.taskId) });
      void queryClient.invalidateQueries({ queryKey: queryKeys.writing.drafts });
    },
  });
}

export function useSimulateOcr() {
  return useMutation({
    mutationFn: services.writing.simulateOcr,
  });
}

export function useCheckRewrite() {
  return useMutation({
    mutationFn: services.writing.checkRewrite,
  });
}
