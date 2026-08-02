import React from 'react';
import { BUSINESS_INFO } from '../data/insuranceData';
import { Shield, Award, CheckCircle2, Building, MapPin } from 'lucide-react';
import { ShareButton } from './ShareButton';
import deskImg from '../assets/images/luxury_advisory_desk_1785494225221.jpg';
import logoImg from '../assets/images/kadadi_motors_logo_1785494192983.jpg';

interface AboutSectionProps {
  onOpenQuoteModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenQuoteModal }) => {
  return (
    <section id="about" className="py-16 lg:py-24 bg-slate-950 text-white relative overflow-hidden border-b border-slate-800">
      {/* Glow Effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-blue-400 bg-blue-950/80 border border-blue-800/50 uppercase tracking-wider">
            <span>About Kadadi Motors</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
            A Quarter Century of Integrity & Personal Advisory
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Founded by <strong className="text-white">{BUSINESS_INFO.founder}</strong> in {BUSINESS_INFO.establishedYear}, Kadadi Motors has evolved into Bidar’s premier independent insurance advisory firm through consistency and client advocacy.
          </p>
        </div>

        {/* Content Grid */}
        <div className="mt-12 sm:mt-16 grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Authentic Brand Narrative */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
            
            <div className="space-y-4">
              <h3 className="text-2xl font-heading font-bold text-white">
                Understanding First, Recommending Second
              </h3>
              <p>
                Insurance is purchased during peace of mind but tested during distress. For over <strong className="text-white font-semibold">25 years</strong>, Kadadi Motors has operated with a simple principle: every client deserves independent, technically precise, and completely honest policy guidance.
              </p>
              <p>
                Unlike single-company agents or comparison bots, we evaluate your vehicle usage, family medical history, commercial transport risks, and liabilities before presenting tailored recommendations across top insurers.
              </p>
            </div>

            {/* Founder Profile Box with Image */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={logoImg}
                    alt="Kadadi Motors Official Badge"
                    className="w-12 h-12 object-contain rounded-xl border border-slate-700 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-heading font-bold text-white text-base">{BUSINESS_INFO.founder}</h4>
                    <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Founder & Principal Director</p>
                    <p className="text-[11px] text-slate-400">Bidar, Karnataka • Est. 1999</p>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                "Our business has never relied on high-pressure sales pitches. Over twenty-five years, our reputation has been built by word-of-mouth recommendations from local families and transport owners across Bidar."
              </p>
            </div>

            {/* Key Pillars Checklist */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800 font-medium text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
                <span>100% Independent Advisory</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800 font-medium text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
                <span>Local Surveyor Coordination</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800 font-medium text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
                <span>Zero Hidden Fees</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800 font-medium text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
                <span>Proactive Renewal Desk</span>
              </div>
            </div>

          </div>

          {/* Right Column: Key Institutional Facts & Desk Image */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Cinematic Desk Imagery Container */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-lg group">
              <img
                src={deskImg}
                alt="Executive Insurance Advisory Desk"
                className="w-full h-56 sm:h-64 object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-xs text-slate-200 font-semibold bg-slate-900/90 p-2.5 rounded-xl backdrop-blur-md border border-slate-800 flex items-center justify-between">
                <span>Policy Comparison Desk</span>
                <span className="text-blue-400 font-bold">Bidar Office</span>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900 text-white p-6 sm:p-8 space-y-5 border border-slate-800">
              
              <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                <Building className="w-6 h-6 text-blue-400 shrink-0" aria-hidden="true" />
                <div>
                  <h4 className="font-heading font-bold text-base text-white">Kadadi Motors Office</h4>
                  <p className="text-xs text-slate-400">Bidar, Karnataka</p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong className="text-white block font-semibold">Official Location:</strong>
                    <span>Ground Floor, Rishikesh Complex, Udgir Road, Beside MAX, Bidar - 585401</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Award className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong className="text-white block font-semibold">Recognition:</strong>
                    <span>Respected and recognized by leading public and private insurance institutions across a 25+ year tenure.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong className="text-white block font-semibold">Disclaimer:</strong>
                    <span>Kadadi Motors is an independent insurance advisory provider, not an underwriting company.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs text-slate-400">Est. {BUSINESS_INFO.establishedYear}</span>
                <div className="flex items-center gap-2">
                  <ShareButton variant="dark" label="Share Info" />
                  <button
                    onClick={onOpenQuoteModal}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
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

