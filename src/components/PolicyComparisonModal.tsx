import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Zap,
  Sparkles,
  HelpCircle,
  FileText,
  Car,
  HeartPulse,
  Truck,
  Building
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/insuranceData';

interface PolicyComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuoteModal: (category?: string) => void;
}

export const PolicyComparisonModal: React.FC<PolicyComparisonModalProps> = ({
  isOpen,
  onClose,
  onOpenQuoteModal
}) => {
  const [activeTab, setActiveTab] = useState<'motor' | 'health' | 'commercial' | 'shop'>('motor');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden my-8 text-white max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-500/30 text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-heading font-black text-white">Side-by-Side Policy Comparison</h3>
              <p className="text-xs text-slate-400">Compare coverage terms, cashless benefits, and claim speeds across multi-insurer plans.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="px-6 py-3 bg-slate-950/60 border-b border-slate-800 flex flex-wrap gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('motor')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'motor' ? 'bg-amber-400 text-slate-950 font-black shadow-md' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Private Motor (Car/Bike)</span>
          </button>

          <button
            onClick={() => setActiveTab('health')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'health' ? 'bg-amber-400 text-slate-950 font-black shadow-md' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <HeartPulse className="w-4 h-4" />
            <span>Health & Super Top-Up</span>
          </button>

          <button
            onClick={() => setActiveTab('commercial')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'commercial' ? 'bg-amber-400 text-slate-950 font-black shadow-md' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Commercial Transport</span>
          </button>

          <button
            onClick={() => setActiveTab('shop')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'shop' ? 'bg-amber-400 text-slate-950 font-black shadow-md' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Shopkeeper Fire & Theft</span>
          </button>
        </div>

        {/* Comparison Tables Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'motor' && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                
                {/* 3rd Party Plan */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="inline-flex px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold">
                    MANDATORY BY LAW
                  </div>
                  <h4 className="text-lg font-heading font-black text-white">Third-Party (TP) Only</h4>
                  <p className="text-xs text-slate-400">Covers legal third-party bodily injury, property damage & death liabilities.</p>
                  
                  <div className="text-2xl font-black text-amber-400 font-mono">Lowest Cost</div>

                  <ul className="space-y-2 text-xs text-slate-300 pt-3 border-t border-slate-800">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Legal Compliance on Road</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-500">
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>Own Damage (OD) Cover</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-500">
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>Zero Depreciation Add-on</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-500">
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>Engine & Gearbox Protection</span>
                    </li>
                  </ul>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenQuoteModal('motor');
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs border border-slate-700"
                  >
                    Inquire TP Quote
                  </button>
                </div>

                {/* Comprehensive Plan */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-4 relative">
                  <div className="inline-flex px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black">
                    RECOMMENDED STANDARD
                  </div>
                  <h4 className="text-lg font-heading font-black text-white">Comprehensive Cover</h4>
                  <p className="text-xs text-slate-400">Covers Third Party Liability PLUS Own Damage due to accident, fire, theft & storm.</p>

                  <div className="text-2xl font-black text-amber-400 font-mono">Balanced Price</div>

                  <ul className="space-y-2 text-xs text-slate-300 pt-3 border-t border-slate-800">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Third Party Liability</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Own Vehicle Damage & Theft</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>No Claim Bonus (NCB) up to 50%</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-500">
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>Zero Depreciation (Standard Deductible)</span>
                    </li>
                  </ul>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenQuoteModal('motor');
                    }}
                    className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md"
                  >
                    Inquire Comprehensive
                  </button>
                </div>

                {/* Zero-Dep Bumper to Bumper */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-4">
                  <div className="inline-flex px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                    ULTIMATE PEACE OF MIND
                  </div>
                  <h4 className="text-lg font-heading font-black text-white">Zero Depreciation (B2B)</h4>
                  <p className="text-xs text-slate-400">Zero deduction for fiber, rubber, metal & plastic parts during claim settlement.</p>

                  <div className="text-2xl font-black text-emerald-400 font-mono">Max Protection</div>

                  <ul className="space-y-2 text-xs text-slate-300 pt-3 border-t border-slate-800">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>100% Claim Reimbursement</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Engine & Hydrostatic Lock Add-on</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Consumables & Key Cover included</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>24/7 Roadside Assistance (RSA)</span>
                    </li>
                  </ul>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenQuoteModal('motor');
                    }}
                    className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md"
                  >
                    Get Zero-Dep Advice
                  </button>
                </div>

              </div>
            </div>
          )}

          {activeTab === 'health' && (
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
              <h4 className="text-lg font-heading font-black text-white">Health Insurance & Super Top-Up Comparison</h4>
              <p className="text-slate-300 leading-relaxed">
                We compare Star Health, HDFC ERGO, Neva Bupa, and Care Health. Key factors compared for Bidar families:
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <h5 className="font-extrabold text-amber-400 text-sm">Individual / Family Floater (₹5L - ₹25L)</h5>
                  <ul className="space-y-1.5 text-slate-300">
                    <li>• Day 1 Cashless Hospitalization in Bidar BRIMS & Sahyadri</li>
                    <li>• Zero Room-Rent Capping on Single Private AC Rooms</li>
                    <li>• Pre-existing diseases covered after 2 to 3 years</li>
                    <li>• Annual Free Health Check-up Vouchers</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <h5 className="font-extrabold text-blue-400 text-sm">Super Top-Up Add-on (₹50 Lakhs)</h5>
                  <ul className="space-y-1.5 text-slate-300">
                    <li>• High Sum Insured protection at 1/5th the premium cost</li>
                    <li>• Deductible threshold absorbs basic base plan</li>
                    <li>• Ideal for critical illness & major surgical emergencies</li>
                    <li>• Tax deductions under Section 80D up to ₹75,000</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'commercial' && (
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
              <h4 className="text-lg font-heading font-black text-white">Commercial Transport & Goods Vehicle Policies</h4>
              <p className="text-slate-300 leading-relaxed">
                Commercial vehicles operating in Bidar, Humnabad, Gulbarga & Telangana require fitness certificate synchronization and legal liability coverage.
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="font-bold text-amber-300 block">Goods Vehicle (GV)</span>
                  <span className="text-[11px] text-slate-400">Per ton payload capacity rating, driver LL, cleaner cover & goods cargo transit risk.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="font-bold text-amber-300 block">Passenger Taxi & Auto</span>
                  <span className="text-[11px] text-slate-400">Per passenger legal liability, driver cover, vehicle damage & theft protection.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="font-bold text-amber-300 block">Tractor & Agri Equipment</span>
                  <span className="text-[11px] text-slate-400">Specialized agricultural machinery policies for Bidar farmers & contractors.</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shop' && (
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
              <h4 className="text-lg font-heading font-black text-white">Shopkeeper Fire, Theft & Stock Protection</h4>
              <p className="text-slate-300 leading-relaxed">
                Protects retail shops, warehouses, textile stores, and grocery outlets in Bidar against unexpected losses.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="font-bold text-amber-300 block">Standard Fire & Special Perils</span>
                  <span className="text-[11px] text-slate-400">Covers building structure, stock in hand, fixtures, electrical short-circuit fire & storm damage.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="font-bold text-amber-300 block">Burglary & Housebreaking</span>
                  <span className="text-[11px] text-slate-400">Protection against forced break-ins, shoplifting, cash in safe, and transit money protection.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="p-6 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="text-xs text-slate-400">
            Need Chandrakant Kadadi's personal recommendation for your specific vehicle or health needs?
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenQuoteModal(activeTab);
            }}
            className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-lg"
          >
            Request Personal Advisory & Quote
          </button>
        </div>

      </div>
    </div>
  );
};
