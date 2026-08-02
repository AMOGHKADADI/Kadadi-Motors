import React, { useState, useMemo } from 'react';
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
  HelpCircle,
  Sparkles,
  Zap,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  MapPin,
  Shield,
  Layers,
  ArrowRight
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

  const [answers, setAnswers] = useState<UserAnswers>({
    category: 'motor',
    requirementType: 'renewal',
    details: '',
    location: 'Bidar',
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
      icon: <Car className="w-5 h-5 text-amber-400" />,
      accent: 'amber',
      tagline: '100% Cashless Repairs & Zero-Dep Protection'
    },
    {
      id: 'health',
      label: 'Health & Mediclaim',
      subtext: 'Family Floater, Individual, Senior Parents',
      icon: <HeartPulse className="w-5 h-5 text-rose-400" />,
      accent: 'rose',
      tagline: 'Cashless Hospitalization in Bidar & Hyderabad'
    },
    {
      id: 'life',
      label: 'Life & Term Insurance',
      subtext: 'Family Protection, Term Plan, Tax Saving',
      icon: <UserCheck className="w-5 h-5 text-blue-400" />,
      accent: 'blue',
      tagline: 'Financial Protection & Section 80C Savings'
    },
    {
      id: 'commercial',
      label: 'Commercial & Fleet',
      subtext: 'Goods Carriers, Passenger Buses, Tractors',
      icon: <Truck className="w-5 h-5 text-emerald-400" />,
      accent: 'emerald',
      tagline: 'Cargo, Driver & Highway Protection'
    },
    {
      id: 'business',
      label: 'Shopkeeper & Business',
      subtext: 'Fire, Burglary, Goods Stock, Factory',
      icon: <Building2 className="w-5 h-5 text-purple-400" />,
      accent: 'purple',
      tagline: 'Inventory, Fire & Factory Liability'
    }
  ];

  const requirementTypes = [
    { id: 'renewal', label: 'Policy Renewal', desc: 'Expiring or due for annual renewal' },
    { id: 'new_policy', label: 'Fresh New Insurance', desc: 'New vehicle or first-time buyer' },
    { id: 'expired_policy', label: 'Expired Policy', desc: 'Expired past deadline — needs rapid inspection' },
    { id: 'transfer_insurer', label: 'Port / Switch Insurer', desc: 'Want better rates & personal local claim desk in Bidar' }
  ];

  const categoryGoalsMap: Record<string, { id: string; label: string; tip: string }[]> = {
    motor: [
      { id: 'cashless', label: '100% Cashless Garage Settlement in Bidar & Nearby', tip: 'Zero out-of-pocket expense at verified garages' },
      { id: 'zero_dep', label: 'Zero Depreciation Rider (Bumper to Bumper)', tip: 'Full claim payout without part depreciation deduction' },
      { id: 'engine_protect', label: 'Engine & Hydrostatic Lock Protection', tip: 'Essential for water logging damage during heavy monsoons' },
      { id: 'rsa', label: '24x7 Roadside Assistance & Emergency Towing', tip: 'Breakdown towing support across Karnataka & Telangana' },
      { id: 'ncb_transfer', label: 'NCB Discount Transfer (Up to 50% Off)', tip: 'Transfer bonus from previous policy for instant savings' }
    ],
    health: [
      { id: 'cashless_hosp', label: 'Cashless Hospitalization in Bidar, Kalaburagi & Hyderabad', tip: 'Direct tie-ups with leading hospitals' },
      { id: 'no_room_cap', label: 'Zero Room Rent Capping (Private AC Room)', tip: 'No ceiling limits on room charges' },
      { id: 'pre_existing', label: 'Pre-Existing Illness Coverage Strategy', tip: 'Tailored plans with reduced waiting periods' },
      { id: 'restoration', label: '100% Automatic Refill / Restoration Benefit', tip: 'Recharges sum insured automatically if exhausted' },
      { id: 'tax_80d', label: 'Income Tax Savings under Section 80D', tip: 'Save up to ₹25,000 - ₹75,000 under tax laws' }
    ],
    life: [
      { id: 'term_shield', label: 'High Sum Assured Protection (₹50L - ₹1Cr+)', tip: 'Maximum financial security for loved ones at lowest cost' },
      { id: 'critical_illness', label: 'Critical Illness & Disability Rider Support', tip: 'Lump sum payout on diagnosis of major health issues' },
      { id: 'guaranteed_return', label: 'Guaranteed Savings & Return of Premium Option', tip: 'Get 100% premiums back on policy maturity' },
      { id: 'claim_desk', label: 'Dedicated Claim Settlement Guarantee by Chandrakant Kadadi', tip: 'Hand-held local support for claim processing' }
    ],
    commercial: [
      { id: 'driver_passenger', label: 'Driver, Helper & Passenger Cover', tip: 'Complete medical & personal accident protection' },
      { id: 'cargo_protection', label: 'Transit Cargo & Goods Damage Coverage', tip: 'Shields cargo loss against road accidents' },
      { id: 'tp_legal', label: 'Third-Party Legal & Highway Liability Protection', tip: 'Mandatory legal compliance & court liability coverage' },
      { id: 'fleet_discount', label: 'Multi-Vehicle Fleet Special Pricing', tip: 'Consolidated discount for multi-vehicle owners' }
    ],
    business: [
      { id: 'fire_shortcircuit', label: 'Fire, Short-Circuit & Explosion Shield', tip: 'Covers physical shop, building & machinery' },
      { id: 'stock_inventory', label: 'Goods Stock & Raw Material Insurance', tip: 'Covers damaged inventory during water/fire mishaps' },
      { id: 'burglary_theft', label: 'Burglary, Break-in & Cash-in-Transit Protection', tip: 'Secures business cash & stolen goods' }
    ]
  };

  const categoryDocsMap: Record<string, string[]> = {
    motor: [
      'RC Book (Vehicle Registration)',
      'Previous Policy Copy (if renewing)',
      'Driving License (DL)',
      'Aadhaar / Identity Proof'
    ],
    health: [
      'Aadhaar Cards of Insured Members',
      'PAN Card of Proposer',
      'Previous Health Policy Copy (if porting)',
      'Recent Medical Reports (if any condition)'
    ],
    life: [
      'Aadhaar Card & PAN Card',
      'Income Proof (Pay Slip / ITR / Bank Statement)',
      'Age Proof (DL / Passport / Birth Cert)'
    ],
    commercial: [
      'Vehicle RC Book',
      'Fitness & Permit Certificate',
      'Previous Insurance Policy Copy',
      'Owner Aadhaar & PAN Card'
    ],
    business: [
      'GST / Trade License / Shop Establishment',
      'Stock Valuation Summary',
      'Owner Aadhaar Card & PAN Card'
    ]
  };

  const selectedCategoryObj = categories.find((c) => c.id === answers.category) || categories[0];
  const availableGoals = categoryGoalsMap[answers.category] || categoryGoalsMap['motor'];
  const availableDocs = categoryDocsMap[answers.category] || categoryDocsMap['motor'];

  // Calculate live dynamic Strategy Readiness Score
  const strategyScore = useMemo(() => {
    let score = 40;
    if (answers.requirementType) score += 15;
    if (answers.details.trim().length > 2) score += 15;
    score += Math.min(20, answers.selectedGoals.length * 5);
    score += Math.min(10, answers.readyDocs.length * 3);
    return Math.min(100, score);
  }, [answers]);

  const toggleGoal = (goalLabel: string) => {
    if (answers.selectedGoals.includes(goalLabel)) {
      setAnswers({ ...answers, selectedGoals: answers.selectedGoals.filter((g) => g !== goalLabel) });
    } else {
      setAnswers({ ...answers, selectedGoals: [...answers.selectedGoals, goalLabel] });
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
      alert('Please provide your Full Name and Mobile Number so Chandrakant Kadadi Sir can personalize your advisory brief!');
      return;
    }

    AppStore.addInquiry({
      customerName: answers.customerName,
      phone: answers.customerPhone,
      city: answers.location || 'Bidar',
      category: answers.category,
      categoryTitle: `${selectedCategoryObj.label} (${answers.requirementType})`,
      purposeTitle: 'Personalized Strategy Wizard Brief',
      readyDocs: answers.readyDocs,
      pendingDocs: answers.neededDocs,
      advisorNotes: `Personalized Advisory Request. Details: ${answers.details || 'N/A'}. Goals: ${answers.selectedGoals.join('; ')}`
    });

    const reqLabel = requirementTypes.find((r) => r.id === answers.requirementType)?.label || answers.requirementType;

    let message = `*PERSONALIZED INSURANCE BRIEF - KADADI MOTORS*\n`;
    message += `----------------------------------------\n`;
    message += `*Applicant:* ${answers.customerName}\n`;
    message += `*Mobile:* ${answers.customerPhone}\n`;
    if (answers.location.trim()) message += `*Location:* ${answers.location}\n`;
    message += `*Category:* ${selectedCategoryObj.label}\n`;
    message += `*Policy Requirement:* ${reqLabel}\n`;
    if (answers.details.trim()) message += `*Details/Vehicle/Family:* ${answers.details}\n`;

    if (answers.selectedGoals.length > 0) {
      message += `\n*Selected Strategic Preferences:*\n`;
      answers.selectedGoals.forEach((g) => {
        message += `• ${g}\n`;
      });
    }

    if (answers.readyDocs.length > 0) {
      message += `\n*Documents Ready:*\n`;
      answers.readyDocs.forEach((d) => {
        message += `✅ ${d}\n`;
      });
    }

    if (answers.neededDocs.length > 0) {
      message += `\n*Need Assistance With:*\n`;
      answers.neededDocs.forEach((d) => {
        message += `❓ ${d}\n`;
      });
    }

    message += `\nHi Chandrakant Kadadi Sir, please review my requirements and advise me on the best policy quotes & cashless network options in Bidar!`;

    const whatsappUrl = `https://wa.me/91${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(message)}`;
    setIsSubmitted(true);
    window.open(whatsappUrl, '_blank');
  };

  const steps = [
    { num: 1, title: 'Insurance Type', subtitle: 'Category & Status' },
    { num: 2, title: 'Details & Need', subtitle: 'Model / Family / Location' },
    { num: 3, title: 'Strategy & Cover', subtitle: 'Personalized Add-ons' },
    { num: 4, title: 'Document Audit', subtitle: 'Checklist & WhatsApp Send' }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-12">
      
      {/* Container Box */}
      <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-10 shadow-2xl relative overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
        
        {/* Subtle Ambient Accent */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Executive Header Bar */}
        <div className="relative z-10 space-y-6 mb-8 border-b border-slate-800 pb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              {/* Kicker / Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-400 font-mono text-xs font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Chandrakant Kadadi Policy Desk • Bidar</span>
              </div>

              {/* Main Title - H2 Display */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-white tracking-tight leading-tight">
                Personalized Policy Advisory Wizard
              </h2>

              {/* Lead Paragraph */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Configure your exact policy requirements, preferred add-on protections, and document availability for tailored guidance in Bidar.
              </p>
            </div>

            {/* Strategy Readiness Badge */}
            {!isSubmitted && (
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 min-w-[220px] shrink-0 text-right sm:text-left space-y-2">
                <div className="flex items-center justify-between gap-2 text-xs text-slate-400 font-mono">
                  <span className="uppercase tracking-wider font-semibold">Strategy Match</span>
                  <span className="font-bold text-base text-amber-400">{strategyScore}%</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
                    style={{ width: `${strategyScore}%` }}
                  />
                </div>
                <div className="text-xs text-slate-400 flex items-center justify-end sm:justify-start gap-1">
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>Tailored for Bidar Network</span>
                </div>
              </div>
            )}
          </div>

          {/* Stepper Tabs */}
          {!isSubmitted && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              {steps.map((step) => {
                const isActive = currentStep === step.num;
                const isCompleted = currentStep > step.num;

                return (
                  <button
                    key={step.num}
                    type="button"
                    onClick={() => {
                      if (step.num < currentStep || isCompleted) {
                        setCurrentStep(step.num);
                      }
                    }}
                    disabled={step.num > currentStep}
                    className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex items-center gap-3 cursor-pointer ${
                      isActive
                        ? 'bg-amber-400/10 border-amber-400/50 text-white shadow-md'
                        : isCompleted
                        ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                        : 'bg-slate-950/40 border-slate-800/60 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 ${
                        isActive
                          ? 'bg-amber-400 text-slate-950'
                          : isCompleted
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : step.num}
                    </div>
                    <div className="hidden sm:block overflow-hidden">
                      <div className="text-sm font-bold truncate text-white">{step.title}</div>
                      <div className="text-xs text-slate-400 truncate">{step.subtitle}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Content Body Grid */}
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Category & Requirement Type */}
            {currentStep === 1 && !isSubmitted && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                {/* Category Selection */}
                <div className="space-y-3">
                  {/* Section Title H3 */}
                  <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wide text-slate-200 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-400" />
                    <span>Select Insurance Sector</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {categories.map((cat) => {
                      const isSelected = answers.category === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() =>
                            setAnswers({
                              ...answers,
                              category: cat.id,
                              selectedGoals: [],
                              readyDocs: [],
                              neededDocs: []
                            })
                          }
                          className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between relative cursor-pointer ${
                            isSelected
                              ? 'bg-slate-900 border-amber-400 shadow-lg ring-1 ring-amber-400/30'
                              : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 text-slate-300'
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-3.5 right-3.5 p-1 rounded-full bg-amber-400 text-slate-950">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}

                          <div className="space-y-2.5">
                            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 w-fit">
                              {cat.icon}
                            </div>
                            <div>
                              <h4 className="text-base font-bold text-white">{cat.label}</h4>
                              <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">{cat.subtext}</p>
                            </div>
                          </div>

                          <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                            <Shield className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>{cat.tagline}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Requirement Type */}
                <div className="space-y-3 pt-4 border-t border-slate-800">
                  <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wide text-slate-200 flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-400" />
                    <span>Policy Status / Need</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {requirementTypes.map((req) => {
                      const isSelected = answers.requirementType === req.id;
                      return (
                        <button
                          key={req.id}
                          type="button"
                          onClick={() => setAnswers({ ...answers, requirementType: req.id })}
                          className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? 'bg-slate-900 border-blue-400 text-white ring-1 ring-blue-400/30'
                              : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 text-slate-300'
                          }`}
                        >
                          <div className="text-sm font-bold text-white">{req.label}</div>
                          <div className="text-xs text-slate-400 mt-1 leading-normal">{req.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step Action */}
                <div className="flex items-center justify-end pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-400/10"
                  >
                    <span>Proceed to Specific Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Details & Location */}
            {currentStep === 2 && !isSubmitted && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="bg-slate-900/80 p-4.5 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      {selectedCategoryObj.icon}
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Selected Sector</span>
                      <h4 className="text-base font-extrabold text-white capitalize">{selectedCategoryObj.label}</h4>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs font-bold text-amber-400 hover:underline"
                  >
                    Change Sector
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Vehicle / Family Input */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-300 block">
                      Specific Details (Vehicle Model or Family Members)
                    </label>
                    <input
                      type="text"
                      value={answers.details}
                      onChange={(e) => setAnswers({ ...answers, details: e.target.value })}
                      placeholder="e.g. Swift Dzire ZXi 2022 / Honda Activa 6G / Self + Spouse + 2 Children"
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-950 text-white border border-slate-800 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    />
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Providing exact vehicle model or family age group helps us calculate exact NCB discounts or floater slabs.
                    </p>
                  </div>

                  {/* Location Input */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-amber-400" />
                      <span>City / Taluka in Bidar Region</span>
                    </label>
                    <input
                      type="text"
                      value={answers.location}
                      onChange={(e) => setAnswers({ ...answers, location: e.target.value })}
                      placeholder="e.g. Bidar, Bhalki, Humnabad, Basavakalyan, Aurad"
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-950 text-white border border-slate-800 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    />
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Helps match nearby cashless garages and network hospitals in your local district.
                    </p>
                  </div>
                </div>

                {/* Advisory Strategy Snapshot Card */}
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-amber-400 uppercase tracking-wide">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Chandrakant Kadadi's Local Advisory Strategy</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    For <strong>{selectedCategoryObj.label}</strong> in <strong>{answers.location || 'Bidar'}</strong>, we compare options across 12+ leading national insurers (United India, Star Health, Bajaj Allianz, HDFC ERGO, ICICI Lombard) to get you maximum discount with local physical desk support.
                  </p>
                </div>

                {/* Step Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer border border-slate-800"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-400/10"
                  >
                    <span>Proceed to Strategy & Add-ons</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Strategic Goals & Add-ons */}
            {currentStep === 3 && !isSubmitted && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wide text-slate-200">
                    Select Your Strategic Policy Priorities
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Choose what matters most for your peace of mind. We will configure these riders into your policy options.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3.5">
                  {availableGoals.map((goal) => {
                    const isChecked = answers.selectedGoals.includes(goal.label);
                    return (
                      <button
                        key={goal.id}
                        type="button"
                        onClick={() => toggleGoal(goal.label)}
                        className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 flex items-start justify-between gap-4 cursor-pointer ${
                          isChecked
                            ? 'bg-slate-900 border-amber-400 text-white ring-1 ring-amber-400/30'
                            : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 text-slate-300'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="text-base font-bold text-white flex items-center gap-2">
                            <span>{goal.label}</span>
                          </div>
                          <div className="text-xs sm:text-sm text-slate-400 leading-relaxed">{goal.tip}</div>
                        </div>

                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center border shrink-0 mt-0.5 ${
                            isChecked ? 'bg-amber-400 border-amber-400 text-slate-950' : 'border-slate-700 bg-slate-950'
                          }`}
                        >
                          {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Step Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer border border-slate-800"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-400/10"
                  >
                    <span>Proceed to Document Audit</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Document Audit & WhatsApp Send */}
            {currentStep === 4 && !isSubmitted && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wide text-slate-200">
                    Document Audit & Readiness Verification
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Indicate which documents you have on hand. Missing a document? Don't worry — Chandrakant Kadadi Sir will assist you.
                  </p>
                </div>

                {/* Documents List */}
                <div className="space-y-3">
                  {availableDocs.map((doc) => {
                    const isReady = answers.readyDocs.includes(doc);
                    const isNeeded = answers.neededDocs.includes(doc);

                    return (
                      <div
                        key={doc}
                        className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <span className="text-sm font-bold text-white flex items-center gap-2">
                          <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                          <span>{doc}</span>
                        </span>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => toggleDocState(doc, 'ready')}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
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
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                              isNeeded
                                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-extrabold'
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

                {/* Customer Contact Details Form */}
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                  <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-amber-400" />
                    <span>Provide Contact Details for Your Readymade Advisory Brief</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold uppercase tracking-wider text-slate-300 block">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={answers.customerName}
                        onChange={(e) => setAnswers({ ...answers, customerName: e.target.value })}
                        placeholder="e.g. Veeresh Patil"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 text-white border border-slate-800 text-sm focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold uppercase tracking-wider text-slate-300 block">WhatsApp Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        value={answers.customerPhone}
                        onChange={(e) => setAnswers({ ...answers, customerPhone: e.target.value })}
                        placeholder="e.g. 98450 12345"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 text-white border border-slate-800 text-sm focus:outline-none focus:border-amber-400 font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Final Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer border border-slate-800"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleFormatAndSendWhatsApp}
                    className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-xl shadow-emerald-600/20 flex items-center gap-2 cursor-pointer transition-transform hover:scale-102"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Send Readymade Brief on WhatsApp</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* SUBMITTED SUCCESS STATE */}
            {isSubmitted && (
              <motion.div
                key="submitted"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center py-8 space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                </div>

                <div className="space-y-3 max-w-lg mx-auto">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30 uppercase tracking-wider">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Strategy Brief Sent Successfully</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-tight">
                    Request Received!
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    WhatsApp has launched with your formatted policy request. Chandrakant Kadadi Sir will personally review your request and contact you on <strong>+91 {answers.customerPhone}</strong> with exact quotes.
                  </p>
                </div>

                <div className="max-w-md mx-auto p-5 rounded-2xl bg-slate-900 border border-slate-800 text-left space-y-3 text-sm text-slate-300">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                    <span className="font-extrabold text-white uppercase text-xs tracking-wider">Submitted Brief Summary</span>
                    <span className="text-emerald-400 font-mono text-xs font-bold">VERIFIED</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div>
                      <span className="text-slate-400 block text-xs font-extrabold uppercase">Applicant</span>
                      <span className="font-bold text-white">{answers.customerName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-xs font-extrabold uppercase">Sector</span>
                      <span className="font-bold text-amber-400 capitalize">{answers.category} Insurance</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-xs font-extrabold uppercase">Phone</span>
                      <span className="font-mono font-bold text-emerald-400">{answers.customerPhone}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-xs font-extrabold uppercase">Documents</span>
                      <span className="font-bold text-white">
                        {answers.readyDocs.length} Ready / {answers.neededDocs.length} Need Help
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setCurrentStep(1);
                      setAnswers({
                        category: 'motor',
                        requirementType: 'renewal',
                        details: '',
                        location: 'Bidar',
                        selectedGoals: [],
                        readyDocs: [],
                        neededDocs: [],
                        customerName: '',
                        customerPhone: ''
                      });
                    }}
                    className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-sm flex items-center gap-2 cursor-pointer border border-slate-800"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Start New Policy Brief</span>
                  </button>

                  <a
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-400/10"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Call Desk: {BUSINESS_INFO.phoneDisplay}</span>
                  </a>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>

    </div>
  );
};
