import React from 'react';
import { ADVISORY_STEPS } from '../data/insuranceData';
import { SearchCheck, GitCompare, ShieldCheck, LifeBuoy, ArrowRight, Check } from 'lucide-react';

interface AdvisoryProcessProps {
  onOpenQuoteModal: () => void;
}

const iconComponents: Record<string, React.ElementType> = {
  SearchCheck,
  GitCompare,
  ShieldCheck,
  LifeBuoy
};

export const AdvisoryProcess: React.FC<AdvisoryProcessProps> = ({ onOpenQuoteModal }) => {
  return (
    <section id="process" className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-blue-800 bg-blue-50 border border-blue-100 uppercase tracking-wider">
            The Kadadi Advisory Standard
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            How We Guide You to the Right Protection in 4 Refined Stages
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            We cut through fine print and aggressive marketing pitches to deliver absolute clarity, transparent options, and lifelong claim support.
          </p>
        </div>

        {/* 4 Stage Timeline */}
        <div className="mt-16 relative">
          
          {/* Horizontal Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-500 to-emerald-400 -translate-y-8 z-0" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {ADVISORY_STEPS.map((step) => {
              const Icon = iconComponents[step.iconName] || ShieldCheck;
              return (
                <div
                  key={step.stepNumber}
                  className="bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-blue-400 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    
                    {/* Stage Badge & Number */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-blue-900 text-amber-400 font-heading font-extrabold text-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        0{step.stepNumber}
                      </div>

                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-700 shadow-2xs">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Titles */}
                    <div>
                      <span className="text-[10px] font-extrabold text-blue-700 uppercase tracking-widest">
                        {step.subtitle}
                      </span>
                      <h3 className="text-lg font-heading font-bold text-slate-900 group-hover:text-blue-800 transition-colors mt-0.5">
                        {step.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Outcome Box */}
                  <div className="mt-6 pt-4 border-t border-slate-200/60">
                    <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 text-[11px] text-blue-900 font-medium flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-blue-700 shrink-0 mt-0.5" />
                      <span>{step.keyOutcome}</span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action Bar */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-6 rounded-2xl bg-slate-900 text-white shadow-xl max-w-3xl mx-auto">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-base font-bold text-amber-400">Ready for an Unbiased Policy Review?</h4>
              <p className="text-xs text-slate-300">Bring your current policy or tell us your requirements. No obligation.</p>
            </div>
            <button
              onClick={onOpenQuoteModal}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shrink-0 flex items-center gap-2"
            >
              <span>Schedule Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
