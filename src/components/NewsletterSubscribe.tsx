import React, { useState, useEffect, useRef } from 'react';
import {
  Mail,
  Send,
  Check,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  BellRing,
  ExternalLink,
  Sparkles,
  Zap,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AppStore } from '../lib/store';
import { InsuranceValidators, ValidationResult } from '../lib/validators';
import { getGlowingRingClass, FocusRingState } from '../lib/designSystem';
import { auditLogger } from '../lib/auditLogger';

interface NewsletterSubscribeProps {
  onOpenNewsletterWelcome?: (email: string, category: string) => void;
}

const COMMON_DOMAINS = ['gmail.com', 'yahoo.com', 'outlook.com', 'bidar.org', 'rediffmail.com'];

export const NewsletterSubscribe: React.FC<NewsletterSubscribeProps> = ({
  onOpenNewsletterWelcome,
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All Regulatory & Market Alerts');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    isValid: false,
    score: 0,
    fieldState: 'idle',
  });
  const [formStatus, setFormStatus] = useState<{
    type: 'idle' | 'error' | 'success';
    message: string;
  }>({ type: 'idle', message: '' });

  const [lastSubscribedEmail, setLastSubscribedEmail] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const topicsList = [
    'All Regulatory & Market Alerts',
    'Motor & Transport Tariff',
    'Health & Tax Exemption',
    'Commercial Fleet Guidance',
  ];

  // Real-time client-side email validation engine trigger
  useEffect(() => {
    if (!emailInput.trim()) {
      setValidationResult({
        isValid: false,
        score: 0,
        fieldState: 'idle',
      });
      if (formStatus.type === 'error') {
        setFormStatus({ type: 'idle', message: '' });
      }
      return;
    }

    const res = InsuranceValidators.validateEmail(emailInput);
    setValidationResult(res);

    if (res.isValid) {
      setFormStatus({ type: 'idle', message: '' });
    }
  }, [emailInput]);

  // Compute glowing ring focus ring state
  const getComputedRingState = (): FocusRingState => {
    if (formStatus.type === 'error' || validationResult.fieldState === 'error') {
      return 'error';
    }
    if (validationResult.fieldState === 'success') {
      return 'success';
    }
    if (isFocused) {
      return 'focus';
    }
    return 'idle';
  };

  const ringState = getComputedRingState();
  const glowingClass = getGlowingRingClass(ringState);

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ type: 'idle', message: '' });

    const trimmedEmail = emailInput.trim();
    const validation = InsuranceValidators.validateEmail(trimmedEmail);

    if (!validation.isValid) {
      setFormStatus({
        type: 'error',
        message: validation.errorMessage || 'Please enter a valid email address.',
      });
      auditLogger.log('VALIDATION', 'Newsletter email validation failed', { email: trimmedEmail, error: validation.errorMessage }, 'warn');
      return;
    }

    setIsSubmitting(true);
    auditLogger.log('INQUIRY', 'Newsletter subscription submitted', { email: trimmedEmail, topic: selectedTopic }, 'info');

    setTimeout(() => {
      const res = AppStore.subscribeNewsletter(trimmedEmail, selectedTopic);
      setIsSubmitting(false);

      if (res.success) {
        setFormStatus({
          type: 'success',
          message: res.message,
        });
        setLastSubscribedEmail(trimmedEmail);

        if (onOpenNewsletterWelcome) {
          onOpenNewsletterWelcome(trimmedEmail, selectedTopic);
        }
        setEmailInput('');
        setValidationResult({ isValid: false, score: 0, fieldState: 'idle' });
      } else {
        setFormStatus({
          type: 'error',
          message: res.message,
        });
      }
    }, 550);
  };

  // Domain auto-suggest helper logic
  const getDomainSuggestion = (): string | null => {
    if (!emailInput.includes('@')) return null;
    const [user, domainPart] = emailInput.split('@');
    if (!user || domainPart.includes('.')) return null;
    const match = COMMON_DOMAINS.find((d) => d.startsWith(domainPart));
    if (match && match !== domainPart) {
      return `${user}@${match}`;
    }
    return null;
  };

  const domainSuggestion = getDomainSuggestion();

  return (
    <div className="bg-black border-b border-white/10 py-10 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Micro-Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl bg-slate-950/90 backdrop-blur-2xl p-6 sm:p-10 border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          {/* Ambient Glow Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Info & Topic Preference Selector */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md shadow-sm">
                  <BellRing className="w-3.5 h-3.5 text-blue-400 animate-bounce" />
                  <span>IRDAI & Market Bulletin</span>
                </span>
                <span className="text-[11px] text-amber-400 font-mono font-bold flex items-center gap-1.5 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                  <Zap className="w-3 h-3 text-amber-400" />
                  Direct Desk Channel
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-white tracking-tight leading-snug">
                Insurance Regulatory Updates & Weekly Market Alerts
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                Subscribe to receive official IRDAI regulatory directives, motor third-party tariff revisions, tax exemption updates, and claim settlement guidelines curated directly by Chandrakant Kadadi.
              </p>

              {/* Preference Pills */}
              <div className="pt-2 space-y-2">
                <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Select Preferred Topic Stream:
                </label>
                <div className="flex flex-wrap gap-2">
                  {topicsList.map((topic) => {
                    const isSelected = selectedTopic === topic;
                    return (
                      <motion.button
                        key={topic}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedTopic(topic);
                          auditLogger.log('SYSTEM', 'Topic preference selected', { topic });
                        }}
                        className={`px-3.5 py-2.5 min-h-[44px] inline-flex items-center justify-center rounded-xl text-xs font-semibold transition-all cursor-pointer gap-2 ${
                          isSelected
                            ? 'bg-white text-slate-950 font-black shadow-lg shadow-white/10 ring-2 ring-white/80'
                            : 'bg-slate-900/80 text-slate-300 hover:text-white border border-white/10 hover:bg-slate-800'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 font-bold" />}
                        <span>{topic}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Form & Interactive Validation Feedback */}
            <div className="lg:col-span-6">
              <form
                onSubmit={validateAndSubmit}
                noValidate
                className="space-y-4 bg-slate-900/90 p-5 sm:p-7 rounded-2xl border border-white/15 backdrop-blur-xl shadow-2xl relative"
              >
                <div className="flex items-center justify-between text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                  <label htmlFor="newsletter-email-input" className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span>Enter Email Address for Updates</span>
                  </label>
                  <span className="text-slate-400 text-[10px] bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    Free • Cancel Anytime
                  </span>
                </div>

                {/* Input Container with Real-Time Glowing Ring Visual Feedback */}
                <div className="relative space-y-1.5">
                  <div className="relative">
                    <input
                      ref={inputRef}
                      id="newsletter-email-input"
                      type="email"
                      value={emailInput}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      onChange={(e) => {
                        setEmailInput(e.target.value);
                      }}
                      placeholder="e.g., name@example.com"
                      className={`w-full pl-11 pr-28 py-3.5 rounded-xl text-xs sm:text-sm font-mono transition-all duration-300 ${glowingClass}`}
                      disabled={isSubmitting}
                      aria-invalid={validationResult.fieldState === 'error'}
                      aria-describedby="email-validation-feedback"
                    />

                    {/* Status Badge Icon inside Input */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
                      {validationResult.fieldState === 'success' && (
                        <span className="flex items-center gap-1 text-emerald-400 text-[11px] font-mono font-bold bg-emerald-500/20 px-2 py-1 rounded-md border border-emerald-500/40 animate-fadeIn">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Valid</span>
                        </span>
                      )}

                      {validationResult.fieldState === 'error' && (
                        <span className="flex items-center gap-1 text-rose-400 text-[11px] font-mono font-bold bg-rose-500/20 px-2 py-1 rounded-md border border-rose-500/40 animate-fadeIn">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Invalid</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Domain Suggestion Auto-Pill */}
                  {domainSuggestion && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[11px] text-blue-300 font-mono flex items-center gap-2 pt-0.5"
                    >
                      <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                      <span>Did you mean:</span>
                      <button
                        type="button"
                        onClick={() => setEmailInput(domainSuggestion)}
                        className="px-2 py-0.5 rounded bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 border border-blue-400/30 font-bold underline cursor-pointer"
                      >
                        {domainSuggestion}
                      </button>
                    </motion.div>
                  )}
                </div>

                {/* Submit CTA Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-black text-xs sm:text-sm shadow-xl shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer border border-blue-400/30"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400 animate-spin" />
                      <span>Dispatching Registration...</span>
                    </span>
                  ) : (
                    <>
                      <span>Subscribe Free to Regulatory Stream</span>
                      <Send className="w-4 h-4 text-white" />
                    </>
                  )}
                </motion.button>

                {/* Real-time Validation Error Alert */}
                <AnimatePresence>
                  {formStatus.type === 'error' && (
                    <motion.div
                      id="email-validation-feedback"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-200 text-xs font-semibold flex items-start gap-2.5 shadow-lg"
                    >
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <p className="font-bold text-rose-300">Validation Notice</p>
                        <p>{formStatus.message}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Persistent Success Feedback */}
                <AnimatePresence>
                  {formStatus.type === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-white text-xs font-medium space-y-2 shadow-2xl backdrop-blur-md"
                    >
                      <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        <span>{formStatus.message}</span>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-emerald-500/30 text-[11px]">
                        <span className="text-emerald-200 font-mono">
                          Active Subscriber: <strong>{lastSubscribedEmail}</strong>
                        </span>
                        {onOpenNewsletterWelcome && lastSubscribedEmail && (
                          <button
                            type="button"
                            onClick={() => onOpenNewsletterWelcome(lastSubscribedEmail, selectedTopic)}
                            className="text-blue-300 hover:text-white font-bold underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>Re-open Welcome Bulletin</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom Trust Note */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1 border-t border-white/5">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>100% Data Privacy • Direct Advisory Guarantee</span>
                  </span>
                  <span className="text-blue-400 font-bold hidden sm:inline">
                    Stream: {selectedTopic}
                  </span>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
