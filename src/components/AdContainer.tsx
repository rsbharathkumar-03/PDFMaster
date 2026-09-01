import React from 'react';

export type AdSlotType =
  | 'header-banner'
  | 'between-sections'
  | 'sidebar'
  | 'below-result'
  | 'footer-banner';

interface AdContainerProps {
  slot?: AdSlotType | string;
  slotId?: string;
  format?: 'horizontal' | 'rectangle' | 'vertical' | 'responsive';
  className?: string;
}

export const AdContainer: React.FC<AdContainerProps> = ({
  slot,
  slotId,
  format = 'horizontal',
  className = ''
}) => {
  const slotLabels: Record<string, { name: string; dim: string }> = {
    'header-banner': { name: 'Top Leaderboard Ad', dim: '728 × 90' },
    'between-sections': { name: 'Responsive In-Feed Ad', dim: '970 × 120' },
    'sidebar': { name: 'Vertical Skyscraper Ad', dim: '300 × 600' },
    'below-result': { name: 'Download Area Sponsored Slot', dim: '728 × 90' },
    'footer-banner': { name: 'Bottom Anchor Ad', dim: '728 × 90' },
  };

  const activeKey = slot || (format === 'vertical' ? 'sidebar' : 'header-banner');
  const info = slotLabels[activeKey] || {
    name: slotId ? `Sponsored Ad (${slotId})` : 'Responsive Ad Unit',
    dim: format === 'vertical' ? '300 × 600' : format === 'rectangle' ? '300 × 250' : '728 × 90'
  };

  const containerId = `ad-container-${slotId || slot || 'default'}`;

  return (
    <div
      id={containerId}
      className={`my-4 flex flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-100/60 p-3 text-center transition-all hover:border-slate-400 ${className}`}
    >
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        <span>Advertisement</span>
        <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[10px] text-slate-600">AdSense Ready</span>
      </div>
      <div className="mt-1 flex items-center justify-center gap-1.5 text-xs text-slate-500">
        <span className="font-medium">{info.name}</span>
        <span className="text-slate-400">({info.dim})</span>
      </div>
      {/* Container where actual Google AdSense <ins> script can be injected */}
      <div className="ad-unit-slot hidden w-full" data-ad-slot={slot || slotId}></div>
    </div>
  );
};

