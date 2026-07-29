import React, { useState, useEffect } from 'react';
import { DOCUMENT_CHECKLISTS, DocumentItem } from '../data/documentChecklists';
import { BUSINESS_INFO } from '../data/insuranceData';
import {
  FileText,
  X,
  CheckSquare,
  Square,
  Download,
  Copy,
  Check,
  MessageSquare,
  Printer,
  ShieldCheck,
  Info,
  Car,
  HeartPulse,
  Truck,
  ShieldAlert,
  HelpCircle,
  RotateCcw
} from 'lucide-react';

interface DocumentChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
  defaultPurpose?: string;
}

export const DocumentChecklistModal: React.FC<DocumentChecklistModalProps> = ({
  isOpen,
  onClose,
  defaultCategory = 'health',
  defaultPurpose = 'new_policy'
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(defaultCategory);
  const [selectedPurposeId, setSelectedPurposeId] = useState<string>(defaultPurpose);
  const [checkedDocIds, setCheckedDocIds] = useState<Record<string, boolean>>({});
  const [copiedText, setCopiedText] = useState(false);

  useEffect(() => {
    if (defaultCategory) setSelectedCategoryId(defaultCategory);
  }, [defaultCategory]);

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

  const currentCategory =
    DOCUMENT_CHECKLISTS.find((cat) => cat.id === selectedCategoryId) || DOCUMENT_CHECKLISTS[0];

  // Available purposes for current category
  const availablePurposes = currentCategory.purposes;

  // Selected purpose object
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
  const completedDocsCount = documents.filter((d) => checkedDocIds[d.id]).length;
  const progressPercent = totalDocs > 0 ? Math.round((completedDocsCount / totalDocs) * 100) : 0;

  const handleResetChecklist = () => {
    setCheckedDocIds({});
  };

  // Generate plain text breakdown for copying / downloading
  const generateFormattedText = () => {
    let text = `========================================================\n`;
    text += `${BUSINESS_INFO.name} - DOCUMENT CHECKLIST\n`;
    text += `Category: ${currentCategory.title}\n`;
    text += `Purpose: ${currentPurpose.title}\n`;
    text += `Date Prepared: ${new Date().toLocaleDateString('en-IN')}\n`;
    text += `Advisory Hotline: ${BUSINESS_INFO.phoneDisplay} | WhatsApp: +91 ${BUSINESS_INFO.whatsappRaw}\n`;
    text += `Office: ${BUSINESS_INFO.address}\n`;
    text += `========================================================\n\n`;

    text += `REQUIRED DOCUMENTS CHECKLIST (${completedDocsCount}/${totalDocs} READY):\n\n`;

    documents.forEach((doc, idx) => {
      const isChecked = checkedDocIds[doc.id] ? '[✓ READY]' : '[  PENDING]';
      const reqStatus = doc.isRequired ? '(Mandatory)' : '(Conditional/Optional)';
      text += `${idx + 1}. ${isChecked} ${doc.name} ${reqStatus}\n`;
      text += `   Details: ${doc.description}\n`;
      if (doc.format) text += `   Format: ${doc.format}\n`;
      if (doc.notes) text += `   Note: ${doc.notes}\n`;
      text += `\n`;
    });

    text += `--------------------------------------------------------\n`;
    text += `Need assistance verifying your documents? Visit our Udgir Road office in Bidar or message us on WhatsApp!\n`;
    return text;
  };

  const handleCopyText = async () => {
    try {
      const content = generateFormattedText();
      await navigator.clipboard.writeText(content);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    } catch {
      // ignore copy errors
    }
  };

  const handleDownloadTxt = () => {
    const content = generateFormattedText();
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Kadadi_Motors_${currentCategory.id}_${currentPurpose.id}_Checklist.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleWhatsAppSend = () => {
    const readyDocs = documents
      .filter((d) => checkedDocIds[d.id])
      .map((d) => `• ${d.name}`)
      .join('%0A');

    const pendingDocs = documents
      .filter((d) => !checkedDocIds[d.id])
      .map((d) => `• ${d.name}`)
      .join('%0A');

    let msg = `Hi Kadadi Motors Advisory team,%0A%0AI am reviewing required documents for *${encodeURIComponent(
      currentCategory.title
    )} - ${encodeURIComponent(currentPurpose.title)}*.%0A%0A`;

    if (readyDocs) {
      msg += `*Documents I have ready:*%0A${readyDocs}%0A%0A`;
    }
    if (pendingDocs) {
      msg += `*Documents I need help with:*%0A${pendingDocs}%0A%0A`;
    }
    msg += `Could you please guide me on how to proceed?`;

    const whatsappUrl = `https://wa.me/91${BUSINESS_INFO.whatsappRaw}?text=${msg}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Car':
        return <Car className="w-4 h-4" aria-hidden="true" />;
      case 'Truck':
        return <Truck className="w-4 h-4" aria-hidden="true" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-4 h-4" aria-hidden="true" />;
      case 'HeartPulse':
      default:
        return <HeartPulse className="w-4 h-4" aria-hidden="true" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="doc-modal-title"
        aria-describedby="doc-modal-desc"
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden relative"
      >
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-start justify-between gap-4 border-b border-slate-800 shrink-0">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold border border-amber-400/30">
              <FileText className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
              <span>Interactive Verification Tool</span>
            </div>
            <h3 id="doc-modal-title" className="text-xl sm:text-2xl font-heading font-extrabold text-white tracking-tight">
              Required Documents Checklist
            </h3>
            <p id="doc-modal-desc" className="text-xs text-slate-300">
              Verify and track documents needed for claims, new policies, or vehicle ownership transfers.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-label="Close document checklist modal"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Step 1: Category Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              1. Select Insurance Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {DOCUMENT_CHECKLISTS.map((cat) => {
                const isSelected = cat.id === selectedCategoryId;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategoryId(cat.id);
                      // set default purpose for this category
                      if (cat.purposes.length > 0) {
                        setSelectedPurposeId(cat.purposes[0].id);
                      }
                    }}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 justify-center text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                      isSelected
                        ? 'bg-blue-700 text-white border-blue-700 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {getCategoryIcon(cat.iconName)}
                    <span>{cat.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Purpose Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              2. Select Application or Claim Type
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {availablePurposes.map((p) => {
                const isSelected = p.id === selectedPurposeId;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPurposeId(p.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                      isSelected
                        ? 'bg-slate-900 text-amber-300 border-slate-900 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {p.title}
                  </button>
                );
              })}
            </div>

            {currentPurpose && (
              <p className="text-xs text-slate-500 mt-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                <Info className="w-3.5 h-3.5 text-blue-600 inline mr-1 -mt-0.5" aria-hidden="true" />
                {currentPurpose.description}
              </p>
            )}
          </div>

          {/* Progress Bar & Actions header */}
          <div className="bg-blue-50/70 rounded-2xl p-4 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-auto flex-1 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>Verification Progress</span>
                <span className="text-blue-800 font-extrabold">
                  {completedDocsCount} of {totalDocs} Prepared ({progressPercent}%)
                </span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {completedDocsCount > 0 && (
              <button
                onClick={handleResetChecklist}
                className="shrink-0 text-[11px] font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md px-1"
              >
                <RotateCcw className="w-3 h-3" aria-hidden="true" />
                <span>Reset Selection</span>
              </button>
            )}
          </div>

          {/* Step 3: Interactive Checklist Items */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                3. Check Required Documents Below
              </h4>
              <span className="text-[11px] text-slate-400">Click checkboxes as you assemble files</span>
            </div>

            <div className="space-y-2.5">
              {documents.map((doc) => {
                const isChecked = !!checkedDocIds[doc.id];
                return (
                  <div
                    key={doc.id}
                    onClick={() => toggleDoc(doc.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      isChecked
                        ? 'bg-emerald-50/50 border-emerald-300 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDoc(doc.id);
                      }}
                      className="mt-0.5 shrink-0 text-slate-400 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md"
                      aria-label={`Toggle status for ${doc.name}`}
                    >
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 text-emerald-600 fill-emerald-100" aria-hidden="true" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-400" aria-hidden="true" />
                      )}
                    </button>

                    <div className="flex-1 space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className={`text-sm font-bold ${isChecked ? 'text-emerald-950 line-through/30' : 'text-slate-900'}`}>
                          {doc.name}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {doc.isRequired ? (
                            <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold">
                              Mandatory
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-bold">
                              Conditional
                            </span>
                          )}

                          {doc.format && (
                            <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-100 text-[10px] font-semibold">
                              {doc.format}
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">{doc.description}</p>

                      {doc.notes && (
                        <p className="text-[11px] text-amber-800 bg-amber-50/80 p-2 rounded-lg border border-amber-200/70 mt-1 font-medium">
                          <strong>Note:</strong> {doc.notes}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Modal Bottom Actions Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 shrink-0 flex flex-wrap items-center justify-between gap-3">
          
          {/* Export & Copy utilities */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleDownloadTxt}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              title="Download text file with your checklist"
            >
              <Download className="w-3.5 h-3.5 text-blue-700" aria-hidden="true" />
              <span>Download Text File</span>
            </button>

            <button
              onClick={handleCopyText}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              {copiedText ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
                  <span>Copy to Clipboard</span>
                </>
              )}
            </button>
          </div>

          {/* Direct WhatsApp Verification CTA */}
          <button
            onClick={handleWhatsAppSend}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-1"
          >
            <MessageSquare className="w-4 h-4" aria-hidden="true" />
            <span>Send Checklist to WhatsApp Desk</span>
          </button>

        </div>

      </div>
    </div>
  );
};
