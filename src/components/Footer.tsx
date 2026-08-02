import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { BUSINESS_INFO } from '../data/insuranceData';
import { AppStore } from '../lib/store';
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
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenQuoteModal }) => {
  const [emailInput, setEmailInput] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All Regulatory & Market Alerts');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });
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

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ type: 'idle', message: '' });

    const trimmedEmail = emailInput.trim();

    if (!trimmedEmail) {
      setFormStatus({
        type: 'error',
        message: 'Please enter your email address to subscribe.'
      });
      return;
    }

    // Specific email validation format checks
    if (!trimmedEmail.includes('@')) {
      setFormStatus({
        type: 'error',
        message: 'Invalid email format: Missing "@" symbol (e.g., name@example.com).'
      });
      return;
    }

    const parts = trimmedEmail.split('@');
    if (parts.length > 2) {
      setFormStatus({
        type: 'error',
        message: 'Invalid email format: Email address cannot contain multiple "@" symbols.'
      });
      return;
    }

    const [username, domain] = parts;

    if (!username) {
      setFormStatus({
        type: 'error',
        message: 'Invalid email format: Missing username prefix before "@" (e.g., name@example.com).'
      });
      return;
    }

    if (!domain) {
      setFormStatus({
        type: 'error',
        message: 'Invalid email format: Missing domain name after "@" (e.g., name@example.com).'
      });
      return;
    }

    if (!domain.includes('.')) {
      setFormStatus({
        type: 'error',
        message: 'Invalid email format: Missing top-level domain extension like .com, .in, or .org.'
      });
      return;
    }

    const domainParts = domain.split('.');
    const tld = domainParts[domainParts.length - 1];
    if (!tld || tld.length < 2) {
      setFormStatus({
        type: 'error',
        message: 'Invalid email format: Domain extension must be at least 2 characters (e.g., .com, .in).'
      });
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmedEmail)) {
      setFormStatus({
        type: 'error',
        message: 'Invalid email format: Contains invalid characters. Please enter a valid email address.'
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const res = AppStore.subscribeNewsletter(trimmedEmail, selectedTopic);
      setIsSubmitting(false);

      if (res.success) {
        setFormStatus({
          type: 'success',
          message: res.message
        });
        setEmailInput('');
      } else {
        setFormStatus({
          type: 'error',
          message: res.message
        });
      }
    }, 400);
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      
      {/* Top Footer Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950 py-12 px-4 sm:px-6 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
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
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
            >
              Request Free Policy Review
            </button>
            <a
              href={BUSINESS_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 transition-all flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <MapPin className="w-4 h-4 text-amber-400" aria-hidden="true" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>
      </div>

      {/* Insurance Regulatory Updates & Market Alerts Newsletter Sign-Up Box */}
      <div className="bg-slate-900/90 border-b border-slate-800 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950/40 p-6 sm:p-10 border border-amber-500/30 shadow-2xl overflow-hidden">
            
            {/* Background Glow Accent */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left Copy & Badge */}
              <div className="lg:col-span-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-400/30 text-orange-200 font-mono text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5">
                    <BellRing className="w-3.5 h-3.5 text-orange-300" />
                    <span>IRDAI & Market Bulletin</span>
                  </span>
                  <span className="text-[11px] text-blue-300 font-mono font-bold">
                    • Direct Advisory Channel
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading font-black text-white tracking-tight leading-snug">
                  Insurance Regulatory Updates & Market Alerts
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                  Subscribe to receive official IRDAI regulatory directives, motor third-party tariff revisions, tax exemption updates, and claim settlement guidelines curated directly by Chandrakant Kadadi.
                </p>

                {/* Preference Pills */}
                <div className="pt-2 flex flex-wrap gap-2">
                  {[
                    'All Regulatory & Market Alerts',
                    'Motor & Transport Tariff',
                    'Health & Tax Exemption',
                    'Commercial Fleet Guidance'
                  ].map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => setSelectedTopic(topic)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        selectedTopic === topic
                          ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      {selectedTopic === topic && <Check className="w-3 h-3 text-slate-950" />}
                      <span>{topic}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Form Input */}
              <div className="lg:col-span-6">
                <form onSubmit={handleNewsletterSubmit} noValidate className="space-y-3">
                  <label htmlFor="footer-newsletter-email" className="block text-xs font-extrabold text-amber-300 uppercase tracking-wider">
                    Enter Email Address for Updates
                  </label>

                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <div className="relative flex-1">
                      <Mail className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
                        formStatus.type === 'error' ? 'text-red-400' : 'text-slate-400'
                      }`} aria-hidden="true" />
                      <input
                        id="footer-newsletter-email"
                        type="email"
                        value={emailInput}
                        onChange={(e) => {
                          setEmailInput(e.target.value);
                          if (formStatus.type === 'error') {
                            setFormStatus({ type: 'idle', message: '' });
                          }
                        }}
                        placeholder="e.g., name@example.com"
                        className={`w-full pl-10 pr-4 py-3.5 rounded-2xl bg-slate-950 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none transition-all font-mono ${
                          formStatus.type === 'error'
                            ? 'border-2 border-red-500 ring-2 ring-red-500/40 bg-red-950/20 text-red-100 placeholder-red-300/40'
                            : 'border border-slate-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40'
                        }`}
                        disabled={isSubmitting}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 font-black text-xs sm:text-sm shadow-xl transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer active:scale-95"
                    >
                      {isSubmitting ? (
                        <span>Registering...</span>
                      ) : (
                        <>
                          <span>Subscribe Free</span>
                          <Send className="w-4 h-4 text-slate-950" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Dynamic Validation Alert Message */}
                  {formStatus.type === 'error' && (
                    <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-200 text-xs font-medium flex items-center gap-2 animate-fadeIn">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{formStatus.message}</span>
                    </div>
                  )}

                  {formStatus.type === 'success' && (
                    <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-200 text-xs font-bold flex items-center gap-2.5 animate-fadeIn shadow-lg">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span>{formStatus.message}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
                    <span className="flex items-center gap-1 text-slate-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>No spam • Temporary state storage enabled</span>
                    </span>
                    <span className="text-amber-400 font-semibold hidden sm:inline">
                      Preference: {selectedTopic}
                    </span>
                  </div>
                </form>
              </div>

            </div>

          </div>
        </div>
      </div>

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

            <div className="pt-1 flex items-center gap-2 text-xs text-amber-400 font-bold bg-slate-900 p-2.5 rounded-xl border border-slate-800 w-fit">
              <Shield className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
              <span>Founder: {BUSINESS_INFO.founder} (Est. {BUSINESS_INFO.establishedYear})</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-widest text-amber-400">Quick Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-amber-400 transition-colors focus:outline-none focus-visible:underline cursor-pointer">Home Page</button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors focus:outline-none focus-visible:underline cursor-pointer">About Kadadi Motors</button>
              </li>
              <li>
                <button onClick={() => onNavigate('sector-details-view')} className="hover:text-amber-400 transition-colors focus:outline-none focus-visible:underline cursor-pointer">Insurance Sectors</button>
              </li>
              <li>
                <button onClick={() => onNavigate('doc-checklist-hub')} className="hover:text-amber-400 transition-colors focus:outline-none focus-visible:underline cursor-pointer">Document Checklist</button>
              </li>
              <li>
                <button onClick={() => onNavigate('claims-renewals')} className="hover:text-amber-400 transition-colors focus:outline-none focus-visible:underline cursor-pointer">Claims & Renewals</button>
              </li>
              <li>
                <button onClick={() => onNavigate('km-points-leaderboard')} className="hover:text-amber-400 transition-colors focus:outline-none focus-visible:underline cursor-pointer">KM Rewards</button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-amber-400 transition-colors focus:outline-none focus-visible:underline cursor-pointer">Contact & Map</button>
              </li>
            </ul>
          </div>

          {/* Solutions Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-widest text-amber-400">Major Categories</h4>
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
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-widest text-amber-400">Headquarters Contact</h4>
            
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="leading-relaxed">{BUSINESS_INFO.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
                <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="hover:text-amber-400 font-bold focus:outline-none focus-visible:underline">{BUSINESS_INFO.phoneDisplay}</a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                <a href={`https://wa.me/91${BUSINESS_INFO.whatsappRaw}`} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 focus:outline-none focus-visible:underline">
                  WhatsApp: +91 {BUSINESS_INFO.whatsappRaw}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" aria-hidden="true" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-amber-400 focus:outline-none focus-visible:underline">{BUSINESS_INFO.email}</a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
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


