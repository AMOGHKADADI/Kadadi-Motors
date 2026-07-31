import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  FileText,
  ShieldCheck,
  Building,
  Car,
  HeartPulse,
  Truck,
  ArrowRight
} from 'lucide-react';
import { DOCUMENT_CHECKLISTS } from '../data/documentChecklists';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Search Results
  const matches: { title: string; category: string; sectionId: string; description: string }[] = [];

  if (query.trim().length > 1) {
    const q = query.toLowerCase();

    // Check document checklists
    DOCUMENT_CHECKLISTS.forEach((cat) => {
      if (cat.title.toLowerCase().includes(q)) {
        matches.push({
          title: `${cat.title} Checklist`,
          category: 'Document Hub',
          sectionId: 'doc-checklist-hub',
          description: `Required documents for ${cat.title}`
        });
      }
      cat.purposes.forEach((purp) => {
        if (purp.title.toLowerCase().includes(q) || purp.description.toLowerCase().includes(q)) {
          matches.push({
            title: purp.title,
            category: `${cat.title} Purpose`,
            sectionId: 'doc-checklist-hub',
            description: purp.description
          });
        }
        purp.documents.forEach((doc) => {
          if (doc.name.toLowerCase().includes(q) || doc.description.toLowerCase().includes(q)) {
            matches.push({
              title: doc.name,
              category: 'Document Item',
              sectionId: 'doc-checklist-hub',
              description: doc.description
            });
          }
        });
      });
    });

    if ('cashless garages hospitals bidar naubad brims'.includes(q)) {
      matches.push({
        title: 'Bidar Cashless Network Garages & Hospitals',
        category: 'Directory',
        sectionId: 'sector-details-view',
        description: 'Tata, Maruti, Hyundai, BRIMS, Gurunanak cashless facilities'
      });
    }

    if ('km points rewards leaderboard'.includes(q)) {
      matches.push({
        title: 'KM Points Loyalty & Leaderboard',
        category: 'Rewards',
        sectionId: 'km-points-leaderboard',
        description: 'Earn points on document verification and redeem vouchers'
      });
    }

    if ('calculator premium cost estimate'.includes(q)) {
      matches.push({
        title: 'Premium Estimator & Claims Desk',
        category: 'Calculator',
        sectionId: 'claims-renewals',
        description: 'Calculate motor & health insurance premium estimates'
      });
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden text-white space-y-4 p-6">
        
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
          <Search className="w-5 h-5 text-amber-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search documents, insurance types, cashless garages, KM points..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white focus:outline-none placeholder-slate-500"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Links */}
        {query.trim().length <= 1 ? (
          <div className="space-y-3 pt-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
              Quick Shortcuts
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  onNavigate('doc-checklist-hub');
                  onClose();
                }}
                className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-left border border-slate-800 flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Required Documents Checklist</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('sector-details-view');
                  onClose();
                }}
                className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-left border border-slate-800 flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Insurance Sectors Directory</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('claims-renewals');
                  onClose();
                }}
                className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-left border border-slate-800 flex items-center gap-2"
              >
                <Car className="w-4 h-4 text-emerald-400" />
                <span>Premium Calculator Desk</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('km-points-leaderboard');
                  onClose();
                }}
                className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-left border border-slate-800 flex items-center gap-2"
              >
                <HeartPulse className="w-4 h-4 text-rose-400" />
                <span>KM Points & Rewards</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2 max-h-80 overflow-y-auto pt-2">
            {matches.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">
                No matching results found for "{query}". Try searching for 'RC', 'Aadhaar', 'Motor', or 'Health'.
              </p>
            ) : (
              matches.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    onNavigate(item.sectionId);
                    onClose();
                  }}
                  className="p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 cursor-pointer flex items-center justify-between text-xs transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-amber-400/10 text-amber-300 border border-amber-500/30 text-[10px] font-black uppercase">
                        {item.category}
                      </span>
                      <strong className="text-white font-extrabold">{item.title}</strong>
                    </div>
                    <p className="text-slate-400 text-[11px] mt-1">{item.description}</p>
                  </div>

                  <ArrowRight className="w-4 h-4 text-amber-400 shrink-0" />
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
};
