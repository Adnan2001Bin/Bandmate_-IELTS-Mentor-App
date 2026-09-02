import { useMutation, useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/lib/query-keys';
import { services } from '@/services';

export function useSpeakingTopics() {
  return useQuery({
    queryKey: queryKeys.speaking.topics,
    queryFn: () => services.speaking.listTopics(),
  });
}

export function useSpeakingTopic(id: string) {
  return useQuery({
    queryKey: queryKeys.speaking.topic(id),
    queryFn: () => services.speaking.getTopic(id),
    enabled: id.length > 0,
  });
}

export function useSubmitSpeaking() {
  return useMutation({
    mutationFn: services.speaking.submit,
  });
}
