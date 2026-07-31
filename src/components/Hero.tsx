import React from 'react';
import { BUSINESS_INFO } from '../data/insuranceData';
import heroImg from '../assets/images/cinematic_luxury_hero_1785494208474.jpg';
import logoImg from '../assets/images/kadadi_motors_logo_1785494192983.jpg';
import {
  ShieldCheck,
  FileText,
  MessageSquare,
  Award,
  PhoneCall,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Users,
  MapPin
} from 'lucide-react';

interface HeroProps {
  onOpenQuoteModal: () => void;
  onOpenChecklistModal: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenQuoteModal,
  onOpenChecklistModal,
  onNavigate
}) => {
  return (
    <section id="home" className="relative min-h-[90vh] bg-slate-950 text-white flex items-center justify-center pt-8 pb-16 overflow-hidden border-b border-amber-500/20">
      
      {/* Background Cinematic Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Kadadi Motors Advisory Background"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity scale-105 transition-all duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/90" />
      </div>

      {/* Radiant Amber Sheen */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full space-y-10">
        
        {/* Top Floating Badge */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-widest shadow-xl backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
            <span>Bidar’s Independent Insurance Advisory Firm • Est. {BUSINESS_INFO.establishedYear}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black text-white tracking-tight max-w-5xl leading-[1.08]">
            Independent Insurance Advice & <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
              Personal Claim Advocacy in Bidar
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-lg max-w-3xl font-medium leading-relaxed">
            Led by <strong>Chandrakant Kadadi (Chandu Kadadi)</strong>, we provide unbiased, multi-insurer comparison and full claim settlement support across Motor, Health, Commercial Fleet, Life, and Shopkeeper Insurance.
          </p>
        </div>

        {/* Major Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-3xl mx-auto">
          
          {/* Goated Checklist Hub Button */}
          <button
            onClick={() => onNavigate('doc-checklist-hub')}
            className="px-6 sm:px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-black text-xs sm:text-sm shadow-2xl shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <FileText className="w-5 h-5 text-slate-950" aria-hidden="true" />
            <span>Required Documents Checklist Tool</span>
          </button>

          {/* Get Policy Advice Button */}
          <button
            onClick={onOpenQuoteModal}
            className="px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm border border-slate-700 transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <ShieldCheck className="w-5 h-5 text-amber-400" aria-hidden="true" />
            <span>Request Policy Advice</span>
          </button>

          {/* Direct WhatsApp Button */}
          <a
            href={`https://wa.me/91${BUSINESS_INFO.whatsappRaw}?text=Hi%20Chandrakant%20Kadadi%20Sir,%20I%20would%20like%20insurance%20advice.`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-emerald-600/20 transition-all flex items-center gap-2"
          >
            <MessageSquare className="w-5 h-5" aria-hidden="true" />
            <span>WhatsApp Chandu Kadadi</span>
          </a>

        </div>

        {/* 3 Executive Trust Pillars */}
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 pt-6 max-w-5xl mx-auto">
          
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-black shrink-0 border border-amber-400/30">
              25+
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-white text-sm">Years of Trust</h3>
              <p className="text-xs text-slate-400">Serving Bidar, Udgir Road & Bhalki since 1998.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-black shrink-0 border border-blue-500/30">
              100%
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-white text-sm">Claim Advocacy</h3>
              <p className="text-xs text-slate-400">Personal guidance until cashless payout.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black shrink-0 border border-emerald-500/30">
              KM
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-white text-sm">Loyalty Program</h3>
              <p className="text-xs text-slate-400">Earn KM Points on profile verification.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
