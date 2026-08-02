import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BUSINESS_INFO, INSURANCE_SOLUTIONS } from '../data/insuranceData';
import { Shield, X, CheckCircle2, MessageSquare, Send } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCategory?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  preselectedCategory = ''
}) => {
  const [selectedCategory, setSelectedCategory] = useState(preselectedCategory || 'Health Insurance');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Bidar');
  const [comments, setComments] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedCategory) {
      setSelectedCategory(preselectedCategory);
    }
  }, [preselectedCategory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setPhone('');
    setEmail('');
    setComments('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-modal-title"
        aria-describedby="quote-modal-desc"
        className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 relative"
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          aria-label="Close quote modal"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pb-4 border-b border-slate-100">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-100">
            <Shield className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
            <span>Independent Advisory Service</span>
          </div>
          <h3 id="quote-modal-title" className="text-2xl font-heading font-extrabold text-slate-900">
            Request Policy Advice
          </h3>
          <p id="quote-modal-desc" className="text-xs text-slate-500">
            Compare suitable plans across HDFC ERGO, Tata AIG, Reliance, SBI & top insurers.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="quote-success"
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              className="py-6 text-center space-y-5"
            >
              {/* Animated Glowing Icon Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                className="relative w-16 h-16 mx-auto"
              >
                <motion.div
                  animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.2, 0.6] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                  className="absolute inset-0 rounded-full bg-emerald-500/20 blur-md pointer-events-none"
                />
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-emerald-400 text-white flex items-center justify-center border-2 border-emerald-200 shadow-xl shadow-emerald-500/30">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <h4 className="text-2xl font-heading font-black text-slate-900">
                  Advisory Request Received!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                  Thank you, <strong className="text-slate-900">{fullName}</strong>. Chandrakant Kadadi’s advisory desk will evaluate suitable quotes for <strong>{selectedCategory}</strong> and contact you on <strong>+91 {phone}</strong>.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1"
              >
                <div className="flex justify-between text-slate-500 text-[11px] font-medium">
                  <span>Inquiry ID</span>
                  <span className="font-mono font-bold text-slate-900">KM-Q{Math.floor(1000 + Math.random() * 9000)}</span>
                </div>
                <div className="flex justify-between text-slate-500 text-[11px] font-medium">
                  <span>Selected Category</span>
                  <span className="font-bold text-blue-700">{selectedCategory}</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-2 flex flex-col gap-2"
              >
                <button
                  onClick={handleReset}
                  className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Done / Close Window
                </button>
                <a
                  href={`https://wa.me/91${BUSINESS_INFO.whatsappRaw}?text=Hi%20Kadadi%20Motors,%20I%20just%20submitted%20a%20request%20for%20${encodeURIComponent(selectedCategory)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-xs font-bold text-emerald-700 py-2 hover:underline rounded-lg"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                  <span>Follow up immediately on WhatsApp</span>
                </a>
              </motion.div>
            </motion.div>
          ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-left">
            
            <div>
              <label htmlFor="modal-category" className="block text-xs font-bold text-slate-800 mb-1">
                Insurance Category Required *
              </label>
              <select
                id="modal-category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                {INSURANCE_SOLUTIONS.map((sol) => (
                  <option key={sol.id} value={sol.title}>
                    {sol.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="modal-fullname" className="block text-xs font-bold text-slate-800 mb-1">
                Your Full Name *
              </label>
              <input
                id="modal-fullname"
                type="text"
                required
                aria-required="true"
                placeholder="e.g. Chandrashekar Patil"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="modal-phone" className="block text-xs font-bold text-slate-800 mb-1">
                  Mobile Number *
                </label>
                <input
                  id="modal-phone"
                  type="tel"
                  required
                  aria-required="true"
                  placeholder="e.g. 9448114647"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                />
              </div>

              <div>
                <label htmlFor="modal-city" className="block text-xs font-bold text-slate-800 mb-1">
                  City / Location
                </label>
                <input
                  id="modal-city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label htmlFor="modal-email" className="block text-xs font-bold text-slate-800 mb-1">
                Email Address (Optional)
              </label>
              <input
                id="modal-email"
                type="email"
                placeholder="e.g. user@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              />
            </div>

            <div>
              <label htmlFor="modal-comments" className="block text-xs font-bold text-slate-800 mb-1">
                Vehicle or Coverage Details
              </label>
              <textarea
                id="modal-comments"
                rows={2}
                placeholder="Mention vehicle model, registration number, sum insured, or existing expiry date..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
              <span>Get Free Multi-Insurer Advice</span>
            </button>

            <div className="pt-2 text-center text-[11px] text-slate-500">
              Or call our desk directly at <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="font-bold text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm">{BUSINESS_INFO.phoneDisplay}</a>
            </div>

          </form>
        )}
        </AnimatePresence>

      </div>
    </div>
  );
};

