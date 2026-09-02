import type { MockPlanProposal, MockReport, MockTest, MockTestSummary } from '@/types';

export type MockTestService = {
  listTests(): Promise<readonly MockTestSummary[]>;
  getTest(id: string): Promise<MockTest>;
  listReports(): Promise<readonly MockReport[]>;
  getReport(id: string): Promise<MockReport>;
  submit(mockId: string): Promise<MockReport>;
  getPlanProposal(reportId: string): Promise<MockPlanProposal>;
  acceptPlan(reportId: string): Promise<void>;
};
