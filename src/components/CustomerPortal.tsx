import React, { useState, useEffect } from 'react';
import { AppStore, CustomerProfile, CustomerInquiry } from '../lib/store';
import { KmProgressRing } from './KmProgressRing';
import { RewardsCatalogModal } from './RewardsCatalogModal';
import { DocumentPreviewModal, DocumentPreviewItem } from './DocumentPreviewModal';
import {
  User,
  Phone,
  MapPin,
  Award,
  Crown,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  LogOut,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  PlusCircle,
  Upload,
  Eye
} from 'lucide-react';

interface CustomerPortalProps {
  onOpenChecklist: () => void;
  onOpenQuoteModal: () => void;
}

export const CustomerPortal: React.FC<CustomerPortalProps> = ({
  onOpenChecklist,
  onOpenQuoteModal
}) => {
  const [currentUser, setCurrentUser] = useState<CustomerProfile | null>(AppStore.getCurrentUser());
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>([]);
  const [showRewardsModal, setShowRewardsModal] = useState(false);

  // In-Browser Document Previewer State
  const [previewDoc, setPreviewDoc] = useState<DocumentPreviewItem | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Registration / Login Form
  const [nameInput, setNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [cityInput, setCityInput] = useState('Bidar');

  useEffect(() => {
    const handleUpdate = () => {
      const user = AppStore.getCurrentUser();
      setCurrentUser(user);
      if (user) {
        const allInquiries = AppStore.getInquiries();
        const userInquiries = allInquiries.filter(
          (i) => i.phone === user.phone || i.customerName.toLowerCase() === user.fullName.toLowerCase()
        );
        setInquiries(userInquiries.length > 0 ? userInquiries : allInquiries.slice(0, 2));
      } else {
        setInquiries([]);
      }
    };

    handleUpdate();
    window.addEventListener('km_store_updated', handleUpdate);
    return () => window.removeEventListener('km_store_updated', handleUpdate);
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !phoneInput.trim()) return;
    const user = AppStore.loginOrCreateUser(nameInput, phoneInput, cityInput);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    AppStore.logoutUser();
    setCurrentUser(null);
  };

  const getStatusBadge = (status: CustomerInquiry['status']) => {
    switch (status) {
      case 'issued':
        return { label: 'Policy Issued & Active', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
      case 'verified':
        return { label: 'Verified by Chandu Kadadi', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' };
      case 'docs_uploaded':
        return { label: 'Documents Under Review', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
      case 'pending':
      default:
        return { label: 'Pending Verification', color: 'bg-slate-800 text-slate-300 border-slate-700' };
    }
  };

  return (
    <section id="customer-portal" className="py-16 sm:py-24 bg-slate-950 text-white relative overflow-hidden min-h-[70vh]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10 relative z-10">
        
        {/* Title Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-800 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-widest mb-2">
              <User className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
              <span>Customer Self-Service Vault</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white">
              My Profile & Document Hub
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Track active policy inquiries, document readiness, and earned KM Points in real-time.
            </p>
          </div>

          {currentUser && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold transition-all flex items-center gap-2"
            >
              <LogOut className="w-4 h-4 text-rose-400" aria-hidden="true" />
              <span>Sign Out Profile</span>
            </button>
          )}
        </div>

        {/* Not Logged In State -> Fast Profile Setup */}
        {!currentUser ? (
          <div className="max-w-xl mx-auto glass-card rounded-3xl p-8 border border-amber-500/30 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-400/30">
                <Crown className="w-7 h-7" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-heading font-black text-white">Create Your Client Profile</h3>
              <p className="text-xs text-slate-300">
                Access your submitted document checklists, view policy status, and claim <strong>150 KM Points Welcome Bonus</strong>.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="e.g., Veeresh Patil"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 text-white border border-slate-800 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Mobile Number (WhatsApp) *</label>
                <input
                  type="tel"
                  required
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  placeholder="e.g., 98451 22345"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 text-white border border-slate-800 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">City / Location</label>
                <input
                  type="text"
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  placeholder="e.g., Bidar (Udgir Road)"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 text-white border border-slate-800 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 font-black text-xs shadow-lg transition-all"
              >
                Create Profile & Claim 150 KM Points
              </button>
            </form>
          </div>
        ) : (
          /* Logged In Dashboard */
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Profile Overview Card */}
            <div className="lg:col-span-4 glass-card rounded-3xl p-6 border border-slate-800 space-y-6 shadow-xl">
              <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-heading font-black text-xl border border-amber-400/30 shrink-0">
                  {currentUser.fullName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-heading font-black text-white">{currentUser.fullName}</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <Phone className="w-3 h-3 text-blue-400" aria-hidden="true" />
                    <span>{currentUser.phone}</span>
                  </p>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" aria-hidden="true" />
                    <span>{currentUser.city}</span>
                  </p>
                </div>
              </div>

              {/* Wallet Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-slate-900 to-blue-900/40 border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-amber-300">
                  <span>KM Points Balance</span>
                  <Crown className="w-4 h-4 text-amber-400" aria-hidden="true" />
                </div>
                <div className="text-3xl font-heading font-black text-amber-400">
                  {currentUser.kmPoints} Points
                </div>
                <div className="text-[11px] text-slate-300">
                  Tier: <strong className="text-white font-extrabold">{currentUser.tier}</strong>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={onOpenChecklist}
                  className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Submit Document Checklist (+100 Pts)</span>
                </button>

                <button
                  onClick={onOpenQuoteModal}
                  className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-blue-400" aria-hidden="true" />
                  <span>Request Free Policy Advice</span>
                </button>
              </div>
            </div>

            {/* Right Active Inquiries & Document Hub */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Visual Progress Ring Component */}
              <KmProgressRing
                points={currentUser.kmPoints}
                tier={currentUser.tier}
                onOpenRewards={() => setShowRewardsModal(true)}
                onOpenChecklist={onOpenChecklist}
              />

              <div className="flex items-center justify-between pt-2">
                <h3 className="text-xl font-heading font-black text-white">
                  My Active Inquiries & Document Status
                </h3>
                <span className="text-xs text-amber-400 font-bold">{inquiries.length} Record(s)</span>
              </div>

              {inquiries.length === 0 ? (
                <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
                  <FileText className="w-10 h-10 text-slate-600 mx-auto" aria-hidden="true" />
                  <p className="text-xs text-slate-400">No active inquiries submitted yet under this mobile number.</p>
                  <button
                    onClick={onOpenChecklist}
                    className="px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs"
                  >
                    Open Document Checklist Tool
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inq) => {
                    const badge = getStatusBadge(inq.status);
                    return (
                      <div
                        key={inq.id}
                        className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-slate-700 transition-colors"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono font-bold text-amber-400">{inq.id}</span>
                              <span className="text-xs font-extrabold text-white">{inq.categoryTitle}</span>
                            </div>
                            <p className="text-xs text-slate-400">{inq.purposeTitle}</p>
                          </div>

                          <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold border ${badge.color}`}>
                            {badge.label}
                          </span>
                        </div>

                        {/* Documents breakdown */}
                        <div className="grid sm:grid-cols-2 gap-4 text-xs">
                          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                            <span className="font-bold text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                              Ready Documents ({inq.readyDocs.length})
                            </span>
                            <ul className="text-slate-300 space-y-0.5">
                              {inq.readyDocs.slice(0, 3).map((d, i) => (
                                <li key={i} className="truncate">{d}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                            <span className="font-bold text-amber-400 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                              Pending / Need Help ({inq.pendingDocs.length})
                            </span>
                            <ul className="text-slate-300 space-y-0.5">
                              {inq.pendingDocs.slice(0, 3).map((d, i) => (
                                <li key={i} className="truncate">{d}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Uploaded Files & Upload Action */}
                        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-300">Attached Files & Uploads ({inq.uploadedFiles?.length || 0}):</span>
                            <label className="cursor-pointer px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[11px] flex items-center gap-1.5 shadow-md transition-all">
                              <Upload className="w-3.5 h-3.5 text-slate-950" aria-hidden="true" />
                              <span>Upload Document (+50 Pts)</span>
                              <input
                                type="file"
                                className="hidden"
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    const file = e.target.files[0];
                                    AppStore.uploadDocumentToInquiry(inq.id, file.name);
                                    setInquiries(AppStore.getInquiries().filter((i) => i.phone.includes(currentUser.phone)));
                                    setCurrentUser(AppStore.getCurrentUser());
                                  }
                                }}
                              />
                            </label>
                          </div>

                          {inq.uploadedFiles && inq.uploadedFiles.length > 0 ? (
                            <div className="flex flex-wrap gap-2 pt-1">
                              {inq.uploadedFiles.map((f, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => {
                                    setPreviewDoc({
                                      fileName: f.name,
                                      fileSize: '1.2 MB',
                                      uploadDate: new Date(inq.submittedAt).toLocaleDateString('en-IN'),
                                      customerName: inq.customerName,
                                      customerPhone: inq.phone,
                                      inquiryId: inq.id,
                                      categoryTitle: inq.categoryTitle,
                                      verifiedByAdvisor: inq.status === 'verified' || inq.status === 'issued'
                                    });
                                    setShowPreviewModal(true);
                                  }}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/30 hover:border-amber-400 text-xs text-amber-300 font-mono transition-all group cursor-pointer"
                                  title="Click to view document in-browser"
                                >
                                  <FileText className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                                  <span className="truncate max-w-[140px]">{f.name}</span>
                                  <span className="px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[10px] font-sans font-bold flex items-center gap-0.5 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                                    <Eye className="w-3 h-3" />
                                    <span>Preview</span>
                                  </span>
                                </button>
                              ))}
                            </div>
                          ) : (
                            <p className="text-[11px] text-slate-500 italic">No direct files uploaded yet. Click above to attach RC, Aadhaar, or Policy PDF.</p>
                          )}
                        </div>

                        {inq.advisorNotes && (
                          <div className="p-3 rounded-2xl bg-blue-950/40 border border-blue-800/50 text-xs text-blue-200">
                            <strong>Chandrakant Kadadi Advisor Note:</strong> {inq.advisorNotes}
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs pt-1 text-slate-400">
                          <span>Submitted: {new Date(inq.submittedAt).toLocaleDateString('en-IN')}</span>
                          <a
                            href={`https://wa.me/919448831388?text=Hi%20Chandu%20Kadadi%20Sir,%20following%20up%20on%20inquiry%20${inq.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
                          >
                            <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>WhatsApp Follow-up</span>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>

          </div>
        )}

      </div>

      {/* Rewards Catalog Modal */}
      <RewardsCatalogModal
        isOpen={showRewardsModal}
        onClose={() => setShowRewardsModal(false)}
        currentUserPoints={currentUser?.kmPoints || 150}
      />

      {/* In-Browser Document Preview Modal */}
      <DocumentPreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        document={previewDoc}
      />
    </section>
  );
};
