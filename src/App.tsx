import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Hero } from './components/Hero';
import { TrustStats } from './components/TrustStats';
import { InsuranceSolutions } from './components/InsuranceSolutions';
import { AdvisoryProcess } from './components/AdvisoryProcess';
import { PartnersSection } from './components/PartnersSection';
import { PremiumCalculator } from './components/PremiumCalculator';
import { ClaimsRenewalSupport } from './components/ClaimsRenewalSupport';
import { TestimonialSection } from './components/TestimonialSection';
import { FaqSection } from './components/FaqSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { QuoteModal } from './components/QuoteModal';
import { DocumentChecklistModal } from './components/DocumentChecklistModal';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { BUSINESS_INFO } from './data/insuranceData';
import { InsuranceSolution } from './types';
import { MessageSquare, PhoneCall, ArrowUp } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteCategory, setQuoteCategory] = useState('');
  const [docChecklistOpen, setDocChecklistOpen] = useState(false);
  const [docChecklistCategory, setDocChecklistCategory] = useState('health');
  const [docChecklistPurpose, setDocChecklistPurpose] = useState('new_policy');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenQuoteModal = (category?: string) => {
    if (category) {
      setQuoteCategory(category);
    } else {
      setQuoteCategory('');
    }
    setQuoteModalOpen(true);
  };

  const handleOpenDocChecklist = (category: string = 'health', purpose: string = 'new_policy') => {
    setDocChecklistCategory(category);
    setDocChecklistPurpose(purpose);
    setDocChecklistOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col relative selection:bg-blue-600 selection:text-white">
      
      {/* Viewport Reading Progress Indicator Bar */}
      <ScrollProgressBar />

      {/* Brand Splash Screen on Initial Load */}
      {isLoading && <LoadingScreen onFinish={() => setIsLoading(false)} />}

      {/* Main Header */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <div id="home">
          <Hero
            onExploreSolutions={() => handleNavigate('solutions')}
            onContactExpert={() => handleNavigate('contact')}
            onOpenQuoteModal={() => handleOpenQuoteModal()}
          />
        </div>

        {/* Trust & Pillars Section */}
        <TrustStats />

        {/* Insurance Solutions Section */}
        <InsuranceSolutions
          onSelectSolution={(sol: InsuranceSolution) => handleOpenQuoteModal(sol.title)}
          onOpenQuoteModal={(cat?: string) => handleOpenQuoteModal(cat)}
          onOpenDocChecklist={(cat?: string, purpose?: string) => handleOpenDocChecklist(cat, purpose)}
        />

        {/* 4-Stage Advisory Process */}
        <AdvisoryProcess onOpenQuoteModal={() => handleOpenQuoteModal()} />

        {/* Partner Insurers Section */}
        <PartnersSection />

        {/* Interactive Coverage & Premium Calculator */}
        <PremiumCalculator onOpenQuoteModal={(cat: string) => handleOpenQuoteModal(cat)} />

        {/* Claims Assistance & Proactive Renewals */}
        <ClaimsRenewalSupport />

        {/* Google 5-Star Reviews & Testimonials */}
        <TestimonialSection />

        {/* FAQ Section with JSON-LD Structured Data */}
        <FaqSection onOpenQuoteModal={() => handleOpenQuoteModal()} />

        {/* About Kadadi Motors & Founder Story */}
        <AboutSection onOpenQuoteModal={() => handleOpenQuoteModal()} />

        {/* Office Location, Interactive Google Map & Contact Form */}
        <ContactSection />

      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
      />

      {/* Interactive Quote / Advisory Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        preselectedCategory={quoteCategory}
      />

      {/* Interactive Required Documents Helper Modal */}
      <DocumentChecklistModal
        isOpen={docChecklistOpen}
        onClose={() => setDocChecklistOpen(false)}
        defaultCategory={docChecklistCategory}
        defaultPurpose={docChecklistPurpose}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        
        {/* Back to Top */}
        {showBackToTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-3 rounded-full bg-slate-900 text-white shadow-xl hover:bg-blue-700 transition-all border border-slate-700"
            title="Back to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Direct Phone Call Button */}
        <a
          href={`tel:${BUSINESS_INFO.phoneRaw}`}
          className="p-3.5 rounded-full bg-blue-700 hover:bg-blue-800 text-white shadow-xl transition-transform hover:scale-110 flex items-center justify-center"
          title="Call Kadadi Motors Advisory"
        >
          <PhoneCall className="w-5 h-5" />
        </a>

        {/* Direct WhatsApp Chat Floating Button */}
        <a
          href={`https://wa.me/91${BUSINESS_INFO.whatsappRaw}?text=Hello%20Kadadi%20Motors,%20I%20would%20like%20insurance%20guidance.`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl transition-all hover:scale-105 flex items-center gap-2 font-bold text-xs"
          title="Chat on WhatsApp"
        >
          <MessageSquare className="w-5 h-5 fill-white" />
          <span className="hidden sm:inline">WhatsApp Advisory</span>
        </a>

      </div>

    </div>
  );
}
