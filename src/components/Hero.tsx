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
  MapPin,
  Wand2
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
    <section id="home" className="relative min-h-[85vh] bg-black text-white flex items-center justify-center py-16 sm:py-24 overflow-hidden border-b border-white/10">
      
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={(heroImg as any)?.src || heroImg}
          alt="Kadadi Motors Advisory Background"
          className="w-full h-full object-cover object-center opacity-20 mix-blend-luminosity scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black" />
        
        {/* Ambient Red & Blue Subtle Glow Orbs */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full space-y-10 text-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-slate-200 text-xs font-semibold tracking-wide shadow-lg">
          <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
          <span>Independent Advisory in Bidar • Est. {BUSINESS_INFO.establishedYear}</span>
        </div>

        {/* Headline */}
        <div className="space-y-5 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black text-white tracking-tight leading-[1.08]">
            Independent Insurance Advice & <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-white to-red-400">
              Personal Claim Advocacy
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Guided by <strong className="text-white">Chandrakant Kadadi</strong>. Unbiased multi-insurer comparison and end-to-end claim settlement support across Motor, Health, Fleet, and Life protection.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-3xl mx-auto pt-2">
          
          <button
            onClick={() => onNavigate('policy-wizard')}
            className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <FileText className="w-4 h-4 text-white" aria-hidden="true" />
            <span>Policy & Document Wizard</span>
          </button>

          <button
            onClick={onOpenQuoteModal}
            className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 backdrop-blur-md text-white font-bold text-sm border border-white/20 transition-all flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ShieldCheck className="w-4 h-4 text-blue-400" aria-hidden="true" />
            <span>Request Free Policy Review</span>
          </button>

          <a
            href={`https://wa.me/91${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent("Hi Chandrakant Kadadi Sir, I would like insurance advice.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 backdrop-blur-md border border-red-500/40 text-red-200 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-red-400" aria-hidden="true" />
            <span>WhatsApp Desk</span>
          </a>

        </div>

        {/* 3 Glassmorphism Trust Cards */}
        <div className="grid sm:grid-cols-3 gap-4 pt-6 max-w-4xl mx-auto text-left">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-blue-500/40 transition-all flex items-center gap-4 shadow-xl group">
            <div className="w-11 h-11 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-black text-sm shrink-0 border border-blue-500/30 group-hover:scale-105 transition-transform">
              25+
            </div>
            <div>
              <h3 className="font-heading font-bold text-white text-sm">Years in Bidar</h3>
              <p className="text-xs text-slate-400">Serving Bidar & Bhalki since 1998.</p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-red-500/40 transition-all flex items-center gap-4 shadow-xl group">
            <div className="w-11 h-11 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center font-black text-sm shrink-0 border border-red-500/30 group-hover:scale-105 transition-transform">
              100%
            </div>
            <div>
              <h3 className="font-heading font-bold text-white text-sm">Claim Advocacy</h3>
              <p className="text-xs text-slate-400">Personal guidance until payout.</p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all flex items-center gap-4 shadow-xl group">
            <div className="w-11 h-11 rounded-xl bg-white/10 text-slate-200 flex items-center justify-center font-black text-sm shrink-0 border border-white/20 group-hover:scale-105 transition-transform">
              KM
            </div>
            <div>
              <h3 className="font-heading font-bold text-white text-sm">Client Portal</h3>
              <p className="text-xs text-slate-400">Verified document vault & status.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
