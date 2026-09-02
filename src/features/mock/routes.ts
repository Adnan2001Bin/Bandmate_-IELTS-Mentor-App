import type { Href } from 'expo-router';

export const MOCK_REPORTS_HREF = '/mock/reports' as Href;

export function mockLobbyHref(id: string): Href {
  return `/mock/${id}` as Href;
}

export function mockRunHref(id: string): Href {
  return `/mock/${id}/run` as Href;
}

export function mockAnalyzingHref(id: string): Href {
  return `/mock/${id}/analyzing` as Href;
}

export function mockPlanHref(reportId: string): Href {
  return `/mock/reports/${reportId}/plan` as Href;
}

export function mockReportHref(reportId: string): Href {
  return `/mock/reports/${reportId}` as Href;
}
