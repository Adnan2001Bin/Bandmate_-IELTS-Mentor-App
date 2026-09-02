import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/lib/query-keys';
import { services } from '@/services';
import type { MentorSendInput } from '@/services';

export function useMentorHome() {
  return useQuery({
    queryKey: queryKeys.mentor.home,
    queryFn: () => services.mentor.getHome(),
  });
}

export function useMentorThread() {
  return useQuery({
    queryKey: queryKeys.mentor.thread,
    queryFn: () => services.mentor.getThread(),
  });
}

export function useSendMentor() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (input: MentorSendInput) => services.mentor.send(input),
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: queryKeys.mentor.thread });
      void client.invalidateQueries({ queryKey: queryKeys.mentor.home });
    },
  });
}
