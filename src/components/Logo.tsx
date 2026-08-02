import React from 'react';
import logoImg from '../assets/images/kadadi_motors_logo_1785494192983.jpg';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'light' | 'compact' | 'icon-only' | 'full-badge';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'default',
  showSubtitle = true
}) => {
  const isLight = variant === 'light' || variant === 'full-badge';
  
  if (variant === 'full-badge') {
    return (
      <div className={`flex flex-col items-center text-center p-4 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl ${className}`}>
        <img
          src={logoImg}
          alt="Kadadi Motors Official Logo Badge"
          className="w-24 sm:w-28 h-auto object-contain drop-shadow-md mb-2 rounded-xl"
          referrerPolicy="no-referrer"
        />
        <h2 className="font-heading font-black text-xl sm:text-2xl text-white tracking-wider">
          KADADI MOTORS
        </h2>
        <p className="text-[10px] sm:text-xs font-bold text-blue-400 tracking-widest uppercase mt-0.5">
          Trusted Today, Secure Tomorrow
        </p>
        <p className="text-[10px] text-slate-300 font-medium mt-1">
          CHANDRAKANT KADADI • BIDAR
        </p>
        <div className="flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-[10px] font-bold text-slate-200">
          <span>TRUST</span>
          <span className="text-blue-400">•</span>
          <span>SERVICE</span>
          <span className="text-blue-400">•</span>
          <span>COMMITMENT</span>
        </div>
      </div>
    );
  }

  if (variant === 'icon-only') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <img
          src={logoImg}
          alt="Kadadi Motors Emblem"
          className="w-10 h-10 object-contain rounded-lg drop-shadow-sm transition-transform duration-300 hover:scale-105"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Logo Image Emblem */}
      <div className="relative shrink-0">
        <img
          src={logoImg}
          alt="Kadadi Motors Emblem"
          className="w-10 h-10 sm:w-11 sm:h-11 object-contain rounded-xl border border-slate-800"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Typography */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-heading font-extrabold text-lg sm:text-xl tracking-tight leading-none ${
              isLight ? 'text-white' : 'text-slate-900'
            }`}
          >
            KADADI
          </span>
          <span
            className={`font-heading font-bold text-lg sm:text-xl tracking-tight leading-none ${
              isLight ? 'text-blue-400' : 'text-blue-600'
            }`}
          >
            MOTORS
          </span>
        </div>
        
        {showSubtitle && (
          <span
            className={`text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase mt-0.5 ${
              isLight ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Insurance Advisory • Est. 1999
          </span>
        )}
      </div>
    </div>
  );
};

