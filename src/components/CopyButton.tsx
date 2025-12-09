'use client';
import { useRef, useState } from 'react';
import { copyToClipboard } from '@/lib/utils';
import { CopyIcon, CheckedIcon } from '@/components/Icon';

export default function CopyButton({ text }: { text?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(null);
  const handleCopy = () => {
    if (!text || copied) return;
    copyToClipboard(text).then(() => {
      setCopied(true);
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      className="inline-flex size-8 items-center justify-center rounded border-0 transition-colors outline-none hover:bg-black/30"
      onClick={handleCopy}>
      {copied ? (
        <CheckedIcon className="text-xl text-neutral-100" />
      ) : (
        <CopyIcon className="text-xl text-neutral-100" />
      )}
    </button>
  );
}
