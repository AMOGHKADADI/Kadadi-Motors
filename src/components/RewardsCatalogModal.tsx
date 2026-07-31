import React, { useState } from 'react';
import {
  X,
  Trophy,
  Award,
  CheckCircle2,
  Gift,
  Zap,
  Sparkles,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { AppStore } from '../lib/store';

interface RewardsCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserPoints: number;
}

interface VoucherItem {
  id: string;
  title: string;
  pointsRequired: number;
  description: string;
  code: string;
  badge: string;
}

const REWARDS_VOUCHERS: VoucherItem[] = [
  {
    id: 'V-01',
    title: '₹250 Discount Voucher on RTO Vehicle Transfer Advisory',
    pointsRequired: 200,
    description: 'Instant discount waiver on RTO ownership transfer, re-registration & fitness advisory services.',
    code: 'KM-RTO-250',
    badge: 'POPULAR'
  },
  {
    id: 'V-02',
    title: 'Free 20-Point Vehicle Pre-Monsoon Safety Check Voucher',
    pointsRequired: 300,
    description: 'Complimentary battery, tire tread, brake fluid & wiper inspection at Kadadi Motors authorized garage Bidar.',
    code: 'KM-SAFETY-20',
    badge: 'GARAGE CHOICE'
  },
  {
    id: 'V-03',
    title: '₹500 Cashless Claim Fast-Track Processing Waiver',
    pointsRequired: 450,
    description: 'Zero advisory fee for dedicated 1-on-1 claim surveyor coordination and hospital cashless desk assistance.',
    code: 'KM-FAST-500',
    badge: 'EXECUTIVE'
  },
  {
    id: 'V-04',
    title: 'ISRI ISI Helmet Discount Coupon (₹300 Off)',
    pointsRequired: 500,
    description: 'Special discount voucher redeemable at partnered Bidar helmet & motor accessory outlets.',
    code: 'KM-HELMET-300',
    badge: 'SAFETY ESSENTIAL'
  }
];

export const RewardsCatalogModal: React.FC<RewardsCatalogModalProps> = ({
  isOpen,
  onClose,
  currentUserPoints
}) => {
  const [redeemedCode, setRedeemedCode] = useState<string | null>(null);
  const [activeVoucher, setActiveVoucher] = useState<VoucherItem | null>(null);

  if (!isOpen) return null;

  const handleRedeem = (voucher: VoucherItem) => {
    if (currentUserPoints < voucher.pointsRequired) {
      alert(`You need ${voucher.pointsRequired - currentUserPoints} more KM Points to redeem this reward.`);
      return;
    }

    const user = AppStore.getCurrentUser();
    if (user) {
      // Deduct points
      AppStore.awardKmPoints(user.phone, -voucher.pointsRequired, `Redeemed Voucher: ${voucher.title}`);
    }

    setActiveVoucher(voucher);
    setRedeemedCode(voucher.code);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden my-8 text-white">
        
        {/* Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-400/10 border border-amber-500/30 text-amber-400">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-heading font-black text-white">KM Points Redemption Store</h3>
              <p className="text-xs text-slate-400">Redeem your verified points for tangible savings & service waivers.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Balance Badge */}
        <div className="p-4 bg-amber-400/10 border-b border-amber-500/20 px-6 flex items-center justify-between text-xs">
          <span className="text-slate-300">Your Current KM Points Balance:</span>
          <span className="font-mono font-black text-amber-300 text-base">{currentUserPoints} KM Points</span>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          
          {redeemedCode && activeVoucher ? (
            <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <Gift className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-heading font-black text-white">Voucher Redeemed Successfully!</h4>
              <p className="text-xs text-emerald-200">{activeVoucher.title}</p>
              
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-lg font-black text-amber-300 tracking-wider">
                {redeemedCode}
              </div>

              <p className="text-[11px] text-slate-400">
                Show this voucher code to Chandrakant Kadadi Sir during your next policy issuance or claim visit in Bidar.
              </p>

              <button
                onClick={() => {
                  setRedeemedCode(null);
                  setActiveVoucher(null);
                }}
                className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
              >
                View More Rewards
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {REWARDS_VOUCHERS.map((v) => {
                const canAfford = currentUserPoints >= v.pointsRequired;
                return (
                  <div
                    key={v.id}
                    className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-500/30 text-[10px] font-black uppercase">
                          {v.badge}
                        </span>
                        <h4 className="text-sm font-extrabold text-white">{v.title}</h4>
                      </div>
                      <p className="text-xs text-slate-400">{v.description}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-0 border-slate-800 pt-2 sm:pt-0">
                      <span className="font-mono font-bold text-amber-400 text-xs">
                        {v.pointsRequired} Points
                      </span>

                      <button
                        onClick={() => handleRedeem(v)}
                        disabled={!canAfford}
                        className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                          canAfford
                            ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        {canAfford ? 'Redeem Voucher' : 'Need More Points'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
