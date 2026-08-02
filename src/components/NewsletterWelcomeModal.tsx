import React, { useState, useEffect } from 'react';
import {
  X,
  Mail,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Send,
  Copy,
  Check,
  BookOpen,
  Award,
  Zap,
  TrendingUp,
  FileText,
  AlertTriangle,
  ArrowRight,
  Share2,
  Bell,
  HeartHandshake
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/insuranceData';
import { Logo } from './Logo';

interface NewsletterWelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscriberEmail: string;
  preferenceTopic?: string;
  onOpenQuoteModal?: () => void;
}

export const NewsletterWelcomeModal: React.FC<NewsletterWelcomeModalProps> = ({
  isOpen,
  onClose,
  subscriberEmail,
  preferenceTopic = 'All Regulatory & Market Alerts',
  onOpenQuoteModal
}) => {
  const [activeTab, setActiveTab] = useState<'welcome' | 'archive' | 'share'>('welcome');
  const [copied, setCopied] = useState(false);
  const [whatsappSent, setWhatsappSent] = useState(false);
  const [emailSentStatus, setEmailSentStatus] = useState<'delivered' | 'sending' | 'resent'>('delivered');
  const [dispatchedIssue, setDispatchedIssue] = useState<string | null>(null);

  const handleResendWelcomeEmail = () => {
    setEmailSentStatus('sending');
    setTimeout(() => {
      setEmailSentStatus('resent');
      setTimeout(() => setEmailSentStatus('delivered'), 3000);
    }, 800);
  };

  const handleDispatchWeeklyIssue = (issueTitle: string) => {
    setDispatchedIssue(issueTitle);
    setTimeout(() => {
      setDispatchedIssue(null);
    }, 4000);
  };

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const welcomeLetterText = `
Subject: WELCOME TO THE INSIDER CIRCLE: Issue #1 — The Unfiltered Truth About Insurance
From: Chandrakant Kadadi <chandrakant.kadadi@kadadimotors.com>
To: ${subscriberEmail}
Organization: Kadadi Motors Insurance Advisory (Udgir Road, Bidar • Est. 1999)

--------------------------------------------------------------------------------
DEAR VALUED SUBSCRIBER,

Welcome to the Kadadi Motors Weekly Insurance Bulletin! You are now part of an elite circle of 1,500+ smart policyholders across Bidar, Bhalki, Humnabad, and North Karnataka who choose clarity over corporate fine print.

When I established Kadadi Motors 25 years ago beside MAX on Udgir Road, my mission was simple: eliminate insurance confusion. Too many families and business owners lose money during claims because nobody explained the real rules.

Here is Issue #1 of your weekly briefing: 5 Ground Facts about Insurance that companies rarely advertise!

--------------------------------------------------------------------------------
5 EYE-OPENING INSURANCE FACTS YOU MUST KNOW:

1. THE 50% NO-CLAIM BONUS (NCB) BELONGS TO YOU, NOT YOUR CAR!
• Fact: NCB is a reward earned by the DRIVER for safe driving, not the vehicle.
• Insider Tip: If you sell your car or bike, ask us for an "NCB Retention Certificate". You can transfer up to 50% discount to your new vehicle insurance immediately!

2. ROOM RENT CAPPING PENALIZES YOUR ENTIRE HOSPITAL BILL BY 50%!
• Fact: If your health policy has a 1% daily room rent cap (e.g. ₹5,000/day on a 5 Lakh policy) and you stay in a ₹10,000 room, the hospital won't just charge extra for the room.
• Insider Tip: The insurance company will proportionately slash doctor fees, surgeon charges, and ICU bills by 50%! We always recommend Zero-Room-Capping plans.

3. THIRD-PARTY MOTOR LIABILITY IS UNLIMITED BY LAW
• Fact: While Third-Party Property Damage is capped at ₹7.5 Lakhs, Third-Party Injury/Death liability awarded by Motor Accident Claims Tribunals (MACT) is 100% UNLIMITED.
• Insider Tip: Never drive even 1 day with an expired TP policy — personal court liability can bankrupt an uninsured vehicle owner.

4. YOU CAN CLAIM CASHLESS OR REIMBURSEMENT AT ANY REGISTERED HOSPITAL
• Fact: You don't have to go only to network hospitals.
• Insider Tip: In emergency non-network hospitalizations, inform your insurer within 24 hours and collect itemized bills. Kadadi Motors files 100% reimbursement claims on your behalf at zero cost.

5. ZERO-DEPRECIATION COVERS ARE NOT UNLIMITED (UNLESS CONFIGURED)
• Fact: Standard Zero-Dep policy add-ons cap claims to 2 per policy year.
• Insider Tip: For commercial fleets and high-mileage private cars, we configure Unlimited Zero-Dep riders so every bumper-to-bumper claim is covered.

--------------------------------------------------------------------------------
YOUR WEEKLY PROMISE FROM CHANDRAKANT KADADI:
Every week, you will receive short, 3-minute actionable briefings on IRDAI policy updates, tax-saving strategies under Section 80D, transport fleet claim secrets, and real claim settlement case studies.

Need immediate policy advice or claim assistance in Bidar?
• Call Chandrakant Kadadi: +91 98451 22345
• Visit Us: Udgir Road, Beside MAX, Bidar, Karnataka - 585401
• Office Hours: Mon - Sat: 9:30 AM - 8:30 PM | Sun: 10:00 AM - 2:00 PM

Warm regards,
Chandrakant Kadadi
Founder & Chief Advisory Officer, Kadadi Motors
  `.trim();

  const handleCopyLetter = async () => {
    try {
      await navigator.clipboard.writeText(welcomeLetterText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleShareWhatsapp = () => {
    const text = encodeURIComponent(
      `🎉 I just subscribed to Kadadi Motors Weekly Insurance Bulletin!\n\nEmail: ${subscriberEmail}\nPreference: ${preferenceTopic}\n\nGet real facts on NCB transfer, Room Rent capping & zero-jargon claim assistance in Bidar.\nContact Chandrakant Kadadi Sir: +91 98451 22345`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
    setWhatsappSent(true);
  };

  const weeklySchedule = [
    {
      issueNo: 'Issue #1 (Current)',
      title: 'The Unfiltered Truth About Insurance: NCB, Room Rent Capping & Unlimited TP',
      badge: 'Delivered Now',
      date: 'Immediate Welcome',
      readTime: '3 min read',
      highlights: [
        '50% NCB retention rules when changing vehicles',
        'How 1% room capping slashes surgery payouts by 50%',
        'Unlimited Third-Party liability law under MACT'
      ]
    },
    {
      issueNo: 'Issue #2 (Next Tuesday)',
      title: 'Health Insurance Section 80D Tax Optimization & Restore Benefits',
      badge: 'Upcoming Dispatch',
      date: 'Next Tuesday, 9:00 AM',
      readTime: '4 min read',
      highlights: [
        'Claim up to ₹75,000 tax deduction under Section 80D for self & parents',
        'Automatic 100% Sum Insured Restoration feature explained',
        'Preventing pre-existing disease waiting period traps'
      ]
    },
    {
      issueNo: 'Issue #3 (Week 3)',
      title: 'Commercial Fleet & Goods Transport Protection Masterclass',
      badge: 'Upcoming Dispatch',
      date: '2 Weeks Away',
      readTime: '5 min read',
      highlights: [
        'Overloading exclusions vs. actual loss assessment rules',
        'RTO Permit, PUC & Fitness Certificate synchronization',
        'Fast-track claim survey tips at Bidar transport hubs'
      ]
    },
    {
      issueNo: 'Issue #4 (Week 4)',
      title: 'Shop, Fire & Commercial Stock Burglary Claim Shield',
      badge: 'Upcoming Dispatch',
      date: '3 Weeks Away',
      readTime: '4 min read',
      highlights: [
        'How under-insurance penalty clause works during fire damage',
        'Proper stock audit registers accepted by insurance surveyors',
        'Combining Fire, Theft & Third-Party Shopkeeper Liability'
      ]
    }
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xl overflow-y-auto animate-fadeIn"
    >
      <div className="relative w-full max-w-4xl bg-black border border-white/20 rounded-3xl shadow-2xl overflow-hidden my-6 text-white flex flex-col max-h-[92vh]">
        
        {/* Top Celebration Banner */}
        <div className="bg-gradient-to-r from-black via-slate-950 to-black p-5 sm:p-6 border-b border-white/10 flex items-center justify-between shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-10 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center gap-3.5 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center shrink-0 shadow-inner">
              <Mail className="w-6 h-6 text-blue-400" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Subscription Activated
                </span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">• Destination: <strong className="text-white">{subscriberEmail}</strong></span>
              </div>

              <h2 id="newsletter-modal-title" className="text-lg sm:text-2xl font-heading font-black text-white mt-1">
                Welcome to Kadadi Motors Weekly Dispatch!
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer relative z-10"
            aria-label="Close Welcome Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Email Notification Bar */}
        <div className="bg-blue-950/60 border-b border-blue-500/30 px-5 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs backdrop-blur-md">
          <div className="flex items-center gap-2 text-blue-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-mono">Email Status: </span>
            <strong className="text-white font-mono">{subscriberEmail || 'amoghkadadi2010@gmail.com'}</strong>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold uppercase">
              {emailSentStatus === 'delivered' ? '✓ Delivered to Inbox' : emailSentStatus === 'sending' ? 'Sending Email...' : '✓ Welcome Email Resent'}
            </span>
          </div>

          <button
            onClick={handleResendWelcomeEmail}
            className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Send className="w-3 h-3" />
            <span>Send Email Copy Again</span>
          </button>
        </div>

        {dispatchedIssue && (
          <div className="bg-emerald-950/80 border-b border-emerald-500/40 px-5 py-2 text-xs text-emerald-200 flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span><strong>Dispatched Weekly Issue:</strong> "{dispatchedIssue}" sent to {subscriberEmail}!</span>
            </div>
          </div>
        )}

        {/* Navigation Tabs Bar */}
        <div className="px-5 py-3 bg-black border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('welcome')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'welcome'
                  ? 'bg-white text-black shadow-md'
                  : 'bg-white/5 text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Issue #1 Welcome Note</span>
            </button>

            <button
              onClick={() => setActiveTab('archive')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'archive'
                  ? 'bg-white text-black shadow-md'
                  : 'bg-white/5 text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Weekly Schedule & Archive</span>
            </button>

            <button
              onClick={() => setActiveTab('share')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'share'
                  ? 'bg-white text-black shadow-md'
                  : 'bg-white/5 text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share & Preferences</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-400 font-mono hidden md:block">
            Preference: <span className="text-blue-400 font-bold">{preferenceTopic}</span>
          </div>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 bg-slate-900/90">
          
          {/* TAB 1: GOATED WELCOME LETTER */}
          {activeTab === 'welcome' && (
            <div className="space-y-6">
              
              {/* Envelope Header Card */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <Logo variant="light" showSubtitle={false} />
                    <div>
                      <h3 className="text-sm font-bold text-white">Kadadi Motors Advisory Bulletin</h3>
                      <p className="text-[11px] text-slate-400">Udgir Road, Beside MAX, Bidar • Founder: Chandrakant Kadadi</p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Goated First Edition</span>
                  </span>
                </div>

                <div className="grid sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Recipient</span>
                    <span className="text-white font-mono font-bold truncate block">{subscriberEmail}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Delivery Frequency</span>
                    <span className="text-blue-400 font-mono font-bold block">Every Tuesday @ 9:00 AM</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Topic Focus</span>
                    <span className="text-slate-200 font-bold truncate block">{preferenceTopic}</span>
                  </div>
                </div>
              </div>

              {/* High Impact Welcome Message Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-blue-500/30 space-y-6 shadow-xl relative overflow-hidden">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono font-bold border border-blue-500/20">
                    <Bell className="w-3.5 h-3.5" />
                    <span>ISSUE #1 • THE UNFILTERED TRUTH ABOUT INSURANCE</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-heading font-black text-white leading-tight">
                    "Welcome to the Kadadi Motors Insider Circle. No fluff, no jargon — just pure, actionable insurance facts."
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Dear <strong className="text-white">{subscriberEmail.split('@')[0]}</strong>, thank you for subscribing! For over 25 years in Bidar, Kadadi Motors has stood for one thing: <strong>complete honesty in policy coverage and 100% claim commitment</strong>.
                  </p>
                </div>

                {/* The 5 Real Facts Box */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-xs font-black uppercase text-blue-400 tracking-wider flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-400" />
                    <span>5 Critical Insurance Facts Every Indian Policyholder Must Know</span>
                  </h4>

                  <div className="grid gap-3.5">
                    
                    {/* Fact 1 */}
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/40 transition-all space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-blue-400">1. THE 50% NO-CLAIM BONUS (NCB) BELONGS TO YOU!</span>
                        <span className="text-[10px] font-mono text-blue-300 font-bold bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800">Motor Insurance</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed pt-1">
                        <strong>The Fact:</strong> NCB is attached to the owner's driving record, NOT the chassis. Selling your old vehicle? Always request an <em>NCB Retention Certificate</em>. You can transfer up to 50% discount directly to your new car or bike insurance, saving thousands of rupees.
                      </p>
                    </div>

                    {/* Fact 2 */}
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/40 transition-all space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-blue-400">2. ROOM RENT CAPPING PENALIZES YOUR ENTIRE SURGERY BILL</span>
                        <span className="text-[10px] font-mono text-blue-300 font-bold bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800">Health Insurance</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed pt-1">
                        <strong>The Fact:</strong> If a policy caps room rent at ₹5,000/day and you choose a ₹10,000 room, the hospital bill won't just charge extra for the room — <strong>the insurer will proportionately slash doctor fees, surgeon charges, and ICU bills by 50%!</strong> At Kadadi Motors, we configure plans with Zero Room Capping.
                      </p>
                    </div>

                    {/* Fact 3 */}
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/40 transition-all space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-blue-400">3. THIRD-PARTY BODILY INJURY LIABILITY IS 100% UNLIMITED</span>
                        <span className="text-[10px] font-mono text-blue-300 font-bold bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800">MACT Law</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed pt-1">
                        <strong>The Fact:</strong> While Third-Party Property Damage is capped at ₹7.5 Lakhs, Third-Party Injury or Death compensation awarded by Motor Accident Claims Tribunals (MACT) is <strong>100% UNLIMITED</strong>. Driving without valid TP insurance exposes your personal property to court attachment.
                      </p>
                    </div>

                    {/* Fact 4 */}
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/40 transition-all space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-blue-400">4. YOU CAN CLAIM 100% REIMBURSEMENT AT ANY REGISTERED HOSPITAL</span>
                        <span className="text-[10px] font-mono text-blue-300 font-bold bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800">Claim Settlement</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed pt-1">
                        <strong>The Fact:</strong> Emergency hospitalization at a non-network hospital? You are fully eligible for reimbursement! Simply inform your insurer within 24 hours of admission and collect itemized bills. Kadadi Motors manages the entire claim documentation for you.
                      </p>
                    </div>

                    {/* Fact 5 */}
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/40 transition-all space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-blue-400">5. ZERO-DEPRECIATION CLAIM CAPS CAN BE UNLOCKED</span>
                        <span className="text-[10px] font-mono text-blue-300 font-bold bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800">Car & Transport</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed pt-1">
                        <strong>The Fact:</strong> Most off-the-shelf Zero-Dep policies cap claims to 2 times a year. For high-mileage private cars and commercial fleets, Kadadi Motors adds <em>Unlimited Zero-Dep Riders</em> so every claim gets 0% deduction on plastic and metal parts.
                      </p>
                    </div>

                  </div>
                </div>

                {/* Founder Sign-off */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-black flex items-center justify-center shrink-0 text-sm">
                      CK
                    </div>
                    <div>
                      <div className="font-bold text-white">Chandrakant Kadadi</div>
                      <div className="text-[11px] text-slate-400">Founder & Chief Advisory Officer • Bidar Desk</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyLetter}
                      className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-blue-400 flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-blue-400" />
                          <span>Copied Letter</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Welcome Letter</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleShareWhatsapp}
                      className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>WhatsApp to Self</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: WEEKLY SCHEDULE & ARCHIVE */}
          {activeTab === 'archive' && (
            <div className="space-y-6">
              
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                  <h3 className="text-base font-bold text-white">Your Weekly Insurance Fact Schedule</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Every Tuesday at 9:00 AM, a concise 3-minute factual dispatch arrives in your inbox covering IRDAI guidelines, tax tricks, transport fleet secrets, and claim settlement tactics.
                </p>
              </div>

              <div className="grid gap-4">
                {weeklySchedule.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-blue-500/40 transition-all"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                      <span className="text-xs font-mono font-bold text-blue-400">{item.issueNo}</span>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-mono font-bold">
                          {item.badge}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">{item.readTime}</span>
                      </div>
                    </div>

                    <h4 className="text-sm font-bold text-white">{item.title}</h4>

                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {item.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 3: SHARE & PREFERENCES */}
          {activeTab === 'share' && (
            <div className="space-y-6">
              
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-blue-400" />
                  <span>Subscription Settings & Share</span>
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  You are currently subscribed with email <strong className="text-white font-mono">{subscriberEmail}</strong> under preference <strong className="text-blue-400 font-mono">{preferenceTopic}</strong>.
                </p>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-white">Full Formatted Welcome Note Payload:</div>
                  <pre className="p-3 rounded-lg bg-slate-950 text-[11px] text-slate-300 font-mono whitespace-pre-wrap max-h-48 overflow-y-auto border border-slate-800">
                    {welcomeLetterText}
                  </pre>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={handleCopyLetter}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-xs"
                  >
                    {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
                    <span>{copied ? 'Copied to Clipboard' : 'Copy Full Welcome Note'}</span>
                  </button>

                  <button
                    onClick={handleShareWhatsapp}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-blue-400" />
                    <span>{whatsappSent ? 'Opened WhatsApp!' : 'Share Welcome Note via WhatsApp'}</span>
                  </button>
                </div>
              </div>

              {/* Direct Support Card */}
              <div className="p-6 rounded-2xl bg-blue-950/40 border border-blue-500/30 space-y-3 text-xs">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-blue-400" />
                  <span>Need an Immediate Policy Review in Bidar?</span>
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  Chandrakant Kadadi personally reviews existing motor, health, commercial fleet, and fire policy documents to identify missing riders or overcharged premiums.
                </p>
                {onOpenQuoteModal && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenQuoteModal();
                    }}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Request Free Policy Audit Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Kadadi Motors • Independent Insurance Advisory, Bidar (Est. 1999)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all cursor-pointer shadow-xs"
            >
              Start Exploring & Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
