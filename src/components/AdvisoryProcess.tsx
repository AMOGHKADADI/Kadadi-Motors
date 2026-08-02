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
    <section id="process" className="py-16 lg:py-24 bg-slate-950 text-white border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-blue-400 bg-blue-950/80 border border-blue-800/50 uppercase tracking-wider">
            Advisory Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
            How We Guide You in 4 Stage Precision
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            We cut through fine print and aggressive marketing pitches to deliver absolute clarity, transparent options, and lifelong claim support.
          </p>
        </div>

        {/* 4 Stage Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ADVISORY_STEPS.map((step) => {
            const Icon = iconComponents[step.iconName] || ShieldCheck;
            return (
              <div
                key={step.stepNumber}
                className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  
                  {/* Stage Badge & Number */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-heading font-extrabold text-base flex items-center justify-center shadow-xs">
                      0{step.stepNumber}
                    </div>

                    <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Titles */}
                  <div>
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                      {step.subtitle}
                    </span>
                    <h3 className="text-base font-heading font-bold text-white mt-0.5">
                      {step.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Outcome Box */}
                <div className="pt-4 border-t border-slate-800">
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300 font-medium flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                    <span>{step.keyOutcome}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Call to Action Bar */}
        <div className="text-center pt-4">
          <div className="inline-flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 max-w-3xl mx-auto w-full">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-base font-bold text-white">Ready for an Unbiased Policy Review?</h4>
              <p className="text-xs text-slate-400">Bring your current policy or tell us your requirements. No obligation.</p>
            </div>
            <button
              onClick={onOpenQuoteModal}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-xs shrink-0 flex items-center gap-2 cursor-pointer transition-all"
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
