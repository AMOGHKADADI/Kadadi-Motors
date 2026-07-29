import React from 'react';
import { BUSINESS_INFO } from '../data/insuranceData';
import { Shield, Award, Users, CheckCircle2, Building, HeartHandshake, MapPin } from 'lucide-react';
import { ShareButton } from './ShareButton';

interface AboutSectionProps {
  onOpenQuoteModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenQuoteModal }) => {
  return (
    <section id="about" className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-blue-800 bg-blue-50 border border-blue-100 uppercase tracking-wider">
            About Kadadi Motors
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            A Quarter Century of Unwavering Integrity and Personal Advisory
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Founded by Chandrakant Kadadi in {BUSINESS_INFO.establishedYear}, Kadadi Motors has grown into Bidar’s most trusted independent insurance advisory firm through quiet consistency and dedicated customer advocacy.
          </p>
        </div>

        {/* Content Grid */}
        <div className="mt-12 sm:mt-16 grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Authentic Brand Narrative */}
          <div className="lg:col-span-7 space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
            
            <div className="space-y-4">
              <h3 className="text-2xl font-heading font-bold text-slate-900">
                Our Philosophy: Understanding First, Recommending Second
              </h3>
              <p>
                Insurance is one of the few financial contracts purchased during peace of mind but tested during times of stress. For over <strong className="text-slate-900 font-semibold">25 years</strong>, Kadadi Motors has operated with a simple principle: every customer deserves independent, technically accurate, and honest advice.
              </p>
              <p>
                Unlike single-company agents or impersonal online algorithms, we take time to examine your vehicle profile, family medical history, commercial transport risks, or business liabilities. Only after understanding your complete picture do we recommend policies from leading insurers.
              </p>
            </div>

            {/* Founder Profile Box */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-900 text-amber-400 font-heading font-extrabold text-xl flex items-center justify-center shrink-0 shadow-xs">
                  CK
                </div>
                <div>
                  <h4 className="font-heading font-bold text-slate-900 text-lg">{BUSINESS_INFO.founder}</h4>
                  <p className="text-xs font-semibold text-blue-800 uppercase tracking-wide">Founder & Principal Advisory Director</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                "Our business has never relied on high-pressure sales pitches or artificial promises. Over twenty-five years, our reputation has been built by word-of-mouth recommendations from local families, vehicle owners, and commercial transport contractors across Bidar."
              </p>
            </div>

            {/* Key Pillars Checklist */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Independent Advisory</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100 font-medium">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Local Surveyor Coordination</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100 font-medium">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Zero Hidden Fees or Charges</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100 font-medium">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Proactive Renewal Service</span>
              </div>
            </div>

          </div>

          {/* Right Column: Key Institutional Facts */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="rounded-2xl bg-slate-900 text-white p-8 space-y-6 shadow-2xl border border-slate-800">
              
              <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                <Building className="w-8 h-8 text-amber-400" />
                <div>
                  <h4 className="font-heading font-bold text-lg text-white">Kadadi Motors Office</h4>
                  <p className="text-xs text-slate-400">Bidar, Karnataka</p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">Official Location:</strong>
                    <span>Ground Floor, Rishikesh Complex, Udgir Road, Beside MAX, Bidar, Karnataka - 585401</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">Industry Recognition:</strong>
                    <span>Appreciated and recognized by leading public and private insurance institutions throughout a 25+ year career.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">Clear Legal Disclaimer:</strong>
                    <span>Kadadi Motors is an independent insurance advisory and policy service provider. We are not an underwriter or insurance company.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs text-slate-400">Est. {BUSINESS_INFO.establishedYear}</span>
                <div className="flex items-center gap-2">
                  <ShareButton variant="dark" label="Share Advisory Info" />
                  <button
                    onClick={onOpenQuoteModal}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-xs"
                  >
                    Consult Advisory
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
