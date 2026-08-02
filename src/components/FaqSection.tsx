import React, { useState } from 'react';
import { FAQ_ITEMS, BUSINESS_INFO } from '../data/insuranceData';
import { HelpCircle, ChevronDown, MessageSquare, ShieldCheck, Search, Sparkles, HelpCircle as QuestionIcon, Clock, PhoneCall } from 'lucide-react';

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
    <section id="faq" className="py-20 sm:py-32 bg-black text-white relative overflow-hidden border-b border-white/10">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Module Header */}
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-red-400 bg-red-950/60 border border-red-500/30 backdrop-blur-xl shadow-lg">
            <QuestionIcon className="w-3.5 h-3.5 text-red-400" />
            <span>Insurance Knowledge Desk • Bidar</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black text-white tracking-tight leading-none">
            Frequently Asked Questions
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Transparent guidance regarding No Claim Bonus (NCB) transfers, room rent capping, cashless garage networks, and offline claim assistance in Bidar.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white/5 backdrop-blur-2xl p-5 rounded-3xl border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] shadow-2xl">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search insurance questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 text-xs sm:text-sm bg-black/80 text-white placeholder-slate-500 border border-white/20 rounded-2xl focus:outline-none focus:border-blue-400 transition-all font-mono"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
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
                className={`px-4 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                  faqCategory === cat.id
                    ? 'bg-white text-black shadow-lg font-black scale-105'
                    : 'bg-black/60 text-slate-300 hover:text-white border border-white/10 hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Balanced 2-Column FAQ Grid Layout */}
        {filteredFaqs.length === 0 ? (
          <div className="p-12 text-center text-slate-400 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 text-sm">
            No matching insurance questions found for "{searchTerm}".
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-3xl border transition-all duration-300 overflow-hidden backdrop-blur-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] shadow-xl ${
                    isOpen
                      ? 'bg-white/10 border-blue-500/50 shadow-blue-500/10'
                      : 'bg-white/5 border-white/10 hover:border-white/25'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full p-6 sm:p-7 text-left flex items-start justify-between gap-4 focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-heading font-black text-white text-base sm:text-lg pr-2 leading-snug">
                      {faq.question}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen ? 'bg-blue-600 text-white rotate-180 shadow-lg shadow-blue-600/30' : 'bg-white/10 text-slate-300 border border-white/10'
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-7 sm:px-7 sm:pb-7 pt-0 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-white/10 mt-1 animate-fadeIn">
                      <p className="pt-4 text-slate-200 font-normal">{faq.answer}</p>

                      <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 font-mono">
                        <span className="flex items-center gap-1.5 font-bold text-blue-400">
                          <ShieldCheck className="w-4 h-4 text-blue-400" />
                          <span>Verified Advisory Guidance</span>
                        </span>
                        <span className="text-slate-400">Bidar Desk • Udgir Road</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* CTA Glassmorphic Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-950/60 via-black to-red-950/60 border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] backdrop-blur-2xl text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono font-bold text-blue-400">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Direct Advisor Response • Mon - Sat (9 AM - 8 PM)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-black text-white">
              Have a Specific Policy Question?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Consult directly with Chandrakant Kadadi or visit our physical office at Udgir Road beside MAX in Bidar.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            {onOpenQuoteModal && (
              <button
                onClick={() => onOpenQuoteModal()}
                className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-xl shadow-blue-600/30 transition-all cursor-pointer"
              >
                Request Free Advice
              </button>
            )}
            <a
              href={`https://wa.me/91${BUSINESS_INFO.whatsappRaw}?text=Hi%20Chandrakant%20Kadadi%20Sir,%20I%20have%20a%20question%20about%20my%20insurance.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md"
            >
              <MessageSquare className="w-4 h-4 text-red-400" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

