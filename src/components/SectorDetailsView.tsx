import React, { useState } from 'react';
import { INSURANCE_SOLUTIONS, BUSINESS_INFO } from '../data/insuranceData';
import {
  Car,
  Truck,
  HeartPulse,
  ShieldCheck,
  Building,
  CheckCircle2,
  FileText,
  MessageSquare,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Phone
} from 'lucide-react';

interface SectorDetailsViewProps {
  initialCategory?: string;
  onOpenChecklist: (category?: string) => void;
  onOpenQuoteModal: (category?: string) => void;
}

export const SectorDetailsView: React.FC<SectorDetailsViewProps> = ({
  initialCategory = 'motor',
  onOpenChecklist,
  onOpenQuoteModal
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialCategory);

  const sectors = [
    { id: 'motor', title: 'Private Vehicle (Car & Bike)', icon: <Car className="w-4 h-4" /> },
    { id: 'commercial', title: 'Commercial & Transport', icon: <Truck className="w-4 h-4" /> },
    { id: 'health', title: 'Health & Super Top-Up', icon: <HeartPulse className="w-4 h-4" /> },
    { id: 'business', title: 'Shopkeeper & Liability', icon: <Building className="w-4 h-4" /> },
    { id: 'life', title: 'Life & Term Protection', icon: <ShieldAlert className="w-4 h-4" /> }
  ];

  const currentSolutions = INSURANCE_SOLUTIONS.filter((sol) => sol.category === activeTab);

  return (
    <section id="sector-details-view" className="py-16 sm:py-24 bg-slate-950 text-white relative overflow-hidden border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-500/30 text-amber-300 text-xs font-extrabold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-amber-400" aria-hidden="true" />
            <span>Multi-Sector Insurance Directory</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
            Comprehensive Advisory Across <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
              Every Insurance Sector in Bidar
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Select an insurance domain below to view policy terms, cash-less hospital/garage networks, required checklists, and personal advice from Chandrakant Kadadi.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {sectors.map((s) => {
            const isSelected = activeTab === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20 scale-102'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
                }`}
              >
                {s.icon}
                <span>{s.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Sector Content Breakdown Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentSolutions.map((sol) => (
            <div
              key={sol.id}
              className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800/90 hover:border-amber-500/40 transition-all duration-300 space-y-5 flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 text-[11px] font-bold">
                  <span>{sol.category.toUpperCase()} SECTOR</span>
                </div>

                <h3 className="text-xl font-heading font-black text-white">{sol.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{sol.fullDescription}</p>

                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">Key Advisory Benefits:</span>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {sol.keyBenefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2">
                <button
                  onClick={() => onOpenChecklist(sol.category)}
                  className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-amber-300 font-bold text-xs border border-amber-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                  <span>Check Required Docs</span>
                </button>

                <button
                  onClick={() => onOpenQuoteModal(sol.category)}
                  className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-950" aria-hidden="true" />
                  <span>Request Advice & Quote</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
