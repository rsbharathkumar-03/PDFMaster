import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Home, CornerUpLeft } from 'lucide-react';
import { ViewType } from '../types';

interface FloatingBackButtonProps {
  currentView: ViewType;
  historyLength: number;
  previousViewTitle?: string;
  onBack: () => void;
  onGoHome: () => void;
}

export const FloatingBackButton: React.FC<FloatingBackButtonProps> = ({
  currentView,
  historyLength,
  previousViewTitle,
  onBack,
  onGoHome,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isHome = currentView === 'home';

  // If on home with no history, we can hide the floating back button cleanly
  const shouldShow = !isHome || historyLength > 0;

  const getLabel = () => {
    if (isHome) return 'Previous Screen';
    if (historyLength > 0 && previousViewTitle) {
      return `Back to ${previousViewTitle}`;
    }
    if (historyLength > 0) {
      return 'Back';
    }
    return 'Back to Home';
  };

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          id="floating-back-navigation-container"
          initial={{ opacity: 0, x: -30, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -30, scale: 0.85 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="fixed left-3 sm:left-5 top-20 sm:top-24 z-40 select-none"
        >
          <div className="relative flex items-center group">
            <motion.button
              id="side-back-navigation-btn"
              onClick={onBack}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              whileHover={{ scale: 1.05, x: 2 }}
              whileTap={{ scale: 0.94 }}
              aria-label={getLabel()}
              title={getLabel()}
              className="flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/95 px-3 py-2.5 sm:px-3.5 sm:py-2.5 text-slate-700 shadow-lg shadow-slate-900/10 backdrop-blur-md transition-colors hover:border-indigo-500 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:ring-offset-2"
            >
              <ArrowLeft className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
              
              <span className="hidden sm:inline-block text-xs font-semibold tracking-tight transition-all duration-200 max-w-[120px] truncate">
                {isHome ? 'Previous' : historyLength > 0 ? 'Back' : 'Home'}
              </span>
            </motion.button>

            {/* Expanded Tooltip / Badge on Hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: 8, scale: 0.95 }}
                  animate={{ opacity: 1, x: 14, scale: 1 }}
                  exit={{ opacity: 0, x: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl border border-slate-700/80 bg-slate-900/95 px-3 py-1.5 text-[11px] font-medium text-white shadow-xl backdrop-blur-sm"
                >
                  <div className="flex items-center gap-1.5">
                    {historyLength > 0 ? (
                      <CornerUpLeft className="h-3.5 w-3.5 text-indigo-400" />
                    ) : (
                      <Home className="h-3.5 w-3.5 text-amber-400" />
                    )}
                    <span>{getLabel()}</span>
                  </div>
                  {/* Tooltip arrow */}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900/95" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
