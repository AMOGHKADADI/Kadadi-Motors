import React from 'react';
import { PARTNER_INSURERS } from '../data/insuranceData';
import { Shield, CheckCircle2, ExternalLink, Sparkles, TrendingUp, Award, Building2, Zap, Scale } from 'lucide-react';

export const PartnersSection: React.FC = () => {
  return (
    <section id="partners" className="py-20 sm:py-32 bg-black text-white relative overflow-hidden border-b border-white/10">
      
      {/* Background Ambient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Module Header */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-blue-400 bg-blue-950/60 border border-blue-500/30 backdrop-blur-xl shadow-lg">
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Multi-Insurer Network • Bidar Desk</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black text-white tracking-tight leading-none">
            Trusted Insurer Partnerships
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
            Kadadi Motors maintains 100% advisory independence. We compare live rates across public sector leaders and top private insurers to deliver maximum claim reliability for Bidar policyholders.
          </p>
        </div>

        {/* Partner Cards Balanced Grid Layout */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {PARTNER_INSURERS.map((partner, index) => {
            const isBlueTheme = index % 2 === 0;
            return (
              <div
                key={partner.id}
                className={`group relative bg-white/5 backdrop-blur-2xl rounded-3xl p-7 border transition-all duration-300 flex flex-col justify-between space-y-6 shadow-2xl hover:-translate-y-2 overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] ${
                  isBlueTheme
                    ? 'border-white/10 hover:border-blue-500/60 hover:shadow-blue-500/15'
                    : 'border-white/10 hover:border-red-500/60 hover:shadow-red-500/15'
                }`}
              >
                {/* Subtle Card Glow Effect */}
                <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-2xl transition-opacity duration-300 opacity-20 group-hover:opacity-60 ${
                  isBlueTheme ? 'bg-blue-600' : 'bg-red-600'
                }`} />

                <div className="space-y-5 relative z-10">
                  
                  {/* Category & Badge Row */}
                  <div className="flex items-center justify-between">
                    <div className="px-3.5 py-1.5 rounded-xl text-xs font-heading font-black tracking-wider bg-white/10 text-white border border-white/20 backdrop-blur-md shadow-sm">
                      {partner.shortName}
                    </div>

                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-xs ${
                      isBlueTheme
                        ? 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                        : 'bg-red-500/15 text-red-300 border-red-500/30'
                    }`}>
                      {partner.category}
                    </span>
                  </div>

                  {/* Insurer Name & Sub-badge */}
                  <div>
                    <h3 className="text-xl font-heading font-black text-white group-hover:text-blue-300 transition-colors leading-snug">
                      {partner.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mt-1">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Verified Settlement Record</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {partner.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2.5 pt-3 border-t border-white/10">
                    {partner.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-[11px] text-slate-200 font-medium">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 ${
                          idx === 0 ? (isBlueTheme ? 'text-blue-400' : 'text-red-400') : 'text-emerald-400'
                        }`} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono relative z-10">
                  <span className="text-slate-400">100% Unbiased</span>
                  <span className="text-blue-400 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    <span>Compare Live</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>

              </div>
            );
          })}
        </div>

        {/* Independence & Trust Guarantee Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-950/40 via-black to-red-950/40 backdrop-blur-2xl border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] p-8 sm:p-10 shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 items-center text-center md:text-left">
            
            <div className="flex flex-col sm:flex-row items-center gap-4 md:col-span-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600/30 to-red-600/30 border border-white/20 flex items-center justify-center text-white shrink-0 shadow-xl">
                <Shield className="w-7 h-7 text-blue-400" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-heading font-black text-white">
                  100% Independent Policy Advisory Guarantee
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Kadadi Motors acts exclusively on behalf of the policyholder. We evaluate policies strictly on settlement speed, cashless garage density, and room rent capping terms without hidden commissions.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-white/10 md:pl-8">
              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono font-bold text-slate-200 flex items-center gap-2">
                <Scale className="w-4 h-4 text-blue-400" />
                <span>Zero Direct Markup</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono font-bold text-slate-200 flex items-center gap-2">
                <Zap className="w-4 h-4 text-red-400" />
                <span>Instant Cashless Desk</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

