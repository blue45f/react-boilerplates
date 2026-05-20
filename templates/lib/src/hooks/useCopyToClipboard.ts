import { useCallback, useState } from 'react';

export interface UseCopyToClipboardReturn {
  copied: boolean;
  copy: (text: string) => Promise<boolean>;
  error: Error | null;
}

/** 텍스트를 클립보드에 복사하고 결과 상태를 반환하는 훅 */
export function useCopyToClipboard(resetMs = 2000): UseCopyToClipboardReturn {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const copy = useCallback(
    async (text: string) => {
      if (typeof navigator === 'undefined' || !navigator.clipboard) {
        const err = new Error('Clipboard API not available');
        setError(err);
        return false;
      }
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setError(null);
        if (resetMs > 0) {
          setTimeout(() => setCopied(false), resetMs);
        }
        return true;
      } catch (e) {
        setError(e instanceof Error ? e : new Error(String(e)));
        setCopied(false);
        return false;
      }
    },
    [resetMs]
  );

  return { copied, copy, error };
}
