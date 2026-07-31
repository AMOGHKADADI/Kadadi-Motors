import React from 'react';
import {
  X,
  PhoneCall,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  Clock,
  Send,
  FileText
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/insuranceData';

interface EmergencySosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencySosModal: React.FC<EmergencySosModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOpenEmergencyWhatsApp = (type: string) => {
    let text = `*24/7 EMERGENCY ASSISTANCE REQUEST - ${type}*%0A`;
    text += `Hello Chandrakant Kadadi Sir, I am facing an emergency in Bidar and need immediate claim / helpline guidance.%0A%0A`;
    text += `*Location:* Bidar, Karnataka%0A`;
    text += `Please call or guide me immediately!`;

    window.open(`https://wa.me/91${BUSINESS_INFO.whatsappRaw}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-rose-500/40 rounded-3xl shadow-2xl overflow-hidden my-8 text-white">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-rose-950 via-slate-950 to-slate-950 border-b border-rose-900/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 animate-pulse">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-black uppercase tracking-wider">
                24/7 Emergency Hotline
              </div>
              <h3 className="text-xl font-heading font-black text-white mt-1">
                Accident & Hospital Claim SOS Desk
              </h3>
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
        <div className="p-6 space-y-6 text-xs">
          
          {/* Quick Call Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-500/20 via-amber-500/10 to-rose-500/20 border border-rose-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-amber-400 font-bold block">Direct Founder Call (Chandrakant Kadadi)</span>
              <span className="text-base font-black text-white font-mono">{BUSINESS_INFO.phoneDisplay}</span>
            </div>

            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-lg shadow-rose-600/30 flex items-center gap-2 shrink-0"
            >
              <PhoneCall className="w-4 h-4" />
              <span>CALL NOW</span>
            </a>
          </div>

          {/* Immediate Steps at Accident Spot */}
          <div className="space-y-3">
            <h4 className="text-sm font-heading font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>What To Do Immediately at the Spot in Bidar</span>
            </h4>

            <div className="space-y-2.5">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0 text-xs">1</span>
                <div>
                  <strong className="text-white block">Ensure Safety & Take Photos</strong>
                  <span className="text-slate-400">Do not move vehicle before taking photos/videos of vehicle position, damage, and road location.</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0 text-xs">2</span>
                <div>
                  <strong className="text-white block">Notify Chandu Kadadi Sir Before Repairing</strong>
                  <span className="text-slate-400">Insurance surveyor inspection is required BEFORE starting vehicle repairs to get 100% cashless approval.</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0 text-xs">3</span>
                <div>
                  <strong className="text-white block">Health Claim Hospital Admission</strong>
                  <span className="text-slate-400">Show health insurance card at Cashless Desk at BRIMS, Sahyadri, or Gurunanak Hospital Bidar within 2 hours of admission.</span>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Emergency Buttons */}
          <div className="grid sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => handleOpenEmergencyWhatsApp('Vehicle Accident Spot Claim')}
              className="p-3.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 font-extrabold flex items-center justify-center gap-2 transition-all"
            >
              <Send className="w-4 h-4 text-emerald-400" />
              <span>Report Vehicle Accident on WhatsApp</span>
            </button>

            <button
              onClick={() => handleOpenEmergencyWhatsApp('Hospitalization Cashless Claim')}
              className="p-3.5 rounded-xl bg-blue-950/80 hover:bg-blue-900 border border-blue-500/40 text-blue-300 font-extrabold flex items-center justify-center gap-2 transition-all"
            >
              <Send className="w-4 h-4 text-blue-400" />
              <span>Report Hospital Admission</span>
            </button>
          </div>

          {/* Office Address */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-[11px]">{BUSINESS_INFO.address}</span>
            </div>
            <span className="font-bold text-amber-400 shrink-0 text-[11px]">{BUSINESS_INFO.hours}</span>
          </div>

        </div>

      </div>
    </div>
  );
};
