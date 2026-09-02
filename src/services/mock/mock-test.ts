import { storage, storageKeys } from '@/lib/storage';
import { mockPlanProposal, mockTests, reportFor, seedMockReports } from '@/mocks/mock-tests';
import type { MockReport, MockTest } from '@/types';
import { ServiceError } from '../api/errors';
import type { MockTestService } from '../contracts';
import { delay } from './latency';

let reports: MockReport[] | null = null;

async function loadReports(): Promise<MockReport[]> {
  if (reports) {
    return reports;
  }
  reports = (await storage.get<MockReport[]>(storageKeys.mockReports)) ?? [...seedMockReports];
  return reports;
}

async function saveReports(next: MockReport[]): Promise<void> {
  reports = next;
  await storage.set(storageKeys.mockReports, next);
}

function findTest(id: string): MockTest {
  const found = mockTests.find((item) => item.id === id);
  if (!found) {
    throw new ServiceError('notFound', 'That mock is not in the library.');
  }
  return found;
}

export const mockMockTestService: MockTestService = {
  async listTests() {
    await delay();
    const all = await loadReports();
    return mockTests.map((item) => {
      const last = all.find((report) => report.mockId === item.id);
      return {
        id: item.id,
        title: item.title,
        kicker: item.kicker,
        testType: item.testType,
        minutes: item.minutes,
        recommended: item.recommended,
        lastBand: last?.overall ?? item.lastBand,
      };
    });
  },

  async getTest(id) {
    await delay();
    return findTest(id);
  },

  async listReports() {
    await delay();
    const all = await loadReports();
    return [...all].sort((a, b) => (a.completedAt < b.completedAt ? 1 : -1));
  },

  async getReport(id) {
    await delay();
    const all = await loadReports();
    const found = all.find((item) => item.id === id);
    if (!found) {
      throw new ServiceError('notFound', 'That report is not on file.');
    }
    return found;
  },

  async submit(mockId) {
    await delay(800);
    findTest(mockId);
    const report = reportFor(mockId, new Date().toISOString());
    const all = await loadReports();
    await saveReports([report, ...all.filter((item) => item.id !== report.id)]);
    return report;
  },

  async getPlanProposal(reportId) {
    await delay();
    const all = await loadReports();
    if (!all.some((item) => item.id === reportId)) {
      throw new ServiceError('notFound', 'That report is not on file.');
    }
    return { ...mockPlanProposal };
  },

  async acceptPlan() {
    await delay(200);
  },
};
