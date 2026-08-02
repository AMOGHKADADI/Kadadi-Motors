import React, { useState } from 'react';
import { DOCUMENT_CHECKLISTS } from '../data/documentChecklists';
import { BUSINESS_INFO } from '../data/insuranceData';
import { AppStore } from '../lib/store';
import {
  FileText,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Sparkles,
  PhoneCall,
  UserCheck,
  Send,
  RotateCcw,
  ShieldCheck,
  Award,
  CheckSquare,
  Square,
  Car,
  Truck,
  HeartPulse,
  ShieldAlert,
  Building,
  UploadCloud
} from 'lucide-react';

interface DocumentChecklistHubProps {
  onCloseModal?: () => void;
  onOpenQuoteModal?: (category?: string) => void;
  initialCategory?: string;
  initialPurpose?: string;
}

export const DocumentChecklistHub: React.FC<DocumentChecklistHubProps> = ({
  initialCategory = 'health',
  initialPurpose = 'new_policy',
  onOpenQuoteModal
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(initialCategory);
  const [selectedPurposeId, setSelectedPurposeId] = useState<string>(initialPurpose);
  const [checkedDocIds, setCheckedDocIds] = useState<Record<string, boolean>>({});

  // Form State for Direct Inquiry Submission
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);

  const currentCategory =
    DOCUMENT_CHECKLISTS.find((cat) => cat.id === selectedCategoryId) || DOCUMENT_CHECKLISTS[0];

  const availablePurposes = currentCategory.purposes;
  const currentPurpose =
    availablePurposes.find((p) => p.id === selectedPurposeId) || availablePurposes[0];

  const documents = currentPurpose ? currentPurpose.documents : [];

  const toggleDoc = (docId: string) => {
    setCheckedDocIds((prev) => ({
      ...prev,
      [docId]: !prev[docId]
    }));
  };

  const totalDocs = documents.length;
  const readyDocs = documents.filter((d) => checkedDocIds[d.id]);
  const pendingDocs = documents.filter((d) => !checkedDocIds[d.id]);
  const readyCount = readyDocs.length;
  const progressPercent = totalDocs > 0 ? Math.round((readyCount / totalDocs) * 100) : 0;

  const handleReset = () => {
    setCheckedDocIds({});
  };

  // Submit Inquiry & Send to WhatsApp
  const handleSubmitInquiryAndWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Please enter your Name and Mobile Number to send inquiry to Chandrakant Kadadi Sir.');
      return;
    }

    const readyNames = readyDocs.map((d) => `✅ ${d.name}`);
    const pendingNames = pendingDocs.map((d) => `⚠️ ${d.name} (Need Help)`);

    // 1. Add to store
    const newInquiry = AppStore.addInquiry({
      customerName,
      phone: customerPhone,
      city: 'Bidar',
      category: currentCategory.id,
      categoryTitle: currentCategory.title,
      purposeTitle: currentPurpose.title,
      readyDocs: readyNames,
      pendingDocs: pendingNames,
      advisorNotes: vehicleNo ? `Vehicle/Policy Reference: ${vehicleNo}` : ''
    });

    setEarnedPoints(100);
    setSubmittedSuccess(true);

    // 2. Format Goated WhatsApp Message for Chandrakant Kadadi
    let msg = `*OFFICIAL INSURANCE DOCUMENT INQUIRY*%0A`;
    msg += `------------------------------------------%0A`;
    msg += `*Client Name:* ${encodeURIComponent(customerName)}%0A`;
    msg += `*Mobile No:* ${encodeURIComponent(customerPhone)}%0A`;
    if (vehicleNo) msg += `*Vehicle / Policy Ref:* ${encodeURIComponent(vehicleNo)}%0A`;
    msg += `*Insurance Sector:* ${encodeURIComponent(currentCategory.title)}%0A`;
    msg += `*Application Type:* ${encodeURIComponent(currentPurpose.title)}%0A`;
    msg += `*Inquiry ID:* ${newInquiry.id}%0A`;
    msg += `------------------------------------------%0A%0A`;

    msg += `*DOCUMENTS I HAVE READY (${readyCount}/${totalDocs}):*%0A`;
    if (readyNames.length > 0) {
      readyNames.forEach((d) => {
        msg += `${encodeURIComponent(d)}%0A`;
      });
    } else {
      msg += `None selected yet.%0A`;
    }

    msg += `%0A*DOCUMENTS NEEDING YOUR HELP (${pendingDocs.length}):*%0A`;
    if (pendingNames.length > 0) {
      pendingNames.forEach((d) => {
        msg += `${encodeURIComponent(d)}%0A`;
      });
    } else {
      msg += `All required documents are ready!%0A`;
    }

    msg += `%0A------------------------------------------%0A`;
    msg += `*Chandrakant Kadadi Sir*, please guide me on policy issuance / claim settlement!`;

    const waUrl = `https://wa.me/91${BUSINESS_INFO.whatsappRaw}?text=${msg}`;
    
    // Delay slightly to let user see confirmation
    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 800);
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Car':
        return <Car className="w-5 h-5" aria-hidden="true" />;
      case 'Truck':
        return <Truck className="w-5 h-5" aria-hidden="true" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5" aria-hidden="true" />;
      case 'Building':
        return <Building className="w-5 h-5" aria-hidden="true" />;
      case 'HeartPulse':
      default:
        return <HeartPulse className="w-5 h-5" aria-hidden="true" />;
    }
  };

  return (
    <section id="doc-checklist-hub" className="py-12 sm:py-20 bg-slate-950 text-white relative overflow-hidden">
      
      {/* Background Lighting & Sheen */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-400/30 text-orange-200 text-xs font-black uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-orange-300" aria-hidden="true" />
            <span>Interactive Document Checklist Helper Tool</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
            Check Your Required Documents & <br className="hidden sm:inline" />
            <span className="text-orange-200">
              Send Directly to Chandrakant Kadadi Sir
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Designed for 100% ease of use. Simply select what documents you already have and what you need help with. We automatically format your inquiry and send it directly to Chandrakant Kadadi Sir's WhatsApp!
          </p>
        </div>

        {/* Main 2-Column Hub Container */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Selector & Checklist Grid */}
          <div className="lg:col-span-8 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800/90 shadow-2xl space-y-8 backdrop-blur-xl">
            
            {/* Step 1: Insurance Category Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-black text-orange-200 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-extrabold text-[11px]">1</span>
                  <span>Select Insurance Category</span>
                </label>
                <span className="text-[11px] text-slate-400 font-medium">All Insurance Sectors Covered</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {DOCUMENT_CHECKLISTS.map((cat) => {
                  const isSelected = cat.id === selectedCategoryId;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategoryId(cat.id);
                        if (cat.purposes.length > 0) {
                          setSelectedPurposeId(cat.purposes[0].id);
                        }
                      }}
                      className={`p-3.5 rounded-2xl border text-xs font-extrabold transition-all duration-200 flex flex-col items-center gap-2 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-600/20 scale-102'
                          : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
                      }`}
                    >
                      {getCategoryIcon(cat.iconName)}
                      <span>{cat.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Application / Claim Type */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-black text-orange-200 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-extrabold text-[11px]">2</span>
                  <span>Select Specific Requirement</span>
                </label>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {availablePurposes.map((p) => {
                  const isSelected = p.id === selectedPurposeId;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPurposeId(p.id)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      {p.title}
                    </button>
                  );
                })}
              </div>

              {currentPurpose && (
                <div className="mt-3 p-3.5 rounded-xl bg-blue-950/50 border border-blue-800/50 text-xs text-blue-200 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="leading-relaxed">{currentPurpose.description}</p>
                </div>
              )}
            </div>

            {/* Progress Bar & Counter */}
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-auto flex-1 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-extrabold text-white">
                  <span>Document Preparedness</span>
                  <span className="text-amber-400">
                    {readyCount} of {totalDocs} Ready ({progressPercent}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {readyCount > 0 && (
                <button
                  onClick={handleReset}
                  className="shrink-0 text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg px-2 py-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Reset All</span>
                </button>
              )}
            </div>

            {/* Step 3: Interactive Visual Checklist Items */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-orange-200 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-extrabold text-[11px]">3</span>
                  <span>Tap Each Document You Have Ready</span>
                </label>
                <span className="text-[11px] text-slate-400">Tap to toggle Ready vs Pending</span>
              </div>

              <div className="space-y-3">
                {documents.map((doc) => {
                  const isChecked = !!checkedDocIds[doc.id];
                  return (
                    <div
                      key={doc.id}
                      onClick={() => toggleDoc(doc.id)}
                      className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-4 ${
                        isChecked
                          ? 'bg-emerald-950/40 border-emerald-500/60 shadow-lg shadow-emerald-500/5'
                          : 'bg-slate-950/80 border-slate-800/90 hover:border-slate-700'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isChecked ? (
                          <CheckSquare className="w-6 h-6 text-emerald-400" aria-hidden="true" />
                        ) : (
                          <Square className="w-6 h-6 text-slate-600" aria-hidden="true" />
                        )}
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className={`text-sm font-extrabold ${isChecked ? 'text-emerald-300' : 'text-white'}`}>
                            {doc.name}
                          </span>

                          <div className="flex items-center gap-2">
                            {isChecked ? (
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400" aria-hidden="true" />
                                <span>I HAVE THIS</span>
                              </span>
                            ) : (
                              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px] font-bold flex items-center gap-1">
                                <XCircle className="w-3 h-3 text-amber-400" aria-hidden="true" />
                                <span>NEED HELP</span>
                              </span>
                            )}

                            {doc.isRequired && (
                              <span className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-300 border border-rose-500/30 text-[10px] font-bold">
                                Mandatory
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed">{doc.description}</p>
                        {doc.notes && (
                          <p className="text-[11px] text-amber-300 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20 mt-1 font-medium">
                            <strong>Tip:</strong> {doc.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Send to Chandrakant Kadadi Sir WhatsApp Form */}
          <div className="lg:col-span-4 bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6 sticky top-24 backdrop-blur-xl">
            
            <div className="space-y-2 border-b border-slate-800 pb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/20 text-blue-300 border border-blue-500/30 text-[11px] font-bold">
                <MessageSquare className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
                <span>1-Tap Direct WhatsApp Desk</span>
              </div>
              <h3 className="text-xl font-heading font-black text-white">
                Send to Chandrakant Kadadi Sir
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Enter your details below to send this formatted document checklist directly to Chandrakant Kadadi's official WhatsApp desk for instant assistance.
              </p>
            </div>

            {submittedSuccess ? (
              <div className="p-5 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Award className="w-6 h-6" aria-hidden="true" />
                </div>
                <h4 className="text-lg font-heading font-extrabold text-white">Inquiry Formatted & Sent!</h4>
                <p className="text-xs text-emerald-200">
                  Your document checklist has been formatted and submitted. WhatsApp has opened to message Chandrakant Kadadi Sir.
                </p>
                <button
                  onClick={() => setSubmittedSuccess(false)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all mt-2 cursor-pointer"
                >
                  Send Another Checklist
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiryAndWhatsApp} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g., Veeresh Patil"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-white border border-slate-800 text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Mobile Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g., 98451 22345"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-white border border-slate-800 text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Vehicle No. / Policy Ref. (Optional)
                  </label>
                  <input
                    type="text"
                    value={vehicleNo}
                    onChange={(e) => setVehicleNo(e.target.value)}
                    placeholder="e.g., KA-38-M-4512"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-white border border-slate-800 text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Summary Box */}
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Selected Sector:</span>
                    <strong className="text-orange-200">{currentCategory.title}</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Ready Documents:</span>
                    <strong className="text-emerald-400">{readyCount} Files</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Pending / Need Help:</span>
                    <strong className="text-orange-300">{pendingDocs.length} Files</strong>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-2 transform active:scale-98 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 cursor-pointer"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>Send Checklist to Chandrakant Kadadi Sir</span>
                </button>

                <p className="text-[10px] text-center text-slate-400">
                  ⚡ Directly opens WhatsApp chat with Chandrakant Kadadi (+91 94488 31388) with formatted list.
                </p>
              </form>
            )}

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
                <span>Direct Hotline:</span>
              </span>
              <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="font-bold text-blue-400 hover:underline">
                {BUSINESS_INFO.phoneDisplay}
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
