import React, { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';
import { BUSINESS_INFO } from '../data/insuranceData';

interface ShareButtonProps {
  variant?: 'light' | 'dark' | 'outline';
  className?: string;
  label?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  variant = 'outline',
  className = '',
  label = 'Share Contact Details'
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: `${BUSINESS_INFO.name} - ${BUSINESS_INFO.tagline}`,
      text: `Kadadi Motors - Independent Insurance Advisory in Bidar.\nFounder: ${BUSINESS_INFO.founder}\nPhone: ${BUSINESS_INFO.phoneDisplay}\nAddress: ${BUSINESS_INFO.address}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err: any) {
        // User cancelled or share failed, fallback to copy if not explicitly aborted by user
        if (err.name === 'AbortError') return;
      }
    }

    // Fallback: Copy contact details to clipboard
    try {
      const textToCopy = `${shareData.title}\n${shareData.text}\nMap & Website: ${shareData.url}`;
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Ignore copy error
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'dark':
        return 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700';
      case 'light':
        return 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200/90 shadow-xs';
      case 'outline':
      default:
        return 'bg-slate-100/80 hover:bg-slate-200/80 text-slate-700 border border-slate-200';
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${getVariantStyles()} ${className}`}
      title="Share Kadadi Motors contact information"
      type="button"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-emerald-600 font-bold">Copied to Clipboard!</span>
        </>
      ) : (
        <>
          <Share2 className="w-3.5 h-3.5 text-slate-500" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
