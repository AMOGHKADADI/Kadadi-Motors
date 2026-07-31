import React, { useState } from 'react';
import {
  X,
  FileText,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  Printer,
  Share2,
  CheckCircle2,
  ShieldCheck,
  Eye,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Sparkles,
  Info,
  Calendar,
  User,
  Phone,
  MapPin,
  Award,
  Lock,
  ExternalLink
} from 'lucide-react';

export interface DocumentPreviewItem {
  fileName: string;
  fileType?: 'pdf' | 'image' | 'doc';
  fileSize?: string;
  uploadDate?: string;
  customerName?: string;
  customerPhone?: string;
  inquiryId?: string;
  categoryTitle?: string;
  verifiedByAdvisor?: boolean;
}

interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: DocumentPreviewItem | null;
  onMarkVerified?: (fileName: string) => void;
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  isOpen,
  onClose,
  document: doc,
  onMarkVerified
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [rotation, setRotation] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages] = useState<number>(2);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(doc?.verifiedByAdvisor || false);

  if (!isOpen || !doc) return null;

  const fileNameLower = doc.fileName.toLowerCase();
  const isPdf = fileNameLower.endsWith('.pdf') || doc.fileType === 'pdf' || !fileNameLower.match(/\.(jpg|jpeg|png|webp)$/);
  
  const formattedSize = doc.fileSize || '1.4 MB';
  const uploadDate = doc.uploadDate || '31 Jul 2026, 11:30 AM';
  const customerName = doc.customerName || 'Veeresh Patil';
  const customerPhone = doc.customerPhone || '98451 22345';
  const inquiryId = doc.inquiryId || 'INQ-9801';
  const categoryTitle = doc.categoryTitle || 'Commercial Goods & Motor Insurance';

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 25, 50));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  const handleDownload = () => {
    // Generate simulated document blob download
    const mockContent = `KADADI MOTORS INSURANCE ADVISORY - OFFICIAL DOCUMENT RECORD\n=======================================================\nInquiry ID: ${inquiryId}\nClient Name: ${customerName}\nMobile: ${customerPhone}\nDocument File Name: ${doc.fileName}\nVerification Desk: Chandrakant Kadadi (Bidar Desk)\nStatus: VERIFIED & AUDITED\n=======================================================\nThank you for choosing Kadadi Motors Insurance Advisory.`;
    const blob = new Blob([mockContent], { type: isPdf ? 'application/pdf' : 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = doc.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const msg = `Hi ${customerName}, Chandrakant Kadadi here from Kadadi Motors. I have reviewed and verified your uploaded document: *${doc.fileName}* for inquiry *${inquiryId}*.`;
    window.open(`https://wa.me/91${customerPhone.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="doc-preview-modal-title"
      className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-fadeIn ${
        isFullScreen ? 'p-0' : ''
      }`}
    >
      <div
        className={`relative w-full ${
          isFullScreen ? 'h-screen max-w-none rounded-none' : 'max-w-5xl rounded-3xl max-h-[92vh]'
        } bg-slate-900 border border-amber-500/40 shadow-2xl overflow-hidden text-white flex flex-col`}
      >
        {/* Top Viewer Control Bar */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          
          {/* File Info */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 font-bold text-xs">
              {isPdf ? 'PDF' : 'IMG'}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-black uppercase font-mono">
                  {inquiryId}
                </span>
                <span className="text-xs text-slate-400 truncate">{customerName}</span>
              </div>
              <h3 id="doc-preview-modal-title" className="text-sm sm:text-base font-extrabold text-white truncate max-w-xs sm:max-w-md">
                {doc.fileName}
              </h3>
            </div>
          </div>

          {/* Center Zoom & Navigation Controls */}
          <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={handleZoomOut}
              className="p-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Zoom Out (-)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold text-amber-300 px-2 min-w-[50px] text-center">
              {zoomLevel}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Zoom In (+)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            <div className="w-px h-5 bg-slate-800 mx-1"></div>

            <button
              onClick={handleRotate}
              className="p-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Rotate 90°"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            {isPdf && (
              <>
                <div className="w-px h-5 bg-slate-800 mx-1"></div>
                <button
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="p-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 disabled:opacity-40 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-[11px] font-mono text-slate-400 px-1">
                  {currentPage} / {totalPages}
                </span>
                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="p-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 disabled:opacity-40 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
              title="Download File"
            >
              <Download className="w-3.5 h-3.5 text-slate-950" />
              <span className="hidden sm:inline">Download</span>
            </button>

            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer hidden sm:flex"
              title="Toggle Fullscreen"
            >
              {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
              aria-label="Close Preview Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewer Main Display & Details Sidebar */}
        <div className="grid lg:grid-cols-12 flex-1 overflow-hidden">
          
          {/* Main Interactive Document Canvas */}
          <div className="lg:col-span-8 bg-slate-950 p-4 sm:p-8 overflow-auto flex items-center justify-center relative min-h-[350px] sm:min-h-[500px]">
            
            {/* Stamp Overlay */}
            {isVerified && (
              <div className="absolute top-6 right-6 z-20 px-3.5 py-1.5 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 font-mono font-black text-xs uppercase tracking-wider rotate-[-6deg] shadow-2xl flex items-center gap-1.5 backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified • Chandu Kadadi Desk</span>
              </div>
            )}

            <div
              className="transition-all duration-200 shadow-2xl rounded-2xl bg-white text-slate-900 p-6 sm:p-10 w-full max-w-xl mx-auto border border-slate-300 select-none relative"
              style={{
                transform: `scale(${zoomLevel / 100}) rotate(${rotation}deg)`,
                transformOrigin: 'center center'
              }}
            >
              {/* Document Header Rendering */}
              <div className="border-b-2 border-slate-800 pb-4 mb-6 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-amber-400 font-mono text-[10px] font-black uppercase">
                      OFFICIAL ADVISORY RECORD
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">ID: {inquiryId}</span>
                  </div>
                  <h2 className="text-xl font-heading font-black text-slate-900 mt-1 uppercase tracking-tight">
                    {doc.fileName.replace(/\.[^/.]+$/, '').replace(/_/g, ' ')}
                  </h2>
                  <p className="text-xs text-slate-600 font-serif">Chandrakant Kadadi Desk • Bidar, Karnataka</p>
                </div>
                <div className="text-right font-mono text-[10px] text-slate-500">
                  <span>PAGE {currentPage} OF {totalPages}</span>
                  <div className="font-bold text-slate-900 mt-1">VERIFIED ORIGINAL</div>
                </div>
              </div>

              {/* Document Content Body */}
              <div className="space-y-4 text-xs font-serif text-slate-800 leading-relaxed min-h-[260px]">
                {currentPage === 1 ? (
                  <>
                    <div className="p-3 bg-slate-100 rounded-xl border border-slate-300 font-mono text-[11px] space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Client Holder:</span>
                        <span className="font-bold text-slate-900">{customerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Registered Phone:</span>
                        <span className="font-bold text-slate-900">{customerPhone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Location Sector:</span>
                        <span className="font-bold text-slate-900">{categoryTitle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Uploaded On:</span>
                        <span className="font-bold text-slate-900">{uploadDate}</span>
                      </div>
                    </div>

                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-slate-900 text-xs font-mono space-y-2">
                      <div className="flex items-center justify-between font-bold text-amber-900 border-b border-amber-200 pb-1">
                        <span>DOCUMENT SCAN INSPECTION</span>
                        <span>STATUS: PASS</span>
                      </div>
                      <p className="text-[11px] text-slate-700 font-sans">
                        This digital copy has been verified by the automated scanner and presented to Chandrakant Kadadi Sir for policy schedule endorsement and RTO claim alignment.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-[11px] font-mono pt-2">
                      <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
                        <span className="text-slate-500 block text-[9px] uppercase">Image Quality</span>
                        <span className="font-extrabold text-emerald-700">300 DPI High Res</span>
                      </div>
                      <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
                        <span className="text-slate-500 block text-[9px] uppercase">Watermark Integrity</span>
                        <span className="font-extrabold text-blue-700">Valid Digital Signature</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-300 font-mono text-[11px] space-y-2">
                      <h4 className="font-extrabold text-slate-900 uppercase">Policy Endorsement & Add-On Terms (Page 2)</h4>
                      <ul className="list-disc pl-4 space-y-1 text-slate-700">
                        <li>Zero Depreciation Cover & Engine Protection active for Bidar jurisdiction.</li>
                        <li>No Claim Bonus (NCB) entitlement verified at 35% discount tier.</li>
                        <li>24x7 Roadside Assistance active across Gulbarga, Bidar, and Zaheerabad highway corridors.</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-xs font-mono">
                      ✓ Authenticated for direct claim processing at partner garages in Bidar.
                    </div>
                  </>
                )}
              </div>

              {/* Watermark Footer Stamp */}
              <div className="mt-6 pt-4 border-t border-slate-300 flex items-center justify-between font-mono text-[10px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>KADADI MOTORS • BIDAR OFFICIAL DESK</span>
                </div>
                <span>AUTHENTICATED RECORD</span>
              </div>
            </div>

          </div>

          {/* Right Details & Inspection Panel */}
          <div className="lg:col-span-4 p-5 sm:p-6 bg-slate-900 border-l border-slate-800/80 overflow-y-auto space-y-6">
            
            {/* Inspection Status Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                  Document Audit Status
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${
                  isVerified
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}>
                  {isVerified ? 'VERIFIED BY ADVISOR' : 'PENDING REVIEW'}
                </span>
              </div>

              <div className="text-xs text-slate-300 space-y-1">
                <p>
                  Uploaded by <strong className="text-white">{customerName}</strong> for insurance claim / renewal process.
                </p>
                <p className="text-[11px] text-slate-400 font-mono">
                  Timestamp: {uploadDate}
                </p>
              </div>

              {onMarkVerified && (
                <button
                  onClick={() => {
                    const newStatus = !isVerified;
                    setIsVerified(newStatus);
                    if (onMarkVerified) onMarkVerified(doc.fileName);
                  }}
                  className={`w-full py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isVerified
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md font-black'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isVerified ? 'Unmark Verification' : 'Approve & Mark Verified'}</span>
                </button>
              )}
            </div>

            {/* Document Metadata Details */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-white flex items-center gap-1.5 uppercase tracking-wider">
                <Info className="w-4 h-4 text-amber-400" />
                <span>File Metadata</span>
              </h4>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">File Name:</span>
                  <span className="text-amber-300 font-bold truncate max-w-[170px]">{doc.fileName}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">File Size:</span>
                  <span className="text-slate-200">{formattedSize}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Format:</span>
                  <span className="text-slate-200 uppercase">{isPdf ? 'PDF Document' : 'Image (High Res)'}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Inquiry ID:</span>
                  <span className="text-amber-400 font-bold">{inquiryId}</span>
                </div>
              </div>
            </div>

            {/* Client Context Details */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-white flex items-center gap-1.5 uppercase tracking-wider">
                <User className="w-4 h-4 text-amber-400" />
                <span>Client Profile</span>
              </h4>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Client Name:</span>
                  <span className="font-bold text-white">{customerName}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Mobile Phone:</span>
                  <span className="font-mono text-amber-300 font-bold">{customerPhone}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Insurance Sector:</span>
                  <span className="text-slate-200 font-semibold">{categoryTitle}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <button
                onClick={handleWhatsAppShare}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Notify Customer on WhatsApp</span>
              </button>

              <button
                onClick={handlePrint}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>Print Document Copy</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
