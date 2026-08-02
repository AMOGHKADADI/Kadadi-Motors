import React, { useState } from 'react';
import { Mail, Send, Check, AlertCircle, CheckCircle2, ShieldCheck, BellRing, Sparkles, ExternalLink } from 'lucide-react';
import { AppStore } from '../lib/store';

interface NewsletterSubscribeProps {
  onOpenNewsletterWelcome?: (email: string, category: string) => void;
}

export const NewsletterSubscribe: React.FC<NewsletterSubscribeProps> = ({
  onOpenNewsletterWelcome
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All Regulatory & Market Alerts');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: 'idle' | 'error' | 'success';
    message: string;
  }>({ type: 'idle', message: '' });
  
  const [lastSubscribedEmail, setLastSubscribedEmail] = useState<string | null>(null);

  const topicsList = [
    'All Regulatory & Market Alerts',
    'Motor & Transport Tariff',
    'Health & Tax Exemption',
    'Commercial Fleet Guidance'
  ];

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ type: 'idle', message: '' });

    const trimmedEmail = emailInput.trim();

    if (!trimmedEmail) {
      setFormStatus({
        type: 'error',
        message: 'Please enter your email address to register for IRDAI updates.'
      });
      return;
    }

    if (!trimmedEmail.includes('@')) {
      setFormStatus({
        type: 'error',
        message: 'Invalid email format: Missing "@" symbol (e.g., name@example.com).'
      });
      return;
    }

    const parts = trimmedEmail.split('@');
    if (parts.length > 2) {
      setFormStatus({
        type: 'error',
        message: 'Invalid email format: Email address cannot contain multiple "@" symbols.'
      });
      return;
    }

    const [username, domain] = parts;

    if (!username) {
      setFormStatus({
        type: 'error',
        message: 'Invalid email format: Missing username prefix before "@" (e.g., name@example.com).'
      });
      return;
    }

    if (!domain) {
      setFormStatus({
        type: 'error',
        message: 'Invalid email format: Missing domain name after "@" (e.g., name@example.com).'
      });
      return;
    }

    if (!domain.includes('.')) {
      setFormStatus({
        type: 'error',
        message: 'Invalid email format: Missing top-level domain extension like .com, .in, or .org.'
      });
      return;
    }

    const domainParts = domain.split('.');
    const tld = domainParts[domainParts.length - 1];
    if (!tld || tld.length < 2) {
      setFormStatus({
        type: 'error',
        message: 'Invalid email format: Domain extension must be at least 2 characters (e.g., .com, .in).'
      });
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmedEmail)) {
      setFormStatus({
        type: 'error',
        message: 'Invalid email format: Contains invalid characters. Please enter a valid email address.'
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const res = AppStore.subscribeNewsletter(trimmedEmail, selectedTopic);
      setIsSubmitting(false);

      if (res.success) {
        setFormStatus({
          type: 'success',
          message: res.message
        });
        setLastSubscribedEmail(trimmedEmail);

        if (onOpenNewsletterWelcome) {
          onOpenNewsletterWelcome(trimmedEmail, selectedTopic);
        }
        setEmailInput('');
      } else {
        setFormStatus({
          type: 'error',
          message: res.message
        });
      }
    }, 600);
  };

  return (
    <div className="bg-black border-b border-white/10 py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-white/5 backdrop-blur-2xl p-6 sm:p-10 border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] shadow-2xl overflow-hidden">
          
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Info & Preference Selector */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-xs">
                  <BellRing className="w-3.5 h-3.5 text-blue-400" />
                  <span>IRDAI & Market Bulletin</span>
                </span>
                <span className="text-[11px] text-red-400 font-mono font-bold flex items-center gap-1">
                  • Direct Advisory Channel
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading font-black text-white tracking-tight leading-snug">
                Insurance Regulatory Updates & Weekly Market Alerts
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                Subscribe to receive official IRDAI regulatory directives, motor third-party tariff revisions, tax exemption updates, and claim settlement guidelines curated directly by Chandrakant Kadadi.
              </p>

              {/* Preference Pills */}
              <div className="pt-2 space-y-1.5">
                <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Select Preferred Topic Stream:
                </label>
                <div className="flex flex-wrap gap-2">
                  {topicsList.map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => setSelectedTopic(topic)}
                      className={`px-3.5 py-2 min-h-[44px] inline-flex items-center justify-center rounded-xl text-xs font-semibold transition-all cursor-pointer gap-1.5 ${
                        selectedTopic === topic
                          ? 'bg-white text-black font-extrabold shadow-md'
                          : 'bg-black/60 text-slate-300 hover:text-white border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {selectedTopic === topic && <Check className="w-3.5 h-3.5 text-blue-600" />}
                      <span>{topic}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Form & Interactive Feedback */}
            <div className="lg:col-span-6">
              <form onSubmit={validateAndSubmit} noValidate className="space-y-4 bg-black/40 p-5 sm:p-6 rounded-2xl border border-white/10 backdrop-blur-md">
                <label htmlFor="newsletter-email-input" className="block text-xs font-mono font-bold text-blue-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Enter Email Address for Updates</span>
                  <span className="text-slate-400 text-[10px]">Free • Cancel Anytime</span>
                </label>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Mail className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
                      formStatus.type === 'error' ? 'text-red-400' : 'text-slate-400'
                    }`} aria-hidden="true" />
                    <input
                      id="newsletter-email-input"
                      type="email"
                      value={emailInput}
                      onChange={(e) => {
                        setEmailInput(e.target.value);
                        if (formStatus.type === 'error') {
                          setFormStatus({ type: 'idle', message: '' });
                        }
                      }}
                      placeholder="e.g., name@example.com"
                      className={`w-full pl-10 pr-4 py-3.5 rounded-xl bg-black text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none transition-all font-mono ${
                        formStatus.type === 'error'
                          ? 'border border-red-500 bg-red-950/20 text-red-100 placeholder-red-300/40'
                          : 'border border-white/20 focus:border-blue-400'
                      }`}
                      disabled={isSubmitting}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3.5 min-h-[44px] rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-black text-xs sm:text-sm shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Dispatching...</span>
                    ) : (
                      <>
                        <span>Subscribe Free</span>
                        <Send className="w-4 h-4 text-white" />
                      </>
                    )}
                  </button>
                </div>

                {/* Validation Error Alert */}
                {formStatus.type === 'error' && (
                  <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/40 text-red-200 text-xs font-semibold flex items-center gap-2.5 animate-fadeIn">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{formStatus.message}</span>
                  </div>
                )}

                {/* Persistent Success Feedback Box */}
                {formStatus.type === 'success' && (
                  <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-white text-xs font-medium space-y-2 animate-fadeIn shadow-xl">
                    <div className="flex items-center gap-2 text-emerald-300 font-bold">
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
                  </div>
                )}

                {/* Bottom Trust Note */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    <span>100% Privacy • No Spam Guarantee</span>
                  </span>
                  <span className="text-blue-400 font-bold hidden sm:inline">
                    Stream: {selectedTopic}
                  </span>
                </div>
              </form>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
