import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { BUSINESS_INFO } from '../data/insuranceData';
import logoImg from '../assets/images/kadadi_motors_logo_1785494192983.jpg';
import {
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Menu,
  X,
  ShieldCheck,
  FileText,
  Trophy,
  User,
  Lock,
  Sparkles,
  Search,
  ShieldAlert,
  SlidersHorizontal,
  Bell
} from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenQuoteModal: () => void;
  onOpenChecklistModal: () => void;
  onOpenSearch?: () => void;
  onOpenSos?: () => void;
  onOpenCompare?: () => void;
  onOpenReminder?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  onOpenQuoteModal,
  onOpenChecklistModal,
  onOpenSearch,
  onOpenSos,
  onOpenCompare,
  onOpenReminder
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'doc-checklist-hub', label: 'Required Docs', highlight: true, icon: <FileText className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'sector-details-view', label: 'Sectors Directory' },
    { id: 'km-points-leaderboard', label: 'KM Rewards', icon: <Trophy className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'customer-portal', label: 'My Profile', icon: <User className="w-3.5 h-3.5 text-blue-400" /> },
    { id: 'claims-renewals', label: 'Claims & Calculator', icon: <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: 'about', label: 'About & Partners' },
    { id: 'contact', label: 'Contact & Map' },
    { id: 'admin-portal-login', label: 'Admin Login', icon: <Lock className="w-3.5 h-3.5 text-rose-400" /> }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Hotline Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
          
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-slate-300 font-bold">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
              <span>Udgir Road, Beside MAX, Bidar, Karnataka</span>
            </span>

            <span className="hidden lg:flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" aria-hidden="true" />
              <span>Hours: {BUSINESS_INFO.hours}</span>
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/50 text-[10px] font-extrabold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              Open Today • Chandrakant Kadadi Desk
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto text-[11px] sm:text-xs">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="flex items-center gap-1.5 text-slate-200 hover:text-white font-extrabold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>

            <span className="text-slate-700" aria-hidden="true">|</span>

            <a
              href={`https://wa.me/91${BUSINESS_INFO.whatsappRaw}?text=Hi%20Chandrakant%20Kadadi%20Sir,%20I%20need%20insurance%20advice.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-extrabold transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
              <span>WhatsApp Desk</span>
            </a>
          </div>

        </div>
      </div>

      {/* Main Glass Navigation Bar */}
      <div className={`w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/95 backdrop-blur-xl shadow-2xl border-b border-amber-500/20 py-2.5'
          : 'bg-slate-950 border-b border-slate-900 py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-xl"
          >
            <Logo variant="light" showSubtitle={!isScrolled} />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 text-xs xl:text-sm font-extrabold rounded-xl transition-all duration-200 flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                      : item.highlight
                      ? 'bg-amber-400/10 text-amber-300 border border-amber-500/30 hover:bg-amber-400/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2">
            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                className="p-2 text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 transition-all focus:outline-none"
                title="Global Search (Ctrl+K)"
              >
                <Search className="w-4 h-4 text-amber-400" aria-hidden="true" />
              </button>
            )}

            {onOpenSos && (
              <button
                onClick={onOpenSos}
                className="px-3 py-2 text-xs font-black text-rose-300 bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 rounded-xl transition-all flex items-center gap-1.5 focus:outline-none"
                title="24/7 Accident & Hospital Claim Assistance"
              >
                <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" aria-hidden="true" />
                <span>SOS Claim</span>
              </button>
            )}

            {onOpenCompare && (
              <button
                onClick={onOpenCompare}
                className="px-3 py-2 text-xs font-bold text-slate-300 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 transition-all flex items-center gap-1.5 focus:outline-none"
                title="Side-by-Side Policy Plan Comparison"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
                <span className="hidden xl:inline">Compare</span>
              </button>
            )}

            {onOpenReminder && (
              <button
                onClick={onOpenReminder}
                className="p-2 text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 transition-all focus:outline-none"
                title="Set Renewal Reminder"
              >
                <Bell className="w-4 h-4 text-amber-400" aria-hidden="true" />
              </button>
            )}

            <button
              onClick={onOpenQuoteModal}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-black text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 rounded-xl shadow-lg transition-all focus:outline-none"
            >
              <ShieldCheck className="w-4 h-4 text-slate-950" aria-hidden="true" />
              <span>Get Policy Advice</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenChecklistModal}
              className="p-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-black"
            >
              <FileText className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:bg-slate-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-slate-950/80 backdrop-blur-md">
          <div className="ml-auto w-full max-w-xs h-full bg-slate-950 border-l border-slate-800 shadow-2xl flex flex-col p-6 overflow-y-auto space-y-6 text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <img src={logoImg} alt="Logo" className="w-8 h-8 rounded-lg object-contain border border-amber-400/40" />
                <span className="font-heading font-black text-sm text-white">Kadadi Motors</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400">
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="space-y-1.5 flex-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-xs font-extrabold flex items-center justify-between ${
                      isActive ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-slate-900 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full py-3 rounded-xl bg-amber-400 text-slate-950 font-black text-xs"
              >
                Request Free Policy Advice
              </button>
            </div>
          </div>
        </div>
      )}

    </header>
  );
};
