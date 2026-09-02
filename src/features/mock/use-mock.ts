import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/lib/query-keys';
import { services } from '@/services';

export function useMockTests() {
  return useQuery({
    queryKey: queryKeys.mock.tests,
    queryFn: () => services.mockTest.listTests(),
  });
}

export function useMockTest(id: string) {
  return useQuery({
    queryKey: queryKeys.mock.test(id),
    queryFn: () => services.mockTest.getTest(id),
    enabled: id.length > 0,
  });
}

export function useMockReports() {
  return useQuery({
    queryKey: queryKeys.mock.reports,
    queryFn: () => services.mockTest.listReports(),
  });
}

export function useMockReport(id: string) {
  return useQuery({
    queryKey: queryKeys.mock.report(id),
    queryFn: () => services.mockTest.getReport(id),
    enabled: id.length > 0,
  });
}

export function useSubmitMock() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (mockId: string) => services.mockTest.submit(mockId),
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: queryKeys.mock.reports });
      void client.invalidateQueries({ queryKey: queryKeys.mock.tests });
      void client.invalidateQueries({ queryKey: queryKeys.progress.snapshot });
    },
  });
}

export function useMockPlanProposal(reportId: string) {
  return useQuery({
    queryKey: queryKeys.mock.proposal(reportId),
    queryFn: () => services.mockTest.getPlanProposal(reportId),
    enabled: reportId.length > 0,
  });
}

export function useAcceptMockPlan() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (reportId: string) => services.mockTest.acceptPlan(reportId),
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: queryKeys.plan.today });
    },
  });
}
