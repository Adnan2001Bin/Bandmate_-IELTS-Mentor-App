import { create } from 'zustand';

import { setAuthToken } from '@/services/api/client';
import { services } from '@/services';
import type { AuthSession } from '@/types';

type SessionState = {
  session: AuthSession | null;
  /** False until the persisted session has been read — routing waits on this. */
  isHydrated: boolean;
  hydrate: () => Promise<void>;
  setSession: (session: AuthSession | null) => void;
  signOut: () => Promise<void>;
};

/**
 * Client state only. Server data lives in TanStack Query; this store just holds
 * who is signed in, because routing decisions need it synchronously.
 */
export const useSessionStore = create<SessionState>((set) => ({
  session: null,
  isHydrated: false,

  async hydrate() {
    const session = await services.auth.getSession();
    setAuthToken(session?.token ?? null);
    set({ session, isHydrated: true });
  },

  setSession(session) {
    setAuthToken(session?.token ?? null);
    set({ session });
  },

  async signOut() {
    await services.auth.signOut();
    setAuthToken(null);
    set({ session: null });
  },
}));
