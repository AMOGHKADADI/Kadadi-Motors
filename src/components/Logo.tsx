import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'light' | 'compact' | 'icon-only';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'default',
  showSubtitle = true
}) => {
  const isLight = variant === 'light';
  
  if (variant === 'icon-only') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <svg
          viewBox="0 0 100 100"
          className="w-10 h-10 drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Shield Path with gold & navy gradient fill */}
          <defs>
            <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0A2540" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </linearGradient>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
          
          {/* Golden Outer Protection Arc */}
          <path
            d="M50 8 L85 24 V50 C85 71.5 69.8 90.2 50 95 C30.2 90.2 15 71.5 15 50 V24 L50 8 Z"
            fill="url(#shieldGrad)"
            stroke="url(#goldGrad)"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          
          {/* Inner Accent Crest */}
          <path
            d="M50 18 L76 31 V49 C76 66.2 64 81.1 50 85 C36 81.1 24 66.2 24 49 V31 L50 18 Z"
            fill="#0F172A"
            opacity="0.4"
          />
          
          {/* Stylized Monogram K */}
          <path
            d="M38 32 V68 M38 50 L58 32 M38 50 L60 68"
            stroke="#FFFFFF"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M38 50 L58 32"
            stroke="url(#goldGrad)"
            strokeWidth="7"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Logo Icon */}
      <div className="relative shrink-0">
        <svg
          viewBox="0 0 100 100"
          className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-sm transition-transform duration-300 hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="shieldGradMain" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0F2C59" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </linearGradient>
            <linearGradient id="goldGradMain" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
          
          {/* Shield Outer Line */}
          <path
            d="M50 8 L85 24 V50 C85 71.5 69.8 90.2 50 95 C30.2 90.2 15 71.5 15 50 V24 L50 8 Z"
            fill="url(#shieldGradMain)"
            stroke="url(#goldGradMain)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          
          {/* K Lettermark */}
          <path
            d="M38 32 V68 M38 50 L58 32 M38 50 L60 68"
            stroke="#FFFFFF"
            strokeWidth="7.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M38 50 L58 32"
            stroke="url(#goldGradMain)"
            strokeWidth="7.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
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
              isLight ? 'text-amber-400' : 'text-blue-700'
            }`}
          >
            MOTORS
          </span>
        </div>
        
        {showSubtitle && (
          <span
            className={`text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase mt-0.5 ${
              isLight ? 'text-slate-300' : 'text-slate-500'
            }`}
          >
            Insurance Advisory • Est. 1999
          </span>
        )}
      </div>
    </div>
  );
};
