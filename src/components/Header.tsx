import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { BUSINESS_INFO } from '../data/insuranceData';
import { Phone, MapPin, Clock, MessageSquare, Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenQuoteModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  onOpenQuoteModal
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'solutions', label: 'Insurance Solutions' },
    { id: 'about', label: 'About Advisory' },
    { id: 'process', label: 'Our Process' },
    { id: 'claims-renewals', label: 'Claims & Renewals' },
    { id: 'faq', label: 'FAQs' },
    { id: 'partners', label: 'Insurers' },
    { id: 'contact', label: 'Contact & Map' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Advisory Information Bar */}
      <div className={`bg-slate-900 text-slate-300 text-xs py-2 px-4 transition-all duration-300 ${isScrolled ? 'hidden md:block opacity-90' : 'block'}`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
              <span>Udgir Road, Beside MAX, Bidar, Karnataka</span>
            </span>
            <span className="hidden lg:flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" aria-hidden="true" />
              <span>Hours: {BUSINESS_INFO.hours}</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/50 text-[10px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              Open Today
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto text-[11px] sm:text-xs">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="flex items-center gap-1.5 text-slate-200 hover:text-white font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-sm"
              aria-label={`Call Advisory Desk at ${BUSINESS_INFO.phoneDisplay}`}
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>
            <span className="text-slate-700" aria-hidden="true">|</span>
            <a
              href={`https://wa.me/91${BUSINESS_INFO.whatsappRaw}?text=Hello%20Kadadi%20Motors,%20I%20would%20like%20insurance%20guidance.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-sm"
              aria-label="Chat with Kadadi Motors Advisory on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
              <span>WhatsApp Advisory</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Glass Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 py-2.5'
            : 'bg-white border-b border-slate-100 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-1"
            aria-label="Kadadi Motors Home Page"
          >
            <Logo variant="default" showSubtitle={!isScrolled} />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    isActive
                      ? 'bg-blue-50 text-blue-800 font-bold'
                      : 'text-slate-700 hover:text-blue-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href={BUSINESS_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 rounded-lg border border-slate-200 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              aria-label="Open Office Location in Bidar on Google Maps"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
              <span>Directions</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400" aria-hidden="true" />
            </a>

            <button
              onClick={onOpenQuoteModal}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm hover:shadow transition-all transform active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              aria-label="Open form to get personal policy advice"
            >
              <ShieldCheck className="w-4 h-4 text-amber-300" aria-hidden="true" />
              <span>Get Policy Advice</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenQuoteModal}
              className="inline-flex items-center justify-center p-2 rounded-lg bg-blue-700 text-white text-xs font-bold shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              aria-label="Request Quote Modal"
            >
              <ShieldCheck className="w-4 h-4 text-amber-300" aria-hidden="true" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 z-50 lg:hidden flex flex-col bg-slate-950/60 backdrop-blur-sm"
        >
          <div className="ml-auto w-full max-w-xs sm:max-w-sm h-full bg-white shadow-2xl flex flex-col p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <Logo variant="default" showSubtitle={true} />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                aria-label="Close Mobile Navigation"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            <nav className="py-4 space-y-1 flex-1" aria-label="Mobile Navigation Links">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                      isActive
                        ? 'bg-blue-50 text-blue-800 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-blue-600" aria-hidden="true" />}
                  </button>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-700 text-white font-bold text-sm shadow hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <ShieldCheck className="w-4 h-4 text-amber-300" aria-hidden="true" />
                <span>Request Free Policy Advice</span>
              </button>

              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 text-slate-800 font-semibold text-xs border border-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                aria-label="Get Directions to Bidar Office on Google Maps"
              >
                <MapPin className="w-4 h-4 text-blue-600" aria-hidden="true" />
                <span>Get Directions (Bidar Office)</span>
              </a>

              <div className="p-3 rounded-xl bg-slate-50 text-xs text-slate-600 space-y-1">
                <p className="font-semibold text-slate-900">{BUSINESS_INFO.name}</p>
                <p>Founder: {BUSINESS_INFO.founder}</p>
                <p className="text-slate-500">Udgir Road, Beside MAX, Bidar</p>
                <p className="text-blue-700 font-medium">Ph: {BUSINESS_INFO.phoneDisplay}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

