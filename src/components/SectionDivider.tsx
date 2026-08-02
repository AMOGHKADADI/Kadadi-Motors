import React from 'react';
import { Shield, Sparkles, Award, Star } from 'lucide-react';

interface SectionDividerProps {
  variant?: 'amber' | 'slate' | 'emerald' | 'gradient';
  icon?: 'shield' | 'sparkles' | 'award' | 'star';
  label?: string;
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = 'amber',
  icon = 'shield',
  label = 'Kadadi Motors Advisory Standard',
  className = ''
}) => {
  const renderIcon = () => {
    switch (icon) {
      case 'sparkles':
        return <Shield className="w-4 h-4 text-amber-400" aria-hidden="true" />;
      case 'award':
        return <Award className="w-4 h-4 text-emerald-400" aria-hidden="true" />;
      case 'star':
        return <Star className="w-4 h-4 text-amber-300" aria-hidden="true" />;
      default:
        return <Shield className="w-4 h-4 text-amber-400" aria-hidden="true" />;
    }
  };

  return (
    <div className={`relative py-8 sm:py-12 bg-slate-950 overflow-hidden ${className}`}>
      {/* Decorative ambient background line */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div className="w-full max-w-7xl border-t border-slate-800/80" />
      </div>

      {/* Center Badge Pill */}
      <div className="relative flex justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 font-extrabold shadow-xl backdrop-blur-md">
          {renderIcon()}
          <span className="tracking-wider uppercase text-[10px] font-black text-slate-300">{label}</span>
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        </div>
      </div>
    </div>
  );
};
