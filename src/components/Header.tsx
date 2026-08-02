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
  Bell,
  Wand2
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
    { id: 'sector-details-view', label: 'Insurance Sectors' },
    { id: 'policy-wizard', label: 'Policy & Doc Wizard', highlight: true, icon: <FileText className="w-3.5 h-3.5 text-blue-400" /> },
    { id: 'claims-renewals', label: 'Claims & Calculators', icon: <ShieldCheck className="w-3.5 h-3.5 text-red-400" /> },
    { id: 'customer-portal', label: 'My Vault', icon: <User className="w-3.5 h-3.5 text-blue-400" /> },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact & Map' },
    { id: 'admin-portal-login', label: 'Admin Desk', icon: <Lock className="w-3.5 h-3.5 text-slate-400" /> }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Hotline Bar */}
      <div className="bg-black text-slate-300 text-xs py-2 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
          
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-slate-300 font-bold">
              <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" aria-hidden="true" />
              <span>Udgir Road, Beside MAX, Bidar, Karnataka</span>
            </span>

            <span className="hidden lg:flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" aria-hidden="true" />
              <span>Hours: {BUSINESS_INFO.hours}</span>
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-950/60 text-blue-400 border border-blue-500/30 text-[10px] font-bold backdrop-blur-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              Open Today • Chandrakant Kadadi Desk
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto text-[11px] sm:text-xs">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="flex items-center gap-1.5 min-h-[44px] text-slate-200 hover:text-white font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>

            <span className="text-slate-800" aria-hidden="true">|</span>

            <a
              href={`https://wa.me/91${BUSINESS_INFO.whatsappRaw}?text=Hi%20Chandrakant%20Kadadi%20Sir,%20I%20need%20insurance%20advice.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 min-h-[44px] text-red-400 hover:text-red-300 font-bold transition-colors"
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
          ? 'bg-black/85 backdrop-blur-xl shadow-2xl border-b border-white/10 py-2.5'
          : 'bg-black/90 backdrop-blur-lg border-b border-white/10 py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-xl cursor-pointer min-h-[44px]"
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
                  className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg transition-all duration-200 flex items-center gap-1.5 cursor-pointer min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                    isActive
                      ? 'bg-white text-black font-extrabold shadow-md'
                      : item.highlight
                      ? 'bg-white/5 text-blue-400 border border-blue-500/30 hover:bg-white/10 backdrop-blur-md'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
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
                className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-lg border border-white/10 transition-all cursor-pointer focus:outline-none"
                title="Global Search (Ctrl+K)"
              >
                <Search className="w-4 h-4 text-blue-400" aria-hidden="true" />
              </button>
            )}

            {onOpenSos && (
              <button
                onClick={onOpenSos}
                className="px-3.5 py-2 min-h-[44px] text-xs font-bold text-red-300 bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 backdrop-blur-md rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer focus:outline-none"
                title="24/7 Accident & Hospital Claim Assistance"
              >
                <ShieldAlert className="w-4 h-4 text-red-400" aria-hidden="true" />
                <span>SOS Claim</span>
              </button>
            )}

            {onOpenCompare && (
              <button
                onClick={onOpenCompare}
                className="px-3.5 py-2 min-h-[44px] text-xs font-bold text-slate-300 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-lg border border-white/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer focus:outline-none"
                title="Side-by-Side Policy Plan Comparison"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
                <span className="hidden xl:inline">Compare</span>
              </button>
            )}

            {onOpenReminder && (
              <button
                onClick={onOpenReminder}
                className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-lg border border-white/10 transition-all cursor-pointer focus:outline-none"
                title="Set Renewal Reminder"
              >
                <Bell className="w-4 h-4 text-blue-400" aria-hidden="true" />
              </button>
            )}

            <button
              onClick={onOpenQuoteModal}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md shadow-blue-600/20 transition-all cursor-pointer focus:outline-none"
            >
              <ShieldCheck className="w-4 h-4 text-white" aria-hidden="true" />
              <span>Get Policy Advice</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenChecklistModal}
              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-blue-600 text-white text-xs font-bold cursor-pointer"
            >
              <FileText className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-300 hover:bg-slate-900 cursor-pointer"
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
                <img src={logoImg} alt="Logo" className="w-8 h-8 rounded-lg object-contain border border-slate-800" />
                <span className="font-heading font-black text-sm text-white">Kadadi Motors</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400 min-h-[44px] min-w-[44px] flex items-center justify-center">
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
                    className={`w-full text-left px-4 py-3 min-h-[44px] rounded-xl text-xs font-bold flex items-center justify-between ${
                      isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-900'
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
                className="w-full py-3 min-h-[44px] rounded-xl bg-blue-600 text-white font-bold text-xs cursor-pointer flex items-center justify-center"
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
