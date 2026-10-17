'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { sections } from '@/config/content/sections';
import { notifyError } from '@/lib/notify';

import { Check, Copy } from 'lucide-react';

const copy = sections.contact.emailCopy;

type EmailCopyButtonProps = {
  email: string;
};

/**
 * Copies `text`, falling back to the legacy `execCommand` path when the async
 * Clipboard API is unavailable (non-secure context, older browsers).
 */
const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (globalThis.navigator?.clipboard?.writeText) {
      await globalThis.navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Denied or unavailable: fall through to the legacy path below.
  }

  try {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.append(area);
    area.select();
    const copied = document.execCommand('copy');
    area.remove();
    return copied;
  } catch {
    return false;
  }
};

const EmailCopyButton = ({ email }: EmailCopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = useCallback(async () => {
    if (!(await copyToClipboard(email))) {
      notifyError(copy.error);
      return;
    }

    setCopied(true);
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => setCopied(false), 2000);
  }, [email]);

  return (
    <button
      type='button'
      onClick={handleCopy}
      aria-label={copied ? copy.copiedFor : copy.labelFor}
      className='inline-flex min-h-[48px] min-w-[48px] items-center justify-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-300 transition-colors hover:border-primary-600 hover:text-zinc-100'
    >
      {copied ? (
        <Check size={18} aria-hidden='true' className='text-primary-400' />
      ) : (
        <Copy size={18} aria-hidden='true' />
      )}
      <span aria-live='polite'>{copied ? copy.copied : copy.label}</span>
    </button>
  );
};

export default EmailCopyButton;
