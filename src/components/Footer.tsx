import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { BUSINESS_INFO } from '../data/insuranceData';
import { AppStore } from '../lib/store';
import { NewsletterSubscribe } from './NewsletterSubscribe';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Shield,
  BellRing,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Check
} from 'lucide-react';
import logoImg from '../assets/images/kadadi_motors_logo_1785494192983.jpg';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenQuoteModal: () => void;
  onOpenNewsletterWelcome?: (email: string, topic?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenQuoteModal, onOpenNewsletterWelcome }) => {
  const [subscriberCount, setSubscriberCount] = useState(150);

  useEffect(() => {
    const updateCount = () => {
      const subs = AppStore.getNewsletterSubscribers();
      setSubscriberCount(subs.filter((s) => s.status === 'Active').length + 148);
    };
    updateCount();
    window.addEventListener('km_store_updated', updateCount);
    return () => window.removeEventListener('km_store_updated', updateCount);
  }, []);

  return (
    <footer className="bg-black text-slate-300 border-t border-white/10">
      
      {/* Top Footer Banner */}
      <div className="bg-black py-12 px-4 sm:px-6 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-heading font-black text-white tracking-wide">
              Looking for Independent Insurance Advice in Bidar?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              Visit our Udgir Road office or speak directly with Chandrakant Kadadi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenQuoteModal}
              className="px-6 py-3 min-h-[44px] inline-flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-md shadow-blue-600/20 transition-all cursor-pointer"
            >
              Request Free Policy Review
            </button>
            <a
              href={BUSINESS_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 min-h-[44px] inline-flex items-center justify-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/15 backdrop-blur-md text-white font-bold text-xs border border-white/20 transition-all cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-red-400" aria-hidden="true" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>
      </div>

      {/* Persistent & Elegant Newsletter Subscribe Component */}
      <NewsletterSubscribe onOpenNewsletterWelcome={onOpenNewsletterWelcome} />

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-start gap-3">
              <Logo variant="light" showSubtitle={true} />
            </div>
            
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Kadadi Motors is Bidar’s premier independent insurance advisory firm, serving families, transporters, and enterprises for over 25 years with integrity, technical expertise, and personal claim advocacy.
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs text-blue-400 font-bold bg-slate-900 p-2.5 rounded-xl border border-slate-800 w-fit">
              <Shield className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
              <span>Founder: {BUSINESS_INFO.founder} (Est. {BUSINESS_INFO.establishedYear})</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-widest text-blue-400">Quick Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-blue-400 transition-colors focus:outline-none focus-visible:underline cursor-pointer">Home Page</button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-blue-400 transition-colors focus:outline-none focus-visible:underline cursor-pointer">About Kadadi Motors</button>
              </li>
              <li>
                <button onClick={() => onNavigate('sector-details-view')} className="hover:text-blue-400 transition-colors focus:outline-none focus-visible:underline cursor-pointer">Insurance Sectors</button>
              </li>
              <li>
                <button onClick={() => onNavigate('doc-checklist-hub')} className="hover:text-blue-400 transition-colors focus:outline-none focus-visible:underline cursor-pointer">Document Checklist</button>
              </li>
              <li>
                <button onClick={() => onNavigate('claims-renewals')} className="hover:text-blue-400 transition-colors focus:outline-none focus-visible:underline cursor-pointer">Claims & Renewals</button>
              </li>
              <li>
                <button onClick={() => onNavigate('km-points-leaderboard')} className="hover:text-blue-400 transition-colors focus:outline-none focus-visible:underline cursor-pointer">KM Rewards</button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-blue-400 transition-colors focus:outline-none focus-visible:underline cursor-pointer">Contact & Map</button>
              </li>
            </ul>
          </div>

          {/* Solutions Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-widest text-blue-400">Major Categories</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Health & Family Floater Insurance</li>
              <li>Car & Bike Two-Wheeler Insurance</li>
              <li>Commercial Truck, Taxi & Bus Fleet</li>
              <li>Life & Pure Term Insurance</li>
              <li>Home, Shop & Property Fire Insurance</li>
              <li>Contractors CAR & Engineering Cover</li>
              <li>Proactive Policy Renewals & Claims</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-widest text-blue-400">Headquarters Contact</h4>
            
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="leading-relaxed">{BUSINESS_INFO.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
                <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="hover:text-blue-400 font-bold focus:outline-none focus-visible:underline">{BUSINESS_INFO.phoneDisplay}</a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
                <a href={`https://wa.me/91${BUSINESS_INFO.whatsappRaw}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 focus:outline-none focus-visible:underline">
                  WhatsApp: +91 {BUSINESS_INFO.whatsappRaw}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-blue-400 focus:outline-none focus-visible:underline">{BUSINESS_INFO.email}</a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
                <span>Hours: {BUSINESS_INFO.hours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-12 p-4 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 leading-relaxed space-y-1">
          <p className="font-bold text-slate-300 uppercase tracking-wide">Regulatory & Legal Notice:</p>
          <p>
            Kadadi Motors is an independent insurance advisory and policy service provider in Bidar, Karnataka. We act as an intermediary helping clients compare and secure policies from multiple authorized public and private general and life insurance companies in India. Kadadi Motors is not an insurance company or underwriter. Policy coverage, underwriting terms, and claim approvals are subject to the respective insurance company's guidelines.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Kadadi Motors. All rights reserved. Bidar, Karnataka, India.</p>
          <p className="flex items-center gap-1 text-slate-400">
            <span>Trusted Today • Secure Tomorrow</span>
          </p>
        </div>

      </div>
    </footer>
  );
};


