'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { Check, Copy } from 'lucide-react';

type EmailCopyButtonProps = {
  email: string;
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
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
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
      aria-label={copied ? 'Email address copied' : 'Copy email address'}
      className='inline-flex min-h-[48px] min-w-[48px] items-center justify-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-300 transition-colors hover:border-primary-600 hover:text-zinc-100'
    >
      {copied ? (
        <Check size={18} aria-hidden='true' className='text-primary-400' />
      ) : (
        <Copy size={18} aria-hidden='true' />
      )}
      <span aria-live='polite'>{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
};

export default EmailCopyButton;
