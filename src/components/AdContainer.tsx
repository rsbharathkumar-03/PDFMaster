import React, { useEffect } from 'react';

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

interface AdSenseWindow extends Window {
  adsbygoogle?: unknown[];
}

const ADSENSE_CLIENT = 'ca-pub-5519529513265514';

export const AdContainer: React.FC<AdContainerProps> = ({
  slot,
  slotId,
  format = 'responsive',
  className = ''
}) => {
  /*
   * IMPORTANT:
   * Replace these placeholder values with the actual ad slot IDs
   * created inside your Google AdSense account.
   */
  const adSlots: Record<string, string> = {
    'header-banner': 'YOUR_HEADER_AD_SLOT_ID',
    'between-sections': 'YOUR_BETWEEN_SECTIONS_AD_SLOT_ID',
    'sidebar': 'YOUR_SIDEBAR_AD_SLOT_ID',
    'below-result': 'YOUR_BELOW_RESULT_AD_SLOT_ID',
    'footer-banner': 'YOUR_FOOTER_AD_SLOT_ID'
  };

  const activeKey =
    slot || (format === 'vertical' ? 'sidebar' : 'header-banner');

  const adSlot =
    slotId ||
    (slot && adSlots[slot]) ||
    adSlots[activeKey] ||
    '';

  useEffect(() => {
    if (!adSlot || adSlot.startsWith('YOUR_')) {
      return;
    }

    try {
      const adsWindow = window as AdSenseWindow;

      (adsWindow.adsbygoogle = adsWindow.adsbygoogle || []).push({});
    } catch (error) {
      console.error('Google AdSense error:', error);
    }
  }, [adSlot]);

  const containerId = `ad-container-${String(
    slotId || slot || 'default'
  ).replace(/[^a-zA-Z0-9-_]/g, '-')}`;

  if (!adSlot || adSlot.startsWith('YOUR_')) {
    return null;
  }

  return (
    <div
      id={containerId}
      className={`my-4 flex w-full items-center justify-center overflow-hidden ${className}`}
      aria-label="Advertisement"
    >
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%'
        }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};
