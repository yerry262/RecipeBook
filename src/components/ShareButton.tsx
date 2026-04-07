'use client';

import { useState } from 'react';
import { Share2, Check, Link as LinkIcon } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  url?: string;
}

export default function ShareButton({ title, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = url ?? window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, url: shareUrl });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
    >
      {copied ? (
        <>
          <Check size={18} className="text-green-500" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Share2 size={18} />
          <span>Share</span>
        </>
      )}
    </button>
  );
}
