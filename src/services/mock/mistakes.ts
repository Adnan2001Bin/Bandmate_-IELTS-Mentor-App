import { mockMistakeCategories, mockMistakes } from '@/mocks/mistakes';
import { ServiceError } from '../api/errors';
import type { MistakeService } from '../contracts';
import { delay } from './latency';

export const mockMistakeService: MistakeService = {
  async listCategories() {
    await delay();
    return [...mockMistakeCategories];
  },

  async listMistakes(area) {
    await delay();
    if (!area) {
      return [...mockMistakes];
    }
    return mockMistakes.filter((item) => item.area === area);
  },

  async getMistake(id) {
    await delay();
    const found = mockMistakes.find((item) => item.id === id);
    if (!found) {
      throw new ServiceError('notFound', 'That mistake is not in the notebook.');
    }
    return found;
  },
};
