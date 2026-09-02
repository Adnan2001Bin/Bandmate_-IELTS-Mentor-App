import type { Href } from 'expo-router';

export const MIRA_CHAT_HREF = '/mira/chat' as Href;
export const MIRA_PLAN_HREF = '/mira/plan' as Href;

export function miraChatHref(prompt?: string): Href {
  if (!prompt) {
    return MIRA_CHAT_HREF;
  }
  return `/mira/chat?prompt=${encodeURIComponent(prompt)}` as Href;
}
