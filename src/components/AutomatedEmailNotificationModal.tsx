import React, { useState } from 'react';
import { AdminEmailNotification } from '../lib/store';
import { DocumentPreviewItem } from './DocumentPreviewModal';
import {
  X,
  Mail,
  CheckCircle2,
  Clock,
  Search,
  FileText,
  User,
  Phone,
  MapPin,
  Send,
  ExternalLink,
  Copy,
  Check,
  Zap,
  Filter,
  Sparkles,
  Inbox,
  AlertCircle,
  Eye
} from 'lucide-react';

interface AutomatedEmailNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AdminEmailNotification[];
  onMarkRead: (id: string) => void;
  onTriggerTestEmail: () => void;
  onViewInquiry: (inquiryId: string) => void;
  onPreviewDocument?: (doc: DocumentPreviewItem) => void;
}

export const AutomatedEmailNotificationModal: React.FC<AutomatedEmailNotificationModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkRead,
  onTriggerTestEmail,
  onViewInquiry,
  onPreviewDocument
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterUnread, setFilterUnread] = useState(false);
  const [selectedMail, setSelectedMail] = useState<AdminEmailNotification | null>(
    notifications.length > 0 ? notifications[0] : null
  );
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const filteredMails = notifications.filter((mail) => {
    const matchesSearch =
      mail.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mail.inquiryId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mail.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mail.customerPhone.includes(searchQuery);
    const matchesUnread = filterUnread ? !mail.read : true;
    return matchesSearch && matchesUnread;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleCopyBody = async (body: string) => {
    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore copy error
    }
  };

  const activeMail = selectedMail || (filteredMails.length > 0 ? filteredMails[0] : null);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="email-service-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
    >
      <div className="relative w-full max-w-5xl bg-slate-900 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden my-6 text-white flex flex-col max-h-[90vh]">
        
        {/* Top Service Bar */}
        <div className="p-5 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-500/10 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active Automated Email Service
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">• Destination: <strong className="text-amber-300 font-mono">chandu.kadadi@kadadimotors.com</strong></span>
              </div>
              <h3 id="email-service-modal-title" className="text-lg sm:text-xl font-heading font-black text-white mt-0.5">
                Automated Document Upload Email Dispatch Hub
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onTriggerTestEmail}
              className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
              title="Simulate instant document upload email alert"
            >
              <Zap className="w-3.5 h-3.5 text-slate-950" />
              <span className="hidden sm:inline">Send Test Alert</span>
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
              aria-label="Close Email Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Info Metrics Bar */}
        <div className="px-6 py-3 bg-slate-950/60 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-4">
            <span className="text-slate-400">
              Total Email Dispatches: <strong className="text-white font-mono">{notifications.length}</strong>
            </span>
            <span className="text-slate-400">
              Unread Alerts: <strong className="text-amber-400 font-mono">{unreadCount}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-[11px]">Primary Recipient:</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-amber-300 font-mono font-bold text-[11px]">
              Chandrakant Kadadi (Bidar Desk)
            </span>
          </div>
        </div>

        {/* Main Split Body */}
        <div className="grid lg:grid-cols-12 flex-1 overflow-hidden">
          
          {/* Left Panel: Email Log List */}
          <div className="lg:col-span-5 border-r border-slate-800/80 flex flex-col bg-slate-950/40 min-h-[300px] max-h-[500px] lg:max-h-none overflow-hidden">
            
            {/* Filter Bar */}
            <div className="p-3 border-b border-slate-800/80 space-y-2 shrink-0 bg-slate-900/60">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search customer name, ID, document..."
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center justify-between text-[11px]">
                <button
                  onClick={() => setFilterUnread(!filterUnread)}
                  className={`px-2.5 py-1 rounded-lg border font-bold flex items-center gap-1 transition-all cursor-pointer ${
                    filterUnread
                      ? 'bg-amber-400/20 border-amber-400/50 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Filter className="w-3 h-3 text-amber-400" />
                  <span>Only Unread ({unreadCount})</span>
                </button>

                <span className="text-slate-500 font-mono">{filteredMails.length} Items</span>
              </div>
            </div>

            {/* Email List Scrollable */}
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {filteredMails.length === 0 ? (
                <div className="p-8 text-center text-slate-500 space-y-2 text-xs">
                  <Inbox className="w-8 h-8 mx-auto text-slate-600 opacity-50" />
                  <p>No document upload emails match your current filter.</p>
                </div>
              ) : (
                filteredMails.map((mail) => {
                  const isSelected = activeMail?.id === mail.id;
                  return (
                    <div
                      key={mail.id}
                      onClick={() => {
                        setSelectedMail(mail);
                        if (!mail.read) onMarkRead(mail.id);
                      }}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-1.5 relative ${
                        isSelected
                          ? 'bg-amber-400/10 border-amber-400/60 shadow-lg'
                          : mail.read
                          ? 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 text-slate-300'
                          : 'bg-slate-900 border-amber-500/30 text-white font-bold'
                      }`}
                    >
                      {!mail.read && (
                        <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                      )}

                      <div className="flex items-center justify-between pr-4">
                        <span className="text-xs font-mono font-bold text-amber-400">{mail.inquiryId}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{mail.sentAt}</span>
                      </div>

                      <div className="text-xs font-bold text-white truncate">{mail.customerName}</div>

                      <div className="text-[11px] text-slate-300 truncate flex items-center gap-1">
                        <FileText className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="truncate">{mail.fileName}</span>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/50">
                        <span>{mail.categoryTitle}</span>
                        <span className="text-emerald-400 font-bold">✓ Delivered</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

          </div>

          {/* Right Panel: Rendered Summary Email Detail */}
          <div className="lg:col-span-7 p-6 bg-slate-900/90 overflow-y-auto flex flex-col justify-between space-y-6">
            
            {activeMail ? (
              <div className="space-y-6">
                
                {/* Header Card */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-extrabold uppercase text-amber-400 tracking-wider">
                        Automated Email Summary Payload
                      </span>
                      <h4 className="text-sm font-extrabold text-white">{activeMail.emailSubject}</h4>
                    </div>

                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>{activeMail.status}</span>
                    </span>
                  </div>

                  {/* Envelope Meta */}
                  <div className="grid sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-500 text-[11px] block">To Recipient:</span>
                      <span className="font-mono text-amber-300 font-bold">{activeMail.sentToEmail}</span>
                    </div>

                    <div>
                      <span className="text-slate-500 text-[11px] block">Dispatched Timestamp:</span>
                      <span className="font-mono text-slate-300">{activeMail.sentAt}</span>
                    </div>
                  </div>
                </div>

                {/* Customer & Document Detail Highlights */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-0.5">
                    <span className="text-slate-500 text-[10px] font-bold block uppercase">Customer</span>
                    <span className="font-bold text-white block truncate">{activeMail.customerName}</span>
                    <span className="text-[11px] text-slate-400 block">{activeMail.city}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-0.5">
                    <span className="text-slate-500 text-[10px] font-bold block uppercase">Mobile Phone</span>
                    <span className="font-mono text-amber-300 font-bold block">{activeMail.customerPhone}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 col-span-2 sm:col-span-1">
                    <span className="text-slate-500 text-[10px] font-bold block uppercase">Uploaded File</span>
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-emerald-400 block truncate text-xs">{activeMail.fileName}</span>
                      {onPreviewDocument && (
                        <button
                          type="button"
                          onClick={() => {
                            onPreviewDocument({
                              fileName: activeMail.fileName,
                              fileSize: '1.4 MB',
                              uploadDate: activeMail.sentAt,
                              customerName: activeMail.customerName,
                              customerPhone: activeMail.customerPhone,
                              inquiryId: activeMail.inquiryId,
                              categoryTitle: activeMail.categoryTitle,
                              verifiedByAdvisor: true
                            });
                          }}
                          className="px-2 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-[10px] flex items-center gap-1 transition-all shrink-0 cursor-pointer shadow-sm"
                          title="View document in-browser without downloading"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Preview</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Formatted Plaintext Email Body Preview */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-300 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-amber-400" />
                      <span>Full Dispatched Email Body</span>
                    </span>

                    <button
                      onClick={() => handleCopyBody(activeMail.emailBody)}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] font-bold text-amber-300 flex items-center gap-1 transition-all cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied Body</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-amber-400" />
                          <span>Copy Email Payload</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-56">
                    {activeMail.emailBody}
                  </pre>
                </div>

                {/* Bottom Direct Quick Actions */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="text-slate-400 text-[11px]">
                    Inquiry ID: <strong className="text-white font-mono">{activeMail.inquiryId}</strong>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/91${activeMail.customerPhone.replace(/\D/g, '')}?text=${encodeURIComponent(
                        `Hi ${activeMail.customerName}, Chandrakant Kadadi here from Kadadi Motors. I received your uploaded document (${activeMail.fileName}) for inquiry ${activeMail.inquiryId}. Reviewing now!`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>WhatsApp Customer</span>
                    </a>

                    <button
                      onClick={() => {
                        onClose();
                        onViewInquiry(activeMail.inquiryId);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Inquiry Register</span>
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              <div className="p-12 text-center text-slate-500 space-y-3">
                <Mail className="w-12 h-12 mx-auto text-slate-700 opacity-40" />
                <p className="text-sm">Select an email notification log on the left to review payload details.</p>
              </div>
            )}

          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2 text-slate-400">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Ensuring zero customer inquiries or uploaded documents are missed in Bidar.</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-bold transition-all cursor-pointer"
          >
            Close Service Hub
          </button>
        </div>

      </div>
    </div>
  );
};
