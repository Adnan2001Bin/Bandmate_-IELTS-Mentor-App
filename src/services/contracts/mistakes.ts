import type { Mistake, MistakeCategory } from '@/types';

export type MistakeService = {
  listCategories(): Promise<readonly MistakeCategory[]>;
  listMistakes(area?: string): Promise<readonly Mistake[]>;
  getMistake(id: string): Promise<Mistake>;
};
