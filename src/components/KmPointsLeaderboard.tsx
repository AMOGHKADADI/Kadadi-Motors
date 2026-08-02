import React, { useState, useEffect } from 'react';
import { AppStore, KMLeaderboardUser, CustomerProfile } from '../lib/store';
import { RewardsCatalogModal } from './RewardsCatalogModal';
import { KmRewardsCriteriaModal } from './KmRewardsCriteriaModal';
import {
  Award,
  Trophy,
  Crown,
  Sparkles,
  CheckCircle2,
  Gift,
  ShieldCheck,
  UserCheck,
  Users,
  ArrowRight,
  Star,
  ChevronRight,
  HelpCircle,
  Zap
} from 'lucide-react';

interface KmPointsLeaderboardProps {
  onOpenChecklist: () => void;
  onOpenProfile: () => void;
}

export const KmPointsLeaderboard: React.FC<KmPointsLeaderboardProps> = ({
  onOpenChecklist,
  onOpenProfile
}) => {
  const [currentUser, setCurrentUser] = useState<CustomerProfile | null>(AppStore.getCurrentUser());
  const [leaderboard, setLeaderboard] = useState<KMLeaderboardUser[]>(AppStore.getLeaderboard());

  // Referral & Rewards Modal State
  const [showReferralForm, setShowReferralForm] = useState(false);
  const [showRewardsModal, setShowRewardsModal] = useState(false);
  const [showCriteriaModal, setShowCriteriaModal] = useState(false);
  const [refName, setRefName] = useState('');
  const [refPhone, setRefPhone] = useState('');
  const [refSuccess, setRefSuccess] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setCurrentUser(AppStore.getCurrentUser());
      setLeaderboard(AppStore.getLeaderboard());
    };
    window.addEventListener('km_store_updated', handleUpdate);
    return () => window.removeEventListener('km_store_updated', handleUpdate);
  }, []);

  const handleReferralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refName || !refPhone) return;

    if (currentUser) {
      AppStore.awardKmPoints(currentUser.phone, 150, `Referral Submitted: ${refName}`);
    }
    setRefSuccess(true);
    setTimeout(() => {
      setShowReferralForm(false);
      setRefSuccess(false);
      setRefName('');
      setRefPhone('');
    }, 2000);
  };

  const getTierBadge = (points: number) => {
    if (points >= 800) return { title: 'Platinum Patron', color: 'from-slate-200 to-amber-200 text-slate-950 border-amber-300' };
    if (points >= 500) return { title: 'Gold Partner', color: 'from-amber-400 to-amber-500 text-slate-950 border-amber-300' };
    if (points >= 250) return { title: 'Silver Executive', color: 'from-blue-400 to-blue-600 text-white border-blue-300' };
    return { title: 'Bronze Advocate', color: 'from-slate-700 to-slate-800 text-slate-200 border-slate-600' };
  };

  return (
    <section id="km-points-leaderboard" className="py-16 sm:py-24 bg-slate-950 text-white relative overflow-hidden border-b border-slate-800">
      
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-500/30 text-amber-300 text-xs font-extrabold uppercase tracking-widest">
            <Trophy className="w-4 h-4 text-amber-400" aria-hidden="true" />
            <span>Kadadi Motors KM Points & Community Program</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
            Earn KM Points With <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
              Verified Insurance Milestones
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            KM Points are awarded for genuine policy verification, document submission, and friend referrals in Bidar. Redeem points for priority advisory, free vehicle fitness audits, and policy health reviews.
          </p>
        </div>

        {/* Top Wallet Banner for Logged-In / Guest User */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel amber-glow border border-amber-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-heading font-black text-2xl shadow-lg shrink-0">
              <Crown className="w-8 h-8 text-slate-950" aria-hidden="true" />
            </div>

            <div className="space-y-1 text-center md:text-left">
              <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Your Account Wallet</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border bg-gradient-to-r ${getTierBadge(currentUser?.kmPoints || 150).color}`}>
                  {getTierBadge(currentUser?.kmPoints || 150).title}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-black text-amber-400">
                {currentUser ? `${currentUser.kmPoints} KM Points` : '150 KM Welcome Bonus'}
              </h3>
              <p className="text-xs text-slate-300">
                {currentUser ? `Registered User: ${currentUser.fullName} (${currentUser.phone})` : 'Guest Visitor • Submit your first document checklist to claim points'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setShowCriteriaModal(true)}
              className="px-4 py-3 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 font-extrabold text-xs border border-amber-500/30 transition-all flex items-center gap-2 focus:outline-none cursor-pointer"
              title="View full breakdown of point earning criteria & tier rules"
            >
              <Award className="w-4 h-4 text-amber-400" aria-hidden="true" />
              <span>Earning Rules</span>
            </button>

            <button
              onClick={() => setShowRewardsModal(true)}
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg transition-all flex items-center gap-2 focus:outline-none cursor-pointer"
            >
              <Gift className="w-4 h-4 text-slate-950" aria-hidden="true" />
              <span>Redeem Points Store</span>
            </button>

            <button
              onClick={onOpenChecklist}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-extrabold text-xs shadow-lg transition-all flex items-center gap-2 focus:outline-none cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-slate-950" aria-hidden="true" />
              <span>Upload Docs (+100 Points)</span>
            </button>

            <button
              onClick={() => setShowReferralForm(true)}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all flex items-center gap-2 focus:outline-none cursor-pointer"
            >
              <Users className="w-4 h-4 text-amber-400" aria-hidden="true" />
              <span>Refer Friend (+150 Points)</span>
            </button>
          </div>
        </div>

        {/* 3 Criteria Explanation Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>How To Earn KM Points</span>
            </h3>
            <button
              onClick={() => setShowCriteriaModal(true)}
              className="text-xs font-bold text-amber-300 hover:text-amber-200 underline flex items-center gap-1 cursor-pointer"
            >
              <span>View Full Point Earning Criteria Modal</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div
              onClick={() => setShowCriteriaModal(true)}
              className="p-6 rounded-3xl glass-card space-y-3 cursor-pointer hover:border-amber-400/50 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                  1
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
              </div>
              <h4 className="font-heading font-extrabold text-lg text-white">Document Checklist Submission</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Verify and assemble your required documents using our interactive tool and send to Chandrakant Kadadi Sir.
              </p>
              <span className="inline-block text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
                Earn +100 KM Points
              </span>
            </div>

            <div
              onClick={() => setShowCriteriaModal(true)}
              className="p-6 rounded-3xl glass-card space-y-3 cursor-pointer hover:border-emerald-400/50 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  2
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </div>
              <h4 className="font-heading font-extrabold text-lg text-white">Verified Family / Friend Referral</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Refer a friend or transport contractor in Bidar who needs policy advice or claim assistance.
              </p>
              <span className="inline-block text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-md border border-emerald-400/20">
                Earn +150 KM Points
              </span>
            </div>

            <div
              onClick={() => setShowCriteriaModal(true)}
              className="p-6 rounded-3xl glass-card space-y-3 cursor-pointer hover:border-amber-400/50 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  3
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
              </div>
              <h4 className="font-heading font-extrabold text-lg text-white">Policy Issuance / Claim Approval</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                When Chandrakant Kadadi approves your active inquiry or issues your final policy in the system.
              </p>
              <span className="inline-block text-xs font-bold text-amber-300 bg-amber-400/20 px-2.5 py-1 rounded-md border border-amber-400/30">
                Earn +500 KM Points
              </span>
            </div>
          </div>
        </div>

        {/* Live Leaderboard Table & Community Advocates */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Trophy className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Bidar Community Hall of Fame</span>
              </div>
              <h3 className="text-2xl font-heading font-black text-white">
                KM Points Community Leaderboard
              </h3>
            </div>

            <button
              onClick={onOpenProfile}
              className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>Manage Your Profile</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Rank</th>
                  <th className="py-3 px-4">Community Member</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Tier Badge</th>
                  <th className="py-3 px-4 text-right">Policies Issued</th>
                  <th className="py-3 px-4 text-right">KM Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {leaderboard.map((user, idx) => (
                  <tr key={user.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-black text-sm">
                      {idx === 0 ? (
                        <span className="text-amber-400 font-extrabold flex items-center gap-1">🥇 1st</span>
                      ) : idx === 1 ? (
                        <span className="text-slate-300 font-bold flex items-center gap-1">🥈 2nd</span>
                      ) : idx === 2 ? (
                        <span className="text-amber-600 font-bold flex items-center gap-1">🥉 3rd</span>
                      ) : (
                        <span className="text-slate-500">#{idx + 1}</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-white">
                      <div className="flex items-center gap-2">
                        <span>{user.name}</span>
                        <span className="text-[10px] text-slate-500 font-normal">{user.phoneMasked}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-300">{user.location}</td>

                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-bold text-amber-300">
                        {user.tier}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right font-semibold text-slate-300">
                      {user.policiesIssued} Issued
                    </td>

                    <td className="py-3.5 px-4 text-right font-black text-amber-400 text-sm">
                      {user.points} pts
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Referral Modal */}
      {showReferralForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 text-white">
            <h3 className="text-xl font-heading font-black text-amber-400">Refer a Friend & Earn 150 Points</h3>
            <p className="text-xs text-slate-300">
              Enter details of a friend or business owner in Bidar who needs insurance advice.
            </p>

            {refSuccess ? (
              <div className="p-4 bg-emerald-950 border border-emerald-500 rounded-2xl text-center text-xs text-emerald-200">
                ✅ Referral recorded successfully! +150 KM Points awarded.
              </div>
            ) : (
              <form onSubmit={handleReferralSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Friend's Name *</label>
                  <input
                    type="text"
                    required
                    value={refName}
                    onChange={(e) => setRefName(e.target.value)}
                    placeholder="e.g., Mahesh Patil"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Friend's Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={refPhone}
                    onChange={(e) => setRefPhone(e.target.value)}
                    placeholder="e.g., 98451 XXXXX"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReferralForm(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs"
                  >
                    Submit Referral
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Rewards Store Catalog Modal */}
      <RewardsCatalogModal
        isOpen={showRewardsModal}
        onClose={() => setShowRewardsModal(false)}
        currentUserPoints={currentUser?.kmPoints || 150}
      />

      {/* KM Rewards Point Earning Criteria & Tier Rules Modal */}
      <KmRewardsCriteriaModal
        isOpen={showCriteriaModal}
        onClose={() => setShowCriteriaModal(false)}
        onOpenChecklist={onOpenChecklist}
        onOpenReferral={() => setShowReferralForm(true)}
      />

    </section>
  );
};
