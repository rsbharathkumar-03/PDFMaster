import React from 'react';
import { Loader2 } from 'lucide-react';

interface ProgressBarProps {
  progress: number;
  statusText?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  statusText = 'Processing your document...'
}) => {
  return (
    <div className="my-6 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-6 text-center shadow-sm">
      <div className="flex items-center justify-center gap-2.5 text-indigo-700 font-bold text-base mb-3">
        <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />
        <span>{statusText}</span>
      </div>

      {/* Bar container */}
      <div className="h-3 w-full overflow-hidden rounded-full bg-indigo-200/60">
        <div
          className="h-full bg-gradient-to-r from-indigo-600 to-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${Math.min(100, Math.max(5, progress))}%` }}
        />
      </div>

      <div className="mt-2 flex items-center justify-between text-xs font-semibold text-slate-500">
        <span>Processing in Secure Memory</span>
        <span>{Math.round(progress)}%</span>
      </div>
    </div>
  );
};
