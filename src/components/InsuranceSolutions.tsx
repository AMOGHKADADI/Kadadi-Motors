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
    <section id="solutions" className="py-16 lg:py-24 bg-slate-950 text-white border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-800">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-blue-400 bg-blue-950/80 border border-blue-800/50 uppercase tracking-wider">
              Comprehensive Protection
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
              Insurance Tailored to Your Specific Needs
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              We do not sell generic pre-packaged policies. We analyze your requirements and compare options across leading insurers to secure optimal coverage.
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
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-900 text-white placeholder-slate-500 rounded-xl border border-slate-800 focus:outline-none focus:border-blue-500 shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-semibold"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Required Documents Helper Interactive Feature Banner */}
        <div className="bg-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">
              <FileText className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
              <span>Required Documents Helper</span>
            </div>
            <h3 className="text-lg sm:text-xl font-heading font-bold text-white">
              Preparing for a New Policy or Claim Settlement?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Use our interactive document checklist helper to verify required forms, KYC, and hospital/RTO bills before submitting.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => onOpenDocChecklist && onOpenDocChecklist('health', 'claim_reimbursement')}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all focus:outline-none"
            >
              Health Claim Docs
            </button>
            <button
              onClick={() => onOpenDocChecklist && onOpenDocChecklist('motor', 'claim_cashless')}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all focus:outline-none"
            >
              Motor Claim Docs
            </button>
            <button
              onClick={() => onOpenDocChecklist && onOpenDocChecklist('health', 'new_policy')}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 focus:outline-none"
            >
              <CheckSquare className="w-4 h-4 text-white" aria-hidden="true" />
              <span>Full Checklist Tool</span>
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" aria-label="Insurance categories filter">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Solutions Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSolutions.map((item) => {
            const IconComponent = iconMap[item.iconName] || ShieldCheck;
            return (
              <div
                key={item.id}
                className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  
                  {/* Card Header & Icon */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                      {item.category}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-heading font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-2">
                      {item.shortDescription}
                    </p>
                  </div>

                  {/* How Kadadi Motors Assists */}
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <div className="font-bold text-blue-400 flex items-center gap-1.5 text-[11px]">
                      <Info className="w-3.5 h-3.5" />
                      <span>How Kadadi Motors Helps:</span>
                    </div>
                    <p className="line-clamp-2 text-slate-400 text-[11px]">
                      {item.howWeAssist}
                    </p>
                  </div>

                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedSolutionModal(item)}
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Coverage Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenQuoteModal(item.title)}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
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
          <div className="py-16 text-center bg-slate-900 rounded-2xl border border-slate-800 p-8 space-y-3">
            <Info className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">No insurance solutions match "{searchQuery}"</h3>
            <p className="text-sm text-slate-400">Try adjusting your search term or browse all solutions above.</p>
            <button
              onClick={() => {
                setActiveTab('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl"
            >
              Reset Search & Filters
            </button>
          </div>
        )}

      </div>

      {/* Detailed Solution Modal */}
      {selectedSolutionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-800 space-y-6 text-white">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-extrabold text-white">
                    {selectedSolutionModal.title}
                  </h3>
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                    {selectedSolutionModal.category} • Kadadi Motors Advisory
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedSolutionModal(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Overview</h4>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {selectedSolutionModal.fullDescription}
              </p>
            </div>

            {/* How Kadadi Motors Assists */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-2">
              <div className="font-bold text-blue-400 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-400" />
                <span>Our Advisory & Value Add</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {selectedSolutionModal.howWeAssist}
              </p>
            </div>

            {/* Key Benefits */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Key Coverage Features</h4>
              <div className="grid sm:grid-cols-2 gap-2">
                {selectedSolutionModal.keyBenefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ideal For */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
              <strong className="text-white">Recommended For: </strong>
              <span>{selectedSolutionModal.idealFor}</span>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => {
                  const category = selectedSolutionModal.category;
                  setSelectedSolutionModal(null);
                  if (onOpenDocChecklist) {
                    onOpenDocChecklist(category === 'health' ? 'health' : category === 'motor' ? 'motor' : 'health');
                  }
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
                <span>View Required Documents</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedSolutionModal(null)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-slate-400 hover:text-white text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const title = selectedSolutionModal.title;
                    setSelectedSolutionModal(null);
                    onOpenQuoteModal(title);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  Request Policy Comparison
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
