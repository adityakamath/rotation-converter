import { useState } from 'react';
import { CheckIcon, CopyIcon } from '@radix-ui/react-icons';

interface CopyButtonProps {
  text: string;
  className?: string;
}

export default function CopyButton({ text, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center justify-center p-2 rounded-md 
        hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 
        focus:ring-blue-500 transition-colors ${className}`}
      title="Copy to clipboard"
      type="button"
    >
      {copied ? (
        <CheckIcon className="w-4 h-4 text-green-500" />
      ) : (
        <CopyIcon className="w-4 h-4 text-gray-500" />
      )}
    </button>
  );
} 