import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/lib/query-keys';
import { services } from '@/services';

export function useMistakeCategories() {
  return useQuery({
    queryKey: queryKeys.mistakes.categories,
    queryFn: () => services.mistakes.listCategories(),
  });
}

export function useMistakes(area = 'all') {
  return useQuery({
    queryKey: queryKeys.mistakes.list(area),
    queryFn: () => services.mistakes.listMistakes(area === 'all' ? undefined : area),
  });
}

export function useMistake(id: string) {
  return useQuery({
    queryKey: queryKeys.mistakes.item(id),
    queryFn: () => services.mistakes.getMistake(id),
    enabled: id.length > 0,
  });
}
