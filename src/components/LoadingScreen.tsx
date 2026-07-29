import React, { useEffect, useState } from 'react';
import { Logo } from './Logo';

interface LoadingScreenProps {
  onFinish: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinish }) => {
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadingOut(true);
      const finishTimer = setTimeout(() => {
        onFinish();
      }, 500); // fade duration
      return () => clearTimeout(finishTimer);
    }, 1200); // display duration

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white transition-opacity duration-500 ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center space-y-6 transform animate-pulse-subtle">
        
        {/* Large Centered Brand Emblem */}
        <Logo variant="light" showSubtitle={true} className="scale-125 sm:scale-150" />

        {/* Minimal Progress Indicator */}
        <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 via-amber-400 to-blue-500 w-full animate-pulse" />
        </div>

        <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
          Independent Insurance Advisory • Bidar
        </span>

      </div>
    </div>
  );
};
