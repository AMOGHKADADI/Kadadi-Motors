import React, { useState } from 'react';
import { FAQ_ITEMS, BUSINESS_INFO } from '../data/insuranceData';
import { HelpCircle, ChevronDown, MessageSquare, ShieldCheck, Search } from 'lucide-react';

interface FaqSectionProps {
  onOpenQuoteModal?: (preselectedCategory?: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenQuoteModal }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqCategory, setFaqCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesCategory = faqCategory === 'all' || item.category === faqCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Construct JSON-LD Structured Data object for FAQPage
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer,
      },
    })),
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      
      {/* Inject JSON-LD Structured Data for Search Engine FAQ Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-blue-800 bg-blue-100/80 border border-blue-200 uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-blue-700" />
            <span>Structured Guidance & FAQs</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions About Our Advisory Services
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Clear answers regarding local policy comparisons, offline claim support in Bidar, and why independent advisory protects you better than automated web portals.
          </p>
        </div>

        {/* Controls: Search and Categories */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'general', label: 'General & Office' },
              { id: 'comparison', label: 'Online vs Advisor' },
              { id: 'claims', label: 'Claims' },
              { id: 'renewals', label: 'Renewals' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFaqCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  faqCategory === cat.id
                    ? 'bg-blue-700 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* FAQ Accordion List */}
        <div className="mt-8 space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-sm">
              No matching questions found for "{searchTerm}".
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-blue-50/40 border-blue-300 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-heading font-bold text-slate-900 text-base sm:text-lg pr-2 leading-snug">
                      {faq.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'bg-blue-700 text-white rotate-180' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 text-slate-700 text-sm sm:text-base leading-relaxed border-t border-blue-100/60 mt-1">
                      <p className="pt-3">{faq.answer}</p>

                      <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                        <span className="flex items-center gap-1 font-semibold text-blue-800">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          Verified Kadadi Motors Advisory Policy
                        </span>
                        <span>Bidar, Karnataka</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* CTA Footer inside FAQ */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-heading font-bold">Have a Specific Question About Your Current Policy?</h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Speak directly with Chandrakant Kadadi or visit our Udgir Road office in Bidar.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {onOpenQuoteModal && (
              <button
                onClick={() => onOpenQuoteModal()}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all"
              >
                Request Advice
              </button>
            )}
            <a
              href={`https://wa.me/91${BUSINESS_INFO.whatsappRaw}?text=Hi%20Kadadi%20Motors,%20I%20have%20a%20question%20about%20my%20insurance.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
