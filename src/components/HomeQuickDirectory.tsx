import React from 'react';
import {
  FileText,
  ShieldCheck,
  Trophy,
  User,
  Calculator,
  Lock,
  ArrowRight,
  Sparkles,
  Award,
  PhoneCall,
  Clock,
  CheckCircle2
} from 'lucide-react';

interface HomeQuickDirectoryProps {
  onNavigate: (sectionId: string) => void;
  onOpenQuoteModal: (category?: string) => void;
}

export const HomeQuickDirectory: React.FC<HomeQuickDirectoryProps> = ({
  onNavigate,
  onOpenQuoteModal
}) => {
  const pages = [
    {
      id: 'doc-checklist-hub',
      title: 'Required Documents Checklist',
      subtitle: 'Instant Document Check for Motor, Health & Commercial',
      desc: 'Avoid policy delays & claim rejections. Generate customized checklist documents for new policies or claim filings.',
      badge: 'GOATED TOOL',
      icon: <FileText className="w-6 h-6 text-amber-400" />,
      color: 'from-amber-500/20 to-amber-400/5',
      borderColor: 'border-amber-500/30'
    },
    {
      id: 'sector-details-view',
      title: 'Insurance Sectors Directory',
      subtitle: 'Private Motor, Transport, Health, Business & Life',
      desc: 'Compare multi-insurer terms, cashless hospital/garage networks in Bidar, and specialized policy terms.',
      badge: '5 SECTORS',
      icon: <ShieldCheck className="w-6 h-6 text-blue-400" />,
      color: 'from-blue-500/20 to-blue-400/5',
      borderColor: 'border-blue-500/30'
    },
    {
      id: 'km-points-leaderboard',
      title: 'KM Points & Loyalty Rewards',
      subtitle: 'Earn Points on Profile & Document Verification',
      desc: 'Community leaderboard & rewards program for verified clients of Chandrakant Kadadi (Kadadi Motors).',
      badge: 'REWARDS',
      icon: <Trophy className="w-6 h-6 text-amber-300" />,
      color: 'from-amber-400/20 to-amber-300/5',
      borderColor: 'border-amber-400/30'
    },
    {
      id: 'customer-portal',
      title: 'My Customer Profile Vault',
      subtitle: 'Track Policy Inquiries & Document Readiness',
      desc: 'Self-service dashboard to view verified documents, submit claim inquiries, and manage KM Points balance.',
      badge: 'CLIENT VAULT',
      icon: <User className="w-6 h-6 text-emerald-400" />,
      color: 'from-emerald-500/20 to-emerald-400/5',
      borderColor: 'border-emerald-500/30'
    },
    {
      id: 'claims-renewals',
      title: 'Premium Estimator & Claims Desk',
      subtitle: 'Instant Cost Estimator & Cashless Support',
      desc: 'Calculate estimated premiums for vehicle & health insurance, plus step-by-step claim filing guidance.',
      badge: 'CALCULATOR',
      icon: <Calculator className="w-6 h-6 text-purple-400" />,
      color: 'from-purple-500/20 to-purple-400/5',
      borderColor: 'border-purple-500/30'
    },
    {
      id: 'admin-portal-login',
      title: 'Executive Admin Control Center',
      subtitle: 'Direct Desk for Chandrakant Kadadi',
      desc: 'Live Firestore sync for inquiry verification, client document approval, and KM points allocation.',
      badge: 'ADMIN DESK',
      icon: <Lock className="w-6 h-6 text-rose-400" />,
      color: 'from-rose-500/20 to-rose-400/5',
      borderColor: 'border-rose-500/30'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-950 text-white relative border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-500/30 text-amber-300 text-xs font-black uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-amber-400" aria-hidden="true" />
            <span>Dedicated Service Portals</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
            Explore Dedicated Service Pages <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
              At Kadadi Motors Bidar
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Select any dedicated page below for specialized tools, document checklists, multi-sector policy comparisons, and client services.
          </p>
        </div>

        {/* Portals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((p) => (
            <div
              key={p.id}
              onClick={() => onNavigate(p.id)}
              className={`p-6 sm:p-7 rounded-3xl glass-card border ${p.borderColor} hover:border-amber-400 transition-all duration-300 cursor-pointer group flex flex-col justify-between shadow-xl hover:shadow-2xl hover:-translate-y-1`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
                    {p.icon}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-950/80 text-amber-300 border border-amber-500/30 text-[10px] font-black uppercase tracking-wider">
                    {p.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-heading font-black text-white group-hover:text-amber-300 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs font-bold text-amber-400/90 mt-1">{p.subtitle}</p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-extrabold text-amber-300 group-hover:text-amber-200">
                <span>Open Dedicated Page</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
