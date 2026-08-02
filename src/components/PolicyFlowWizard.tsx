import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Car,
  HeartPulse,
  UserCheck,
  Truck,
  Building2,
  RotateCcw,
  FileCheck,
  Check,
  Info,
  MessageSquare,
  FileText,
  PhoneCall,
  XCircle,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BUSINESS_INFO } from '../data/insuranceData';
import { AppStore } from '../lib/store';

interface PolicyFlowWizardProps {
  onOpenQuoteModal?: (category?: string) => void;
  onNavigate?: (sectionId: string) => void;
}

interface UserAnswers {
  category: string;
  requirementType: string;
  details: string;
  location: string;
  selectedGoals: string[];
  readyDocs: string[];
  neededDocs: string[];
  customerName: string;
  customerPhone: string;
}

export const PolicyFlowWizard: React.FC<PolicyFlowWizardProps> = ({
  onOpenQuoteModal,
  onNavigate
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // All initial inputs are strictly empty strings by default
  const [answers, setAnswers] = useState<UserAnswers>({
    category: 'motor',
    requirementType: 'renewal',
    details: '',
    location: '',
    selectedGoals: [],
    readyDocs: [],
    neededDocs: [],
    customerName: '',
    customerPhone: ''
  });

  const categories = [
    {
      id: 'motor',
      label: 'Motor Insurance',
      subtext: 'Car, Scooter, Bike, Taxi, Commercial Vehicle',
      icon: <Car className="w-6 h-6 text-orange-300" />
    },
    {
      id: 'health',
      label: 'Health & Mediclaim',
      subtext: 'Family Floater, Individual, Senior Parents',
      icon: <HeartPulse className="w-6 h-6 text-rose-300" />
    },
    {
      id: 'life',
      label: 'Life & Term Insurance',
      subtext: 'Family Protection, Term Plan, Tax Saving',
      icon: <UserCheck className="w-6 h-6 text-blue-300" />
    },
    {
      id: 'commercial',
      label: 'Commercial & Fleet',
      subtext: 'Goods Carriers, Passenger Buses, Tractors',
      icon: <Truck className="w-6 h-6 text-emerald-300" />
    },
    {
      id: 'business',
      label: 'Shopkeeper & Business',
      subtext: 'Fire, Burglary, Goods Stock, Factory',
      icon: <Building2 className="w-6 h-6 text-purple-300" />
    }
  ];

  const requirementTypes = [
    { id: 'renewal', label: 'Policy Annual Renewal', desc: 'Existing policy is expiring or due soon' },
    { id: 'new_policy', label: 'Fresh New Insurance', desc: 'New vehicle or first-time policy' },
    { id: 'expired_policy', label: 'Expired Policy', desc: 'Policy expired past deadline - need inspection' },
    { id: 'transfer_insurer', label: 'Switch Company', desc: 'Want better rates & local claim service in Bidar' }
  ];

  // Beginner-friendly goals in plain human words (Zero Jargon)
  const categoryGoalsMap: Record<string, string[]> = {
    motor: [
      'I want 100% Cashless repairs at local Bidar garages (Zero money out of pocket)',
      'Protect engine & hydrostatic lock against monsoon water damage',
      '24x7 Roadside emergency towing & assistance in Karnataka & Hyderabad',
      'Get the lowest possible premium price & transfer my NCB discount',
      'Instant policy issuance in 10 minutes without physical hassle'
    ],
    health: [
      '100% Cashless hospital admission in Bidar, Kalaburagi, and Hyderabad',
      'Cover my entire family (Self + Spouse + Children) under one single policy',
      'Cover my senior citizen parents (60+ years) including pre-existing illnesses',
      'Save income tax under Section 80D',
      'Zero room-rent capping & automatic restoration of cover if exhausted'
    ],
    life: [
      'Ensure high financial safety for my family (₹50 Lakhs - ₹1 Crore+)',
      'Accidental safety rider & critical illness support',
      'Tax savings under Section 80C with reliable savings returns',
      'Direct personal guidance from Chandrakant Kadadi for claim settlement'
    ],
    commercial: [
      'Protect driver, cleaner, and passengers during road trips',
      'Cover goods & cargo damage on highways',
      'Third-party legal liability & fast claim settlement',
      'Discount for multiple commercial vehicles'
    ],
    business: [
      'Protect shop stock & inventory from fire & short-circuit damage',
      'Burglary, theft, and cash-in-transit security',
      'Machinery breakdown & factory liability protection'
    ]
  };

  // Standard document options per category
  const categoryDocsMap: Record<string, string[]> = {
    motor: [
      'RC Book (Vehicle Registration Certificate)',
      'Previous Policy Copy',
      'Driving License (DL)',
      'Vehicle Photos (if expired or new)',
      'Aadhaar Card'
    ],
    health: [
      'Aadhaar Card of Family Members',
      'PAN Card',
      'Previous Health Insurance Policy (if renewing/porting)',
      'Passport Size Photo',
      'Medical Reports (if any existing condition)'
    ],
    life: [
      'Aadhaar Card',
      'PAN Card',
      'Income Proof (Pay Slip / ITR / Bank Statement)',
      'Age Proof (Driving License or Birth Certificate)'
    ],
    commercial: [
      'Vehicle RC Book',
      'Fitness & Permit Copy',
      'Previous Insurance Policy',
      'Owner Aadhaar & PAN Card'
    ],
    business: [
      'Shop / Factory Trade License or GST Certificate',
      'Stock Valuation List',
      'Owner Aadhaar Card & PAN Card',
      'Previous Fire / Shopkeeper Policy'
    ]
  };

  const toggleGoal = (goal: string) => {
    if (answers.selectedGoals.includes(goal)) {
      setAnswers({ ...answers, selectedGoals: answers.selectedGoals.filter((g) => g !== goal) });
    } else {
      setAnswers({ ...answers, selectedGoals: [...answers.selectedGoals, goal] });
    }
  };

  const toggleDocState = (doc: string, status: 'ready' | 'needed') => {
    let newReady = answers.readyDocs.filter((d) => d !== doc);
    let newNeeded = answers.neededDocs.filter((d) => d !== doc);

    if (status === 'ready') {
      if (!answers.readyDocs.includes(doc)) {
        newReady.push(doc);
      }
    } else {
      if (!answers.neededDocs.includes(doc)) {
        newNeeded.push(doc);
      }
    }

    setAnswers({
      ...answers,
      readyDocs: newReady,
      neededDocs: newNeeded
    });
  };

  const handleFormatAndSendWhatsApp = () => {
    if (!answers.customerName.trim() || !answers.customerPhone.trim()) {
      alert('Please enter your Name and Mobile Number so Chandrakant Kadadi Sir can format your advisory request!');
      return;
    }

    // Save in store
    AppStore.addInquiry({
      customerName: answers.customerName,
      phone: answers.customerPhone,
      city: answers.location || 'Bidar',
      category: answers.category,
      categoryTitle: `${answers.category.toUpperCase()} Insurance (${answers.requirementType})`,
      purposeTitle: 'Policy & Document Wizard Request',
      readyDocs: answers.readyDocs,
      pendingDocs: answers.neededDocs,
      advisorNotes: `Policy Wizard Submission. Details: ${answers.details || 'N/A'}. Goals: ${answers.selectedGoals.join('; ')}`
    });

    // Format WhatsApp message
    const categoryLabel = categories.find((c) => c.id === answers.category)?.label || answers.category;
    const reqLabel = requirementTypes.find((r) => r.id === answers.requirementType)?.label || answers.requirementType;

    let message = `*INSURANCE ADVISORY REQUEST - KADADI MOTORS*\n`;
    message += `----------------------------------------\n`;
    message += `*Customer Name:* ${answers.customerName}\n`;
    message += `*Mobile Number:* ${answers.customerPhone}\n`;
    if (answers.location.trim()) message += `*City/Location:* ${answers.location}\n`;
    message += `*Category:* ${categoryLabel}\n`;
    message += `*Requirement:* ${reqLabel}\n`;
    if (answers.details.trim()) message += `*Details / Model:* ${answers.details}\n`;

    if (answers.selectedGoals.length > 0) {
      message += `\n*Key Preferences / What I Want:*\n`;
      answers.selectedGoals.forEach((g) => {
        message += `• ${g}\n`;
      });
    }

    if (answers.readyDocs.length > 0) {
      message += `\n*Documents I Have Ready:*\n`;
      answers.readyDocs.forEach((d) => {
        message += `✅ ${d}\n`;
      });
    }

    if (answers.neededDocs.length > 0) {
      message += `\n*Documents I Need Help With:*\n`;
      answers.neededDocs.forEach((d) => {
        message += `❓ ${d}\n`;
      });
    }

    message += `\nHi Chandrakant Kadadi Sir, please review my requirements and guide me with the best policy option and quotes!`;

    const whatsappUrl = `https://wa.me/91${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(message)}`;
    setIsSubmitted(true);
    window.open(whatsappUrl, '_blank');
  };

  const availableGoals = categoryGoalsMap[answers.category] || categoryGoalsMap['motor'];
  const availableDocs = categoryDocsMap[answers.category] || categoryDocsMap['motor'];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12">
      
      {/* Outer Clean Panel */}
      <div className="rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden bg-slate-950/95 backdrop-blur-xl">
        
        {/* Soft Background Accents */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Wizard Header */}
        <div className="relative z-10 space-y-3 mb-8 border-b border-slate-800 pb-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-400/30 text-orange-200 font-mono text-xs font-bold">
            <FileCheck className="w-4 h-4 text-orange-300" />
            <span>Interactive Policy & Document Wizard</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-white">
                Insurance Plan & Document Guide
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                Select what you need in 4 simple steps. Chandrakant Kadadi Sir will personally review and send you exact quotes on WhatsApp.
              </p>
            </div>

            {!isSubmitted && (
              <div className="text-center sm:text-right shrink-0">
                <span className="text-xs text-slate-400 font-mono">Step {currentStep} of 4</span>
                <div className="w-32 sm:w-40 h-2 bg-slate-900 rounded-full mt-1.5 overflow-hidden border border-slate-800 mx-auto sm:mx-0">
                  <div
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${(currentStep / 4) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Wizard Steps */}
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Select Insurance Category */}
            {currentStep === 1 && !isSubmitted && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-extrabold text-white mb-1">
                    Step 1: What would you like to insure today?
                  </h3>
                  <p className="text-xs text-slate-400">
                    Choose the type of insurance you need assistance with:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((cat) => {
                    const isSelected = answers.category === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setAnswers({ ...answers, category: cat.id, selectedGoals: [], readyDocs: [], neededDocs: [] })}
                        className={`p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between relative cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600/15 border-blue-500 ring-2 ring-blue-500/30'
                            : 'bg-slate-900/80 hover:bg-slate-800/90 border-slate-800 text-slate-200'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-3 right-3 p-1 rounded-full bg-blue-600 text-white">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}

                        <div className="space-y-3">
                          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 w-fit">
                            {cat.icon}
                          </div>
                          <div>
                            <h4 className="font-extrabold text-sm text-white">{cat.label}</h4>
                            <p className="text-xs text-slate-400 mt-1 leading-relaxed">{cat.subtext}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-end pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm shadow-xl flex items-center gap-2 cursor-pointer"
                  >
                    <span>Next: Details & Requirement</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Requirement Type & Vehicle / Family Info */}
            {currentStep === 2 && !isSubmitted && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-extrabold text-white mb-1">
                    Step 2: What is your policy status and details?
                  </h3>
                  <p className="text-xs text-slate-400">
                    Selected Category: <strong className="text-orange-300 capitalize">{answers.category} Insurance</strong>
                  </p>
                </div>

                {/* Requirement Type Grid */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">Select Policy Status:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {requirementTypes.map((req) => {
                      const isSelected = answers.requirementType === req.id;
                      return (
                        <button
                          key={req.id}
                          type="button"
                          onClick={() => setAnswers({ ...answers, requirementType: req.id })}
                          className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? 'bg-blue-600/20 border-blue-500 text-white ring-1 ring-blue-500/40'
                              : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-300'
                          }`}
                        >
                          <div className="font-extrabold text-xs text-white">{req.label}</div>
                          <div className="text-[11px] text-slate-400 mt-1">{req.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Free Text Inputs - Unprefilled (Empty by default) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                      <Info className="w-3.5 h-3.5 text-orange-300" />
                      <span>Vehicle Model or Family Members</span>
                    </label>
                    <input
                      type="text"
                      value={answers.details}
                      onChange={(e) => setAnswers({ ...answers, details: e.target.value })}
                      placeholder="e.g. Swift Dzire 2022 / Honda Activa / Self + Family"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 text-white border border-slate-800 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                      <span>City / Location in Bidar or Nearby</span>
                    </label>
                    <input
                      type="text"
                      value={answers.location}
                      onChange={(e) => setAnswers({ ...answers, location: e.target.value })}
                      placeholder="e.g. Bidar, Bhalki, Humnabad, Basavakalyan"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 text-white border border-slate-800 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm shadow-xl flex items-center gap-2 cursor-pointer"
                  >
                    <span>Next: What Matters Most To You</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Simple Preferences (Zero Technical Jargon) */}
            {currentStep === 3 && !isSubmitted && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-extrabold text-white mb-1">
                    Step 3: What are your main expectations? (Tap all that apply)
                  </h3>
                  <p className="text-xs text-slate-400">
                    No need to worry about technical terms — Chandrakant Kadadi Sir will configure exact coverages for you.
                  </p>
                </div>

                <div className="space-y-3">
                  {availableGoals.map((goal) => {
                    const isChecked = answers.selectedGoals.includes(goal);
                    return (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => toggleGoal(goal)}
                        className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-bold transition-all flex items-center justify-between gap-3 cursor-pointer ${
                          isChecked
                            ? 'bg-blue-600/20 border-blue-500 text-white ring-1 ring-blue-500/40'
                            : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-300'
                        }`}
                      >
                        <span className="leading-relaxed">{goal}</span>
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center border shrink-0 ${isChecked ? 'bg-blue-600 border-blue-500 text-white' : 'border-slate-700 bg-slate-950'}`}>
                          {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm shadow-xl flex items-center gap-2 cursor-pointer"
                  >
                    <span>Next: Document Checklist</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Simple Document Checklist & WhatsApp Send */}
            {currentStep === 4 && !isSubmitted && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-extrabold text-white mb-1">
                    Step 4: Which documents do you have ready right now?
                  </h3>
                  <p className="text-xs text-slate-400">
                    Mark documents as "Have Ready" or "Need Help". If you don't have them, don't worry! Chandrakant Kadadi Sir will help.
                  </p>
                </div>

                {/* Documents Toggle List */}
                <div className="space-y-3">
                  {availableDocs.map((doc) => {
                    const isReady = answers.readyDocs.includes(doc);
                    const isNeeded = answers.neededDocs.includes(doc);

                    return (
                      <div
                        key={doc}
                        className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                          <FileText className="w-4 h-4 text-orange-300 shrink-0" />
                          <span>{doc}</span>
                        </span>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => toggleDocState(doc, 'ready')}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                              isReady
                                ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>I Have Ready</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => toggleDocState(doc, 'needed')}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                              isNeeded
                                ? 'bg-amber-600 text-white border-amber-500 shadow-md'
                                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                            }`}
                          >
                            <HelpCircle className="w-3.5 h-3.5" />
                            <span>Need Help</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Contact Input Form (Clean & Unprefilled) */}
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 pt-4">
                  <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-400" />
                    <span>Enter Your Contact Info for Readymade WhatsApp Delivery</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={answers.customerName}
                        onChange={(e) => setAnswers({ ...answers, customerName: e.target.value })}
                        placeholder="e.g. Veeresh Patil"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 text-white border border-slate-800 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">WhatsApp Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        value={answers.customerPhone}
                        onChange={(e) => setAnswers({ ...answers, customerPhone: e.target.value })}
                        placeholder="e.g. 98450 12345"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 text-white border border-slate-800 text-xs sm:text-sm focus:outline-none focus:border-blue-500 font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleFormatAndSendWhatsApp}
                    className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm shadow-xl shadow-emerald-600/20 flex items-center gap-2 cursor-pointer transition-transform hover:scale-102"
                  >
                    <MessageSquare className="w-5 h-5 fill-white" />
                    <span>Send Readymade Request on WhatsApp</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* SUCCESS STATE WITH FRAMER MOTION ANIMATION */}
            {isSubmitted && (
              <motion.div
                key="submitted"
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className="text-center py-6 sm:py-8 space-y-6 relative"
              >
                {/* Animated Glowing Success Badge Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                  className="relative w-20 h-20 mx-auto"
                >
                  {/* Ambient Pulsing Glow Halo */}
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.15, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                    className="absolute inset-0 rounded-full bg-emerald-500/30 blur-md pointer-events-none"
                  />
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-emerald-400 text-white flex items-center justify-center border-2 border-emerald-300 shadow-2xl shadow-emerald-500/30">
                    <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
                  </div>
                </motion.div>

                {/* Staggered Text & Status */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="space-y-3 max-w-lg mx-auto"
                >
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-black">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span>Application Data Received & Formatted</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-heading font-black text-white">
                    Request Received Successfully!
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    WhatsApp has launched with your formatted policy request. Chandrakant Kadadi Sir will personally review your document checklist and contact you on <strong>+91 {answers.customerPhone}</strong> with exact quotes.
                  </p>
                </motion.div>

                {/* Summary Card of Submitted Data */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="max-w-md mx-auto p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-left space-y-2.5 text-xs text-slate-300"
                >
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <span className="font-extrabold text-white uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4 text-emerald-400" />
                      <span>Submitted Application Summary</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-extrabold">
                      VERIFIED
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-slate-400 block text-[10px] font-bold uppercase">Applicant</span>
                      <span className="font-bold text-white">{answers.customerName || 'Client'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] font-bold uppercase">Category</span>
                      <span className="font-bold text-amber-300 capitalize">{answers.category} Insurance</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] font-bold uppercase">Phone</span>
                      <span className="font-mono font-bold text-emerald-400">{answers.customerPhone}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] font-bold uppercase">Documents</span>
                      <span className="font-bold text-white">
                        {answers.readyDocs.length} Ready / {answers.neededDocs.length} Need Help
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setCurrentStep(1);
                      setAnswers({
                        category: 'motor',
                        requirementType: 'renewal',
                        details: '',
                        location: '',
                        selectedGoals: [],
                        readyDocs: [],
                        neededDocs: [],
                        customerName: '',
                        customerPhone: ''
                      });
                    }}
                    className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs flex items-center gap-2 cursor-pointer border border-slate-800 transition-all hover:border-slate-700"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Start New Request</span>
                  </button>

                  <a
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-600/20 transition-all"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Call Desk: {BUSINESS_INFO.phoneDisplay}</span>
                  </a>
                </motion.div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>

    </div>
  );
};
