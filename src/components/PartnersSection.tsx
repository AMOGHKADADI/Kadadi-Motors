import React from 'react';
import { PARTNER_INSURERS } from '../data/insuranceData';
import { Shield, Building2, CheckCircle, ExternalLink } from 'lucide-react';

export const PartnersSection: React.FC = () => {
  return (
    <section id="partners" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-blue-800 bg-blue-100/80 border border-blue-200 uppercase tracking-wider">
            Our Insurance Partners
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            Partnering With India's Most Trusted Insurance Institutions
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Kadadi Motors maintains strict independence. We compare policies across leading public sector giants and top-tier private insurers to secure the best policy match for you.
          </p>
        </div>

        {/* Partner Cards Grid */}
        <div className="mt-12 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PARTNER_INSURERS.map((partner) => (
            <div
              key={partner.id}
              className="group bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-blue-400 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                
                {/* Logo Badge Header */}
                <div className="flex items-center justify-between">
                  <div
                    className={`px-3 py-2 rounded-xl text-xs font-heading font-extrabold tracking-wider ${partner.logoBg} ${partner.textColor} shadow-xs border border-slate-700/50 group-hover:scale-105 transition-transform duration-300`}
                  >
                    {partner.shortName}
                  </div>

                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200">
                    Partner Insurer
                  </span>
                </div>

                {/* Name & Category */}
                <div>
                  <h3 className="text-base font-heading font-bold text-slate-900 group-hover:text-blue-800 transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-xs text-blue-700 font-medium mt-0.5">
                    {partner.category}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {partner.description}
                </p>

                {/* Highlights */}
                <div className="space-y-1.5 pt-2">
                  {partner.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Equal Choice Guarantee</span>
                <span className="text-blue-600 font-semibold group-hover:translate-x-1 transition-transform inline-block">
                  Compared →
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* Independence Disclaimer Note */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-xs text-slate-600">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-800 shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <p className="leading-relaxed text-center sm:text-left">
            <strong className="text-slate-900">Independence Assurance:</strong> Kadadi Motors represents policyholders as an independent advisor. We do not charge hidden fees or give artificial preference to any single insurance company. All policy decisions remain 100% under your informed choice.
          </p>
        </div>

      </div>
    </section>
  );
};
