import React, { useState } from 'react';
import { INSURANCE_SOLUTIONS } from '../data/insuranceData';
import { InsuranceSolution } from '../types';
import {
  HeartPulse,
  Car,
  Bike,
  Truck,
  Container,
  CarFront,
  Bus,
  Layers,
  ShieldCheck,
  Home,
  Flame,
  Building2,
  HardHat,
  UserCheck,
  Plane,
  RotateCw,
  Scale,
  Headset,
  Search,
  CheckCircle2,
  ArrowRight,
  X,
  Info,
  FileText,
  CheckSquare
} from 'lucide-react';

interface InsuranceSolutionsProps {
  onSelectSolution: (solution: InsuranceSolution) => void;
  onOpenQuoteModal: (preselectedCategory?: string) => void;
  onOpenDocChecklist?: (category?: string, purpose?: string) => void;
}

// Map string icon names to Lucide icon components
const iconMap: Record<string, React.ElementType> = {
  HeartPulse,
  Car,
  Bike,
  Truck,
  Container,
  CarFront,
  Bus,
  Layers,
  ShieldCheck,
  Home,
  Flame,
  Building2,
  HardHat,
  UserCheck,
  Plane,
  RotateCw,
  Scale,
  Headset,
};

export const InsuranceSolutions: React.FC<InsuranceSolutionsProps> = ({
  onSelectSolution,
  onOpenQuoteModal,
  onOpenDocChecklist,
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSolutionModal, setSelectedSolutionModal] = useState<InsuranceSolution | null>(null);

  const tabs = [
    { id: 'all', label: 'All Solutions' },
    { id: 'health', label: 'Health & Life' },
    { id: 'motor', label: 'Car & Bike Motor' },
    { id: 'commercial', label: 'Commercial & Fleet' },
    { id: 'property', label: 'Property & Fire' },
    { id: 'business', label: 'Business & Engineering' },
    { id: 'specialized', label: 'Renewals & Claims' },
  ];

  const filteredSolutions = INSURANCE_SOLUTIONS.filter((item) => {
    const matchesTab = activeTab === 'all' || item.category === activeTab;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.howWeAssist.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <section id="solutions" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-blue-800 bg-blue-100/80 border border-blue-200 uppercase tracking-wider">
              Comprehensive Protection Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
              Insurance Tailored to Your Specific Needs
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              We do not sell standard pre-packaged policies. We analyze your requirements and compare options across leading insurers to secure optimal coverage.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search e.g. Truck, Health, Fire..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Required Documents Helper Interactive Feature Banner */}
        <div className="mt-8 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 rounded-2xl p-5 sm:p-6 text-white border border-slate-700/80 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold border border-amber-400/30">
              <FileText className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
              <span>Required Documents Helper Tool</span>
            </div>
            <h3 className="text-lg sm:text-xl font-heading font-extrabold text-white">
              Preparing for a New Policy or Claim Settlement?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Use our interactive document checklist helper to verify required forms, KYC, and hospital/RTO bills before submitting.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => onOpenDocChecklist && onOpenDocChecklist('health', 'claim_reimbursement')}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              Health Claim Docs
            </button>
            <button
              onClick={() => onOpenDocChecklist && onOpenDocChecklist('motor', 'claim_cashless')}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              Motor Claim Docs
            </button>
            <button
              onClick={() => onOpenDocChecklist && onOpenDocChecklist('health', 'new_policy')}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <CheckSquare className="w-4 h-4 text-slate-950" aria-hidden="true" />
              <span>Launch Full Checklist Tool</span>
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none" aria-label="Insurance categories filter">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                  isActive
                    ? 'bg-blue-700 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Solutions Grid */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSolutions.map((item) => {
            const IconComponent = iconMap[item.iconName] || ShieldCheck;
            return (
              <div
                key={item.id}
                className="group bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-blue-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  
                  {/* Card Header & Icon */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-xs">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                      {item.category}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-heading font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                      {item.shortDescription}
                    </p>
                  </div>

                  {/* How Kadadi Motors Assists */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5 text-[11px] text-blue-800">
                      <Info className="w-3.5 h-3.5" />
                      <span>How Kadadi Motors Helps:</span>
                    </div>
                    <p className="line-clamp-2 text-slate-600 text-[11px]">
                      {item.howWeAssist}
                    </p>
                  </div>

                </div>

                {/* Card Footer Actions */}
                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedSolutionModal(item)}
                    className="text-xs font-bold text-blue-700 hover:text-blue-800 inline-flex items-center gap-1 hover:underline"
                  >
                    <span>View Coverage Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenQuoteModal(item.title)}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    Request Advice
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredSolutions.length === 0 && (
          <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <Info className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No insurance solutions match "{searchQuery}"</h3>
            <p className="text-sm text-slate-500">Try adjusting your search term or browse all solutions above.</p>
            <button
              onClick={() => {
                setActiveTab('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-blue-700 text-white font-bold text-xs rounded-xl"
            >
              Reset Search & Filters
            </button>
          </div>
        )}

      </div>

      {/* Detailed Solution Modal */}
      {selectedSolutionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-extrabold text-slate-900">
                    {selectedSolutionModal.title}
                  </h3>
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                    {selectedSolutionModal.category} • Kadadi Motors Advisory
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedSolutionModal(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Overview</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                {selectedSolutionModal.fullDescription}
              </p>
            </div>

            {/* How Kadadi Motors Assists */}
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-sm space-y-2">
              <div className="font-bold text-blue-900 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-700" />
                <span>Our Advisory & Value Add</span>
              </div>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                {selectedSolutionModal.howWeAssist}
              </p>
            </div>

            {/* Key Benefits */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Key Coverage Features</h4>
              <div className="grid sm:grid-cols-2 gap-2">
                {selectedSolutionModal.keyBenefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ideal For */}
            <div className="p-3 rounded-xl bg-slate-100 text-xs text-slate-700">
              <strong className="text-slate-900">Recommended For: </strong>
              <span>{selectedSolutionModal.idealFor}</span>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => {
                  const category = selectedSolutionModal.category;
                  setSelectedSolutionModal(null);
                  if (onOpenDocChecklist) {
                    onOpenDocChecklist(category === 'health' ? 'health' : category === 'motor' ? 'motor' : 'health');
                  }
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <FileText className="w-3.5 h-3.5 text-blue-700" aria-hidden="true" />
                <span>View Required Documents</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedSolutionModal(null)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const title = selectedSolutionModal.title;
                    setSelectedSolutionModal(null);
                    onOpenQuoteModal(title);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  Request Free Policy Comparison
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
