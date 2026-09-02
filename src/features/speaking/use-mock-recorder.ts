import { useCallback, useEffect, useRef, useState } from 'react';

export type MockRecorderStatus = 'idle' | 'recording' | 'stopped';

/**
 * Wall-clock recorder. Duration is real; there is no capture file. A URI can
 * replace this later without changing SpeakingRecorder.
 */
export function useMockRecorder(limitMs?: number) {
  const [status, setStatus] = useState<MockRecorderStatus>('idle');
  const [elapsedMs, setElapsedMs] = useState(0);
  const startedAt = useRef<number | null>(null);
  const elapsedRef = useRef(0);

  useEffect(() => {
    if (status !== 'recording' || startedAt.current === null) {
      return;
    }

    const origin = startedAt.current;
    const id = setInterval(() => {
      const next = Date.now() - origin;
      const capped = limitMs !== undefined ? Math.min(limitMs, next) : next;
      elapsedRef.current = capped;
      setElapsedMs(capped);

      if (limitMs !== undefined && next >= limitMs) {
        setStatus('stopped');
      }
    }, 80);

    return () => clearInterval(id);
  }, [status, limitMs]);

  const start = useCallback(() => {
    startedAt.current = Date.now();
    elapsedRef.current = 0;
    setElapsedMs(0);
    setStatus('recording');
  }, []);

  const stop = useCallback(() => {
    const ms = elapsedRef.current;
    setStatus('stopped');
    return ms;
  }, []);

  const reset = useCallback(() => {
    startedAt.current = null;
    elapsedRef.current = 0;
    setElapsedMs(0);
    setStatus('idle');
  }, []);

  return { status, elapsedMs, start, stop, reset };
}
