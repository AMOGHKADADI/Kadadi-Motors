import React from 'react';
import { motion } from 'motion/react';
import { Crown, Sparkles, Award, Zap, ShieldCheck, ChevronRight, Gift, PlusCircle } from 'lucide-react';

interface KmProgressRingProps {
  points: number;
  tier?: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
  onOpenRewards?: () => void;
  onOpenChecklist?: () => void;
}

interface TierInfo {
  name: string;
  minPoints: number;
  nextTierName: string | null;
  nextTierPoints: number;
  badgeColor: string;
  ringColor: string;
  glowColor: string;
  perks: string[];
}

export const getTierDetails = (points: number): TierInfo => {
  if (points >= 1000) {
    return {
      name: 'Platinum Patron',
      minPoints: 1000,
      nextTierName: null,
      nextTierPoints: 1000,
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      ringColor: '#a855f7', // purple-500
      glowColor: 'shadow-[0_0_25px_rgba(168,85,247,0.35)]',
      perks: ['VIP Claims Processing', 'Personal Director Support', 'Exclusive Gift Vouchers', 'Free Annual Health Checkup Coupon'],
    };
  } else if (points >= 500) {
    return {
      name: 'Gold Partner',
      minPoints: 500,
      nextTierName: 'Platinum Patron',
      nextTierPoints: 1000,
      badgeColor: 'bg-amber-400/20 text-amber-300 border-amber-500/40',
      ringColor: '#f59e0b', // amber-500
      glowColor: 'shadow-[0_0_25px_rgba(245,158,11,0.35)]',
      perks: ['Priority RTO Renewal Handling', '1.5x Referral Bonus', 'Dedicated Desk Advisor'],
    };
  } else if (points >= 200) {
    return {
      name: 'Silver Executive',
      minPoints: 200,
      nextTierName: 'Gold Partner',
      nextTierPoints: 500,
      badgeColor: 'bg-slate-300/20 text-slate-200 border-slate-400/40',
      ringColor: '#38bdf8', // sky-400
      glowColor: 'shadow-[0_0_25px_rgba(56,189,248,0.3)]',
      perks: ['Fast-track Document Verification', 'Annual Policy Health Check', '100 Bonus Pts on Renewal'],
    };
  } else {
    return {
      name: 'Bronze Advocate',
      minPoints: 0,
      nextTierName: 'Silver Executive',
      nextTierPoints: 200,
      badgeColor: 'bg-amber-700/20 text-amber-400 border-amber-600/40',
      ringColor: '#d97706', // amber-600
      glowColor: 'shadow-[0_0_25px_rgba(217,119,6,0.25)]',
      perks: ['Free Policy Audit', 'Instant Quote Advice', '100 Pts per Uploaded Document'],
    };
  }
};

export const KmProgressRing: React.FC<KmProgressRingProps> = ({
  points,
  size = 180,
  strokeWidth = 14,
  className = '',
  onOpenRewards,
  onOpenChecklist,
}) => {
  const tierInfo = getTierDetails(points);

  // SVG dimensions
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;

  // Calculate percentage within current tier
  let percentage = 100;
  let pointsNeeded = 0;

  if (tierInfo.nextTierName) {
    const range = tierInfo.nextTierPoints - tierInfo.minPoints;
    const progressInTier = points - tierInfo.minPoints;
    percentage = Math.min(Math.max((progressInTier / range) * 100, 0), 100);
    pointsNeeded = tierInfo.nextTierPoints - points;
  }

  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`glass-card p-6 rounded-3xl border border-slate-800 space-y-6 ${className}`}>
      
      {/* Top Title & Tier Badge */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-1.5 text-amber-400 text-[11px] font-black uppercase tracking-wider">
            <Crown className="w-3.5 h-3.5" aria-hidden="true" />
            <span>KM Points Wallet & Loyalty Tier</span>
          </div>
          <h4 className="text-base font-heading font-black text-white mt-0.5">
            Status & Progress Center
          </h4>
        </div>

        <span className={`px-3 py-1.5 rounded-full text-xs font-black border ${tierInfo.badgeColor} flex items-center gap-1.5 shadow-sm`}>
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{tierInfo.name}</span>
        </span>
      </div>

      {/* Main Ring & Stat Display */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 py-2">
        
        {/* Animated Progress Ring SVG */}
        <div className="relative flex items-center justify-center shrink-0">
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background Circle Track */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke="#1e293b"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            
            {/* Animated Active Circle Track */}
            <motion.circle
              cx={center}
              cy={center}
              r={radius}
              stroke={tierInfo.ringColor}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Center Text Display inside the ring */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="space-y-0.5"
            >
              <div className="text-3xl font-heading font-black text-amber-400 tracking-tight">
                {points}
              </div>
              <div className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                KM Points
              </div>
              <div className="inline-block mt-1 px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-bold text-amber-300">
                {Math.round(percentage)}% Tier Progress
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tier Details & Next Tier Proximity */}
        <div className="space-y-4 flex-1 text-center sm:text-left">
          {tierInfo.nextTierName ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-bold">Proximity to Next Tier:</span>
                <span className="font-black text-amber-400">{tierInfo.nextTierName}</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 rounded-full bg-slate-900 border border-slate-800 overflow-hidden p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300"
                />
              </div>

              <p className="text-xs text-slate-300 flex items-center justify-center sm:justify-start gap-1.5 pt-1">
                <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
                <span>
                  Earn <strong className="text-amber-300 font-extrabold">{pointsNeeded} more points</strong> to unlock <strong className="text-white font-extrabold">{tierInfo.nextTierName}</strong> status!
                </span>
              </p>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-200 text-xs space-y-1">
              <div className="font-black text-purple-300 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-purple-400" />
                <span>Maximum Tier Achieved!</span>
              </div>
              <p className="text-[11px] text-slate-300">
                You are at our highest patron level! Enjoy maximum referral rewards, zero-wait claim priority, and VIP advisory privileges.
              </p>
            </div>
          )}

          {/* Active Tier Perks */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider block">
              Unlocked Tier Privileges:
            </span>
            <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
              {tierInfo.perks.map((perk, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-medium">
                  <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" aria-hidden="true" />
                  <span>{perk}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2 justify-center sm:justify-start">
            {onOpenRewards && (
              <button
                onClick={onOpenRewards}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all flex items-center gap-1.5 shadow-md"
              >
                <Gift className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Redeem Store</span>
              </button>
            )}

            {onOpenChecklist && (
              <button
                onClick={onOpenChecklist}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all flex items-center gap-1.5 shadow-md"
              >
                <PlusCircle className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Earn +100 Points</span>
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
