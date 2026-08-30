import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/lib/query-keys';
import { services } from '@/services';

export function useTodayPlan() {
  return useQuery({
    queryKey: queryKeys.plan.today,
    queryFn: () => services.plan.getTodayPlan(),
  });
}

export function usePlanDebrief() {
  return useQuery({
    queryKey: queryKeys.plan.debrief,
    queryFn: () => services.plan.getDebrief(),
  });
}

export function usePlanBench() {
  return useQuery({
    queryKey: queryKeys.plan.bench,
    queryFn: () => services.plan.getBench(),
  });
}

export function usePlanActions() {
  const queryClient = useQueryClient();

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: queryKeys.plan.today });
    await queryClient.invalidateQueries({ queryKey: queryKeys.plan.debrief });
  };

  const completeTask = useMutation({
    mutationFn: (taskId: string) => services.plan.completeTask(taskId),
    onSuccess: invalidate,
  });

  const skipToday = useMutation({
    mutationFn: () => services.plan.skipToday(),
    onSuccess: invalidate,
  });

  const swapFeatured = useMutation({
    mutationFn: (taskId: string) => services.plan.swapFeatured(taskId),
    onSuccess: invalidate,
  });

  return { completeTask, skipToday, swapFeatured };
}
