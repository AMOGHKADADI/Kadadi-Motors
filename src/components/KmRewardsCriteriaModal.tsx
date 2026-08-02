import React, { useEffect } from 'react';
import {
  X,
  Award,
  Sparkles,
  FileCheck,
  Users,
  RefreshCw,
  ShieldCheck,
  CheckCircle2,
  Gift,
  HelpCircle,
  Zap,
  ArrowRight,
  Crown,
  Info
} from 'lucide-react';

interface KmRewardsCriteriaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChecklist?: () => void;
  onOpenReferral?: () => void;
}

export interface PointCriteriaItem {
  id: string;
  title: string;
  points: number;
  badge: string;
  category: 'Policy' | 'Verification' | 'Community' | 'Engagement';
  icon: React.ElementType;
  description: string;
  requirement: string;
  example: string;
}

export const POINT_CRITERIA_LIST: PointCriteriaItem[] = [
  {
    id: 'crit-01',
    title: 'New Policy Issuance / Annual Renewal',
    points: 500,
    badge: 'HIGHEST REWARD',
    category: 'Policy',
    icon: RefreshCw,
    description: 'Issued or renewed any vehicle (motor), commercial transport, health, or shop policy through Chandrakant Kadadi Desk in Bidar.',
    requirement: 'Active policy schedule issued with verified premium payment.',
    example: 'Renewing your Commercial Goods Vehicle or Private Car insurance before expiration date.'
  },
  {
    id: 'crit-02',
    title: 'Friend & Business Owner Referral',
    points: 150,
    badge: 'POPULAR',
    category: 'Community',
    icon: Users,
    description: 'Refer a friend, relative, or transport contractor in Bidar needing insurance advice or claim support.',
    requirement: 'Valid name and active mobile number submitted via referral form.',
    example: 'Referring a fellow truck owner or shopkeeper for business fire insurance.'
  },
  {
    id: 'crit-03',
    title: 'Document Verification & Checklist Upload',
    points: 100,
    badge: 'QUICK EARN',
    category: 'Verification',
    icon: FileCheck,
    description: 'Submit your complete set of required documents (RC Smart Card, Aadhaar, Previous Policy, PUC).',
    requirement: 'Upload legible document copies through the Document Checklist Hub.',
    example: 'Uploading scanned RC and Aadhaar for instant profile verification.'
  },
  {
    id: 'crit-04',
    title: 'Welcome Bonus & Account Registration',
    points: 150,
    badge: 'ONE-TIME',
    category: 'Engagement',
    icon: Sparkles,
    description: 'Instant bonus awarded upon creating your Customer Profile with Kadadi Motors Advisory.',
    requirement: 'Complete registration with mobile number and location details.',
    example: 'First-time registration on the Kadadi Motors digital portal.'
  },
  {
    id: 'crit-05',
    title: 'Annual Insurance Policy Health Audit',
    points: 75,
    badge: 'ANNUAL',
    category: 'Policy',
    icon: ShieldCheck,
    description: 'Complete a 2-minute policy health review to check IDV values, add-ons (Zero Dep, Engine Protect), and NCB continuity.',
    requirement: 'Reviewed and confirmed policy status with our Bidar desk.',
    example: 'Checking NCB entitlement (No Claim Bonus) prior to policy renewal.'
  }
];

export const TIER_BENEFITS = [
  {
    tier: 'Bronze Advocate',
    range: '0 – 249 Points',
    color: 'border-slate-600 bg-slate-900 text-slate-300',
    benefits: ['Basic Document Digital Storage', 'WhatsApp Expiration Reminders', 'Standard Claim Guidance']
  },
  {
    tier: 'Silver Executive',
    range: '250 – 499 Points',
    color: 'border-blue-500/50 bg-blue-950/40 text-blue-300',
    benefits: ['Priority Advisory Desk Access', '₹250 Discount Voucher Eligibility', 'Free Policy Health Audit']
  },
  {
    tier: 'Gold Partner',
    range: '500 – 799 Points',
    color: 'border-amber-500/50 bg-amber-950/40 text-amber-300',
    benefits: ['Dedicated 1-on-1 Claim Assistant', 'Free 20-Point Vehicle Pre-Monsoon Safety Check', 'Fast-track RTO Consultation']
  },
  {
    tier: 'Platinum Patron',
    range: '800+ Points',
    color: 'border-amber-400 bg-gradient-to-r from-amber-400/20 to-amber-300/10 text-amber-200',
    benefits: ['Zero-Fee Cashless Claim Support', 'Doorstep Document Collection in Bidar', 'Exclusive Partner Garage Discounts']
  }
];

export const KmRewardsCriteriaModal: React.FC<KmRewardsCriteriaModalProps> = ({
  isOpen,
  onClose,
  onOpenChecklist,
  onOpenReferral
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="km-rewards-criteria-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
    >
      <div className="relative w-full max-w-3xl bg-slate-900 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden my-8 text-white">
        
        {/* Top Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-400/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-black uppercase tracking-wider">
                  Program Guide
                </span>
                <h3 id="km-rewards-criteria-title" className="text-xl font-heading font-black text-white">
                  KM Rewards & Point Earning Criteria
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Transparent rules on how KM Points are calculated, verified, and upgraded across Bidar.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="Close KM Rewards Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-8 max-h-[75vh] overflow-y-auto">
          
          {/* Key Rule Banner */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-400/10 text-amber-400 shrink-0 mt-0.5">
              <Info className="w-5 h-5" />
            </div>
            <div className="text-xs space-y-1">
              <p className="font-extrabold text-amber-300">How Are KM Points Verified?</p>
              <p className="text-slate-300 leading-relaxed">
                All points are credited automatically when verified by <strong className="text-white">Chandrakant Kadadi Sir</strong>. Points do not expire and can be redeemed for RTO waivers, safety checks, and claim assistance.
              </p>
            </div>
          </div>

          {/* Point Earning Criteria Breakdown */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="text-base font-heading font-extrabold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Point Earning Criteria Breakdown</span>
              </h4>
              <span className="text-xs text-slate-400 font-mono">5 Verified Ways to Earn</span>
            </div>

            <div className="space-y-3">
              {POINT_CRITERIA_LIST.map((item) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-amber-500/40 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="text-sm font-extrabold text-white">{item.title}</h5>
                            <span className="px-2 py-0.5 rounded-md bg-amber-400/10 text-amber-300 border border-amber-400/20 text-[9px] font-black uppercase">
                              {item.badge}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium">Category: {item.category}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                        <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 font-black text-xs shadow-md">
                          +{item.points} KM Points
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>

                    <div className="grid sm:grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-900">
                      <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                        <span className="font-extrabold text-amber-400 block mb-0.5">Verification Criteria:</span>
                        <span className="text-slate-300">{item.requirement}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                        <span className="font-extrabold text-slate-400 block mb-0.5">Real Example:</span>
                        <span className="text-slate-300">{item.example}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tier Hierarchy & Benefits */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="text-base font-heading font-extrabold text-white flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-400" />
                <span>KM Points Tier Levels & Privileges</span>
              </h4>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {TIER_BENEFITS.map((t, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border space-y-2.5 ${t.color}`}
                >
                  <div className="flex items-center justify-between">
                    <h5 className="font-heading font-extrabold text-sm">{t.tier}</h5>
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-950/60 border border-current">
                      {t.range}
                    </span>
                  </div>

                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {t.benefits.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="p-5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            Need help accumulating points? Contact Chandrakant Kadadi Sir on WhatsApp.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {onOpenChecklist && (
              <button
                onClick={() => {
                  onClose();
                  onOpenChecklist();
                }}
                className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FileCheck className="w-4 h-4" />
                <span>Upload Documents (+100)</span>
              </button>
            )}

            {onOpenReferral && (
              <button
                onClick={() => {
                  onClose();
                  onOpenReferral();
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Users className="w-4 h-4 text-amber-400" />
                <span>Refer Friend (+150)</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold transition-all border border-slate-800 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
