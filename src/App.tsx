import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
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
import { InsuranceSolutions } from './components/InsuranceSolutions';
import { TestimonialSection } from './components/TestimonialSection';
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
import { NewsletterWelcomeModal } from './components/NewsletterWelcomeModal';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { BUSINESS_INFO } from './data/insuranceData';
import { MessageSquare, PhoneCall, ArrowUp } from 'lucide-react';

const SECTION_META: Record<string, { title: string; description: string; keywords: string }> = {
  home: {
    title: "Kadadi Insurance Advisory | Bidar's Trusted Insurance & Motor Desk",
    description: "Chandrakant Kadadi brings 25+ years of insurance expertise in Bidar for Motor, Health, Commercial, Life, & Claims settlement assistance.",
    keywords: "Insurance Bidar, Motor Insurance Bidar, Health Insurance, Claim Support, Chandrakant Kadadi, Kadadi Motors",
  },
  'policy-wizard': {
    title: "Policy & Document Checklist Wizard | Kadadi Insurance Bidar",
    description: "Interactive document checklist & policy wizard for new insurance purchases, motor renewals, and health claims in Bidar.",
    keywords: "Insurance Documents Bidar, Motor Renewal Documents, Health Insurance Checklist",
  },
  'doc-checklist-hub': {
    title: "Policy & Document Checklist Wizard | Kadadi Insurance Bidar",
    description: "Interactive document checklist & policy wizard for new insurance purchases, motor renewals, and health claims in Bidar.",
    keywords: "Insurance Documents Bidar, Motor Renewal Documents, Health Insurance Checklist",
  },
  'sector-details-view': {
    title: "Motor, Health & Commercial Insurance Solutions | Kadadi Motors Bidar",
    description: "Comprehensive insurance options including Car, Two-Wheeler, Health cashless networks, and Commercial fleet coverage in Bidar.",
    keywords: "Car Insurance Bidar, Bike Insurance, Health Cashless Network, Commercial Fleet Insurance",
  },
  'customer-portal': {
    title: "Customer Policy Vault | Kadadi Insurance Advisory Bidar",
    description: "Access your active insurance policies, renewal dates, and claim document checklists securely.",
    keywords: "Policy Vault, Insurance Renewal Portal, Customer Desk Bidar",
  },
  'claims-renewals': {
    title: "Claims & Premium Calculator | Dedicated Claim Desk Bidar",
    description: "Estimate policy premiums and get 24/7 dedicated claim settlement and motor/health policy renewal support in Bidar.",
    keywords: "Insurance Claims Desk Bidar, Premium Calculator, Claim Settlement Support",
  },
  about: {
    title: "About Chandrakant Kadadi & Advisory Process | Kadadi Motors",
    description: "Learn about 25+ years of trusted insurance advisory, our 4-step policy guidance process, partner insurers, and FAQs in Bidar.",
    keywords: "About Chandrakant Kadadi, Insurance Advisor Bidar, Partner Insurers, Insurance FAQs",
  },
  contact: {
    title: "Contact Kadadi Insurance Advisory | Udgir Road, Bidar",
    description: "Visit our physical office beside MAX on Udgir Road in Bidar or contact Chandrakant Kadadi directly via phone or WhatsApp.",
    keywords: "Contact Kadadi Motors, Insurance Office Bidar, Udgir Road Insurance",
  },
  'admin-portal-login': {
    title: "Executive Admin Portal | Kadadi Insurance Advisory",
    description: "Secure executive management desk for Kadadi Motors staff.",
    keywords: "Admin Login, Kadadi Motors Internal",
  },
};

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
  const [newsletterModalOpen, setNewsletterModalOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterTopic, setNewsletterTopic] = useState('All Regulatory & Market Alerts');

  const handleOpenNewsletterWelcome = (email: string, topic?: string) => {
    setNewsletterEmail(email);
    if (topic) setNewsletterTopic(topic);
    setNewsletterModalOpen(true);
  };

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

  const currentMeta = SECTION_META[activeSection] || SECTION_META.home;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col relative selection:bg-amber-400 selection:text-slate-950">
      
      {/* Dynamic SEO Meta Tags */}
      <Helmet>
        <title>{currentMeta.title}</title>
        <meta name="description" content={currentMeta.description} />
        <meta name="keywords" content={currentMeta.keywords} />
        <meta property="og:title" content={currentMeta.title} />
        <meta property="og:description" content={currentMeta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Kadadi Motors & Insurance Advisory" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={currentMeta.title} />
        <meta name="twitter:description" content={currentMeta.description} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialService",
            "name": "Kadadi Motors & Insurance Advisory",
            "image": "https://kadadi-motors.app/assets/images/kadadi_motors_logo.jpg",
            "description": "Independent insurance advisory in Bidar managed by Chandrakant Kadadi for Motor, Health, Commercial Fleet, Property and Life insurance.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Ground Floor, Rishikesh Complex, Udgir Road, Beside MAX",
              "addressLocality": "Bidar",
              "addressRegion": "Karnataka",
              "postalCode": "585401",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 17.9145,
              "longitude": 77.5186
            },
            "url": "https://kadadi-motors.app",
            "telephone": "+919448114647",
            "priceRange": "₹₹",
            "openingHours": "Mo-Sa 10:00-21:00",
            "founder": {
              "@type": "Person",
              "name": "Chandrakant Kadadi"
            }
          })}
        </script>
      </Helmet>

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
        
        {/* Page 1: Home Overview Journey */}
        {activeSection === 'home' && (
          <>
            {/* 1. Hero */}
            <Hero
              onOpenQuoteModal={() => handleOpenQuoteModal()}
              onOpenChecklistModal={() => handleOpenDocChecklist('motor', 'new_policy')}
              onNavigate={handleNavigate}
            />

            {/* 2. Trust Pillars & Heritage */}
            <TrustStats />

            {/* 3. The Advisory Process */}
            <AdvisoryProcess onOpenQuoteModal={() => handleOpenQuoteModal()} />

            {/* 4. Core Insurance Solutions & Products */}
            <InsuranceSolutions
              onSelectSolution={() => handleNavigate('sector-details-view')}
              onOpenQuoteModal={(cat?: string) => handleOpenQuoteModal(cat)}
              onOpenDocChecklist={(cat?: string, purpose?: string) => handleOpenDocChecklist(cat, purpose)}
            />

            {/* 5. Partner Insurers Network */}
            <PartnersSection />

            {/* 6. Verified Customer Feedback & Local Reputation */}
            <TestimonialSection />

            {/* 7. Frequently Asked Questions */}
            <FaqSection onOpenQuoteModal={() => handleOpenQuoteModal()} />

            {/* 8. Quick Multi-Page Navigation Hub */}
            <HomeQuickDirectory
              onNavigate={handleNavigate}
              onOpenQuoteModal={(cat?: string) => handleOpenQuoteModal(cat)}
            />

            {/* 9. Contact & Office Location */}
            <ContactSection />
          </>
        )}

        {/* Page 2: Policy & Document Wizard */}
        {(activeSection === 'policy-wizard' || activeSection === 'doc-checklist-hub') && (
          <PolicyFlowWizard
            onOpenQuoteModal={(cat?: string) => handleOpenQuoteModal(cat)}
            onNavigate={handleNavigate}
          />
        )}

        {/* Page 3: Dedicated Insurance Sectors Directory */}
        {activeSection === 'sector-details-view' && (
          <>
            <InsuranceSolutions
              onSelectSolution={() => handleNavigate('sector-details-view')}
              onOpenQuoteModal={(cat?: string) => handleOpenQuoteModal(cat)}
              onOpenDocChecklist={(cat?: string, purpose?: string) => handleOpenDocChecklist(cat, purpose)}
            />
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
        onOpenNewsletterWelcome={handleOpenNewsletterWelcome}
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

      {/* Newsletter Goated Welcome & Weekly Edition Modal */}
      <NewsletterWelcomeModal
        isOpen={newsletterModalOpen}
        onClose={() => setNewsletterModalOpen(false)}
        subscriberEmail={newsletterEmail}
        preferenceTopic={newsletterTopic}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
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
