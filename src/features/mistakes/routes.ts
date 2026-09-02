import type { Href } from 'expo-router';

export const MISTAKES_HREF = '/mistakes' as Href;

export function mistakeHref(id: string): Href {
  return `/mistakes/${id}` as Href;
}
