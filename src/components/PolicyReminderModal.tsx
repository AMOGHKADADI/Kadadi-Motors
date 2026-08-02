import React, { useState, useEffect } from 'react';
import {
  X,
  Clock,
  Calendar,
  Send,
  CheckCircle2,
  Bell,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/insuranceData';

interface PolicyReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PolicyReminderModal: React.FC<PolicyReminderModalProps> = ({ isOpen, onClose }) => {
  const [vehicleNo, setVehicleNo] = useState('');
  const [phone, setPhone] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [policyType, setPolicyType] = useState('Motor Vehicle Insurance');
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleSubmitReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !expiryDate) {
      alert('Please fill your Mobile Number and Policy Expiry Date.');
      return;
    }

    setIsSubmitted(true);

    // Format WhatsApp reminder request
    let msg = `*POLICY RENEWAL REMINDER SETTING REQUEST*%0A`;
    msg += `------------------------------------------%0A`;
    msg += `*Client Phone:* ${encodeURIComponent(phone)}%0A`;
    if (vehicleNo) msg += `*Vehicle / Policy No:* ${encodeURIComponent(vehicleNo)}%0A`;
    msg += `*Insurance Type:* ${encodeURIComponent(policyType)}%0A`;
    msg += `*Expiry Date:* ${encodeURIComponent(expiryDate)}%0A`;
    msg += `------------------------------------------%0A`;
    msg += `*Chandrakant Kadadi Sir*, please set an automated reminder on your desk for my policy renewal!`;

    setTimeout(() => {
      window.open(`https://wa.me/91${BUSINESS_INFO.whatsappRaw}?text=${msg}`, '_blank');
    }, 600);
  };

  const handleDownloadIcs = () => {
    if (!expiryDate) return;
    const dateFormatted = expiryDate.replace(/-/g, '');
    const csContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Kadadi Motors Insurance Bidar//EN
BEGIN:VEVENT
SUMMARY:Policy Renewal Due - Kadadi Motors (${vehicleNo || policyType})
DESCRIPTION:Contact Chandrakant Kadadi Sir (+91 94488 31388) for hassle-free policy renewal with NCB protection!
DTSTART:${dateFormatted}T090000Z
DTEND:${dateFormatted}T100000Z
LOCATION:Kadadi Motors, Bidar
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([csContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Policy_Renewal_${vehicleNo || 'Kadadi_Motors'}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden text-white my-8">
        
        {/* Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-400/10 border border-amber-500/30 text-amber-400">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-heading font-black text-white">Smart Policy Renewal Reminder</h3>
              <p className="text-xs text-slate-400">Never lose your No-Claim Bonus (NCB) or risk driving uninsured.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs">
          {isSubmitted ? (
            <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-heading font-black text-white">Reminder Scheduled!</h4>
              <p className="text-xs text-emerald-200">
                Chandrakant Kadadi Sir will notify you via WhatsApp 15 days before your policy expires ({expiryDate}).
              </p>

              <button
                onClick={handleDownloadIcs}
                className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Add to Phone Calendar (.ics)</span>
              </button>

              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold mt-2"
              >
                Set Another Reminder
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitReminder} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Insurance Sector
                </label>
                <select
                  value={policyType}
                  onChange={(e) => setPolicyType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-white border border-slate-800 text-xs focus:outline-none focus:border-amber-400"
                >
                  <option value="Private Car & SUV">Private Car & SUV</option>
                  <option value="Two Wheeler / Bike">Two Wheeler / Bike</option>
                  <option value="Commercial Transport">Commercial Transport</option>
                  <option value="Health & Family Floater">Health & Family Floater</option>
                  <option value="Shopkeeper & Commercial">Shopkeeper & Commercial</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Vehicle Reg. No / Policy Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. KA-38-M-1234"
                  value={vehicleNo}
                  onChange={(e) => setVehicleNo(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-white border border-slate-800 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Mobile Number (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 98451 22345"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-white border border-slate-800 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Policy Expiry Date *
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-white border border-slate-800 text-xs focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-lg flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Save Reminder & Notify Chandrakant Kadadi Sir</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
