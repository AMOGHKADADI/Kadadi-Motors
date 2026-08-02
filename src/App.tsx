import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Hero } from './components/Hero';
import { TrustStats } from './components/TrustStats';
import { HomeQuickDirectory } from './components/HomeQuickDirectory';
import { SectorDetailsView } from './components/SectorDetailsView';
import { CustomerPortal } from './components/CustomerPortal';
import { AdminPortal } from './components/AdminPortal';
import { AdvisoryProcess } from './components/AdvisoryProcess';
import { PartnersSection } from './components/PartnersSection';
import { PremiumCalculator } from './components/PremiumCalculator';
import { ClaimsRenewalSupport } from './components/ClaimsRenewalSupport';
import { FaqSection } from './components/FaqSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { CashlessNetworkFinder } from './components/CashlessNetworkFinder';
import { PolicyFlowWizard } from './components/PolicyFlowWizard';
import { SectionDivider } from './components/SectionDivider';
import { QuoteModal } from './components/QuoteModal';
import { DocumentChecklistModal } from './components/DocumentChecklistModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { EmergencySosModal } from './components/EmergencySosModal';
import { PolicyComparisonModal } from './components/PolicyComparisonModal';
import { PolicyReminderModal } from './components/PolicyReminderModal';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { BUSINESS_INFO } from './data/insuranceData';
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

  // Hardcore Feature Modals
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [reminderModalOpen, setReminderModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuoteModal = (category?: string) => {
    setQuoteCategory(category || '');
    setQuoteModalOpen(true);
  };

  const handleOpenDocChecklist = (category: string = 'health', purpose: string = 'new_policy') => {
    setDocChecklistCategory(category);
    setDocChecklistPurpose(purpose);
    setDocChecklistOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col relative selection:bg-amber-400 selection:text-slate-950">
      
      {/* Scroll Reading Progress Bar */}
      <ScrollProgressBar />

      {/* Brand Splash Screen on Initial Load */}
      {isLoading && <LoadingScreen onFinish={() => setIsLoading(false)} />}

      {/* Main Navigation Header */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
        onOpenChecklistModal={() => handleOpenDocChecklist('health', 'new_policy')}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenSos={() => setSosModalOpen(true)}
        onOpenCompare={() => setCompareModalOpen(true)}
        onOpenReminder={() => setReminderModalOpen(true)}
      />

      {/* Main Content View Container */}
      <main className="flex-1">
        
        {/* Page 1: Home Overview */}
        {activeSection === 'home' && (
          <>
            <Hero
              onOpenQuoteModal={() => handleOpenQuoteModal()}
              onOpenChecklistModal={() => handleOpenDocChecklist('motor', 'new_policy')}
              onNavigate={handleNavigate}
            />
            <SectionDivider icon="sparkles" label="Interactive Policy & Document Wizard" />
            <PolicyFlowWizard
              onOpenQuoteModal={(cat?: string) => handleOpenQuoteModal(cat)}
              onNavigate={handleNavigate}
            />
            <SectionDivider icon="award" label="25+ Years Legacy & Trust Pillars" />
            <TrustStats />
            <SectionDivider icon="sparkles" label="Insurance Sectors & Directory" />
            <HomeQuickDirectory
              onNavigate={handleNavigate}
              onOpenQuoteModal={(cat?: string) => handleOpenQuoteModal(cat)}
            />
            <SectionDivider icon="shield" label="Founder Advisory & Commitment" />
            <AboutSection onOpenQuoteModal={() => handleOpenQuoteModal()} />
          </>
        )}

        {/* Page 1.5: Dedicated Policy & Document Wizard Page */}
        {activeSection === 'policy-wizard' && (
          <PolicyFlowWizard
            onOpenQuoteModal={(cat?: string) => handleOpenQuoteModal(cat)}
            onNavigate={handleNavigate}
          />
        )}

        {/* Page 2: Document Checklist Hub (Forwarded to PolicyFlowWizard) */}
        {activeSection === 'doc-checklist-hub' && (
          <PolicyFlowWizard
            onOpenQuoteModal={(cat?: string) => handleOpenQuoteModal(cat)}
            onNavigate={handleNavigate}
          />
        )}

        {/* Page 3: Insurance Sectors Directory */}
        {activeSection === 'sector-details-view' && (
          <>
            <SectorDetailsView
              initialCategory="motor"
              onOpenChecklist={(cat?: string) => handleOpenDocChecklist(cat || 'motor')}
              onOpenQuoteModal={(cat?: string) => handleOpenQuoteModal(cat)}
            />
            <SectionDivider icon="shield" label="Bidar Cashless Network Garages & Hospitals" />
            <CashlessNetworkFinder />
          </>
        )}

        {/* Page 5: Customer Profile Vault */}
        {activeSection === 'customer-portal' && (
          <CustomerPortal
            onOpenChecklist={() => handleNavigate('doc-checklist-hub')}
            onOpenQuoteModal={() => handleOpenQuoteModal()}
          />
        )}

        {/* Page 6: Claims & Premium Calculator */}
        {activeSection === 'claims-renewals' && (
          <>
            <PremiumCalculator onOpenQuoteModal={(cat: string) => handleOpenQuoteModal(cat)} />
            <SectionDivider icon="award" label="Dedicated Claim Settlement & Renewal Support Desk" />
            <ClaimsRenewalSupport />
          </>
        )}

        {/* Page 7: About, Advisory Process, Partners & FAQs */}
        {activeSection === 'about' && (
          <>
            <AboutSection onOpenQuoteModal={() => handleOpenQuoteModal()} />
            <SectionDivider icon="sparkles" label="Our Structured 4-Step Advisory Process" />
            <AdvisoryProcess onOpenQuoteModal={() => handleOpenQuoteModal()} />
            <SectionDivider icon="shield" label="Trusted Public & Private Insurer Partners" />
            <PartnersSection />
            <SectionDivider icon="star" label="Frequently Asked Questions & Expert Guidance" />
            <FaqSection onOpenQuoteModal={() => handleOpenQuoteModal()} />
          </>
        )}

        {/* Page 8: Contact & Map Location */}
        {activeSection === 'contact' && (
          <ContactSection />
        )}

        {/* Page 9: Executive Admin Portal */}
        {activeSection === 'admin-portal-login' && (
          <AdminPortal />
        )}

      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
      />

      {/* Interactive Quote Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        preselectedCategory={quoteCategory}
      />

      {/* Interactive Document Checklist Modal */}
      <DocumentChecklistModal
        isOpen={docChecklistOpen}
        onClose={() => setDocChecklistOpen(false)}
        defaultCategory={docChecklistCategory}
        defaultPurpose={docChecklistPurpose}
      />

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Emergency SOS Modal */}
      <EmergencySosModal
        isOpen={sosModalOpen}
        onClose={() => setSosModalOpen(false)}
      />

      {/* Side-by-Side Policy Comparison Modal */}
      <PolicyComparisonModal
        isOpen={compareModalOpen}
        onClose={() => setCompareModalOpen(false)}
        onOpenQuoteModal={handleOpenQuoteModal}
      />

      {/* Policy Reminder Modal */}
      <PolicyReminderModal
        isOpen={reminderModalOpen}
        onClose={() => setReminderModalOpen(false)}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        
        {/* Back to Top */}
        {showBackToTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-3.5 rounded-full bg-slate-900 text-amber-400 shadow-2xl hover:bg-slate-800 transition-all border border-amber-500/30"
            title="Back to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Direct Phone Call */}
        <a
          href={`tel:${BUSINESS_INFO.phoneRaw}`}
          className="p-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-2xl transition-transform hover:scale-110 flex items-center justify-center border border-blue-400/40"
          title="Call Kadadi Motors Advisory"
        >
          <PhoneCall className="w-5 h-5" />
        </a>

        {/* Direct WhatsApp Chat */}
        <a
          href={`https://wa.me/91${BUSINESS_INFO.whatsappRaw}?text=Hello%20Chandrakant%20Kadadi%20Sir,%20I%20would%20like%20insurance%20guidance.`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl transition-all hover:scale-105 flex items-center gap-2 font-black text-xs border border-emerald-400/40"
          title="Chat on WhatsApp"
        >
          <MessageSquare className="w-5 h-5 fill-white" />
          <span className="hidden sm:inline">WhatsApp Chandrakant Kadadi</span>
        </a>

      </div>

    </div>
  );
}
