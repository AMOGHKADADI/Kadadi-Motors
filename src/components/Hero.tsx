import React from 'react';
import { BUSINESS_INFO } from '../data/insuranceData';
import { Shield, ArrowRight, PhoneCall, CheckCircle2, Award, Users, Scale, MapPin } from 'lucide-react';

interface HeroProps {
  onExploreSolutions: () => void;
  onContactExpert: () => void;
  onOpenQuoteModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreSolutions,
  onContactExpert,
  onOpenQuoteModal,
}) => {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background Decorative Pattern & Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.25),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-grid-slate-800/[0.1] bg-[bottom_1px_center]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Emotionally Intelligent Headline & Copy */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            
            {/* Trust Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-slate-200 text-xs sm:text-sm font-medium backdrop-blur-sm shadow-inner">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Independent Insurance Advisory • Serving Bidar Since 1999</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.12]">
              Protecting What Matters Most Through Every Stage of Life.
            </h1>

            {/* Supporting Copy */}
            <p className="text-slate-300 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl">
              For over twenty-five years, <strong className="text-white font-semibold">{BUSINESS_INFO.name}</strong> has helped families, individuals, and businesses across Karnataka navigate complex insurance choices with complete independence, technical clarity, and personal claim advocacy.
            </p>

            {/* Value Checkpoints */}
            <div className="grid sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>100% Unbiased Multi-Insurer Advice</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Personal Local Claim Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>25+ Years Proven Integrity</span>
              </div>
            </div>

            {/* Primary & Secondary Call to Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenQuoteModal}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg hover:shadow-amber-500/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Shield className="w-5 h-5 text-slate-950" />
                <span>Request Free Policy Advisory</span>
              </button>

              <button
                onClick={onExploreSolutions}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-xl border border-slate-700/80 transition-all duration-200"
              >
                <span>Explore Insurance Solutions</span>
                <ArrowRight className="w-4 h-4 text-blue-400" />
              </button>
            </div>

            {/* Direct Quick Contact Bar */}
            <div className="pt-2 flex items-center gap-4 text-xs text-slate-400 border-t border-slate-800/80">
              <span className="font-semibold text-slate-300">Direct Advisory Line:</span>
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="text-amber-400 hover:underline font-bold flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{BUSINESS_INFO.phoneDisplay}</span>
              </a>
              <span className="hidden sm:inline text-slate-600">•</span>
              <span className="hidden sm:inline text-slate-400">Founder: {BUSINESS_INFO.founder}</span>
            </div>

          </div>

          {/* Right Column: Key Trust Card & Institutional Visual */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-900/90 p-6 sm:p-8 border border-slate-700/80 shadow-2xl backdrop-blur-xl">
              
              {/* Decorative Glow */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6 relative z-10">
                {/* Header inside card */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-700/60">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-amber-400">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-white text-base">Quarter Century of Trust</h3>
                      <p className="text-xs text-slate-400">Est. 1999 • Udgir Road, Bidar</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-950 text-blue-300 border border-blue-800/50">
                    5.0 ★ Google Rating
                  </span>
                </div>

                {/* Stat Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-2xl sm:text-3xl font-heading font-extrabold text-amber-400">25+</div>
                    <div className="text-xs text-slate-400 font-medium mt-1">Years serving families & businesses</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-2xl sm:text-3xl font-heading font-extrabold text-blue-400">10+</div>
                    <div className="text-xs text-slate-400 font-medium mt-1">Leading insurance partners compared</div>
                  </div>
                </div>

                {/* Key Advisory Promise Box */}
                <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/40 text-xs text-slate-300 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-white text-sm">
                    <Scale className="w-4 h-4 text-blue-400" />
                    <span>Independent & Unbiased</span>
                  </div>
                  <p className="leading-relaxed">
                    We do not sell insurance for a single company. We compare policies across top public and private insurers to ensure your family or business gets the right protection at the right rate.
                  </p>
                </div>

                {/* Directions Shortcut */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Ground Floor, Rishikesh Complex, Beside MAX</span>
                  </div>
                  <a
                    href={BUSINESS_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 hover:underline shrink-0"
                  >
                    View Map →
                  </a>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
