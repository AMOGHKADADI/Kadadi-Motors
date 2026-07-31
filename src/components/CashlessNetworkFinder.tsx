import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Search,
  Building,
  Car,
  HeartPulse,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Filter
} from 'lucide-react';

interface NetworkItem {
  id: string;
  name: string;
  type: 'garage' | 'hospital';
  address: string;
  landmark: string;
  phone: string;
  supportedInsurers: string[];
  rating: string;
}

const NETWORK_DATA: NetworkItem[] = [
  // Garages in Bidar
  {
    id: 'G-01',
    name: 'Tata Motors Authorized Service Center (Kadadi Motors Partner)',
    type: 'garage',
    address: 'Plot No 42, Naubad Industrial Area',
    landmark: 'Near Naubad Circle, Bidar',
    phone: '+91 94488 31388',
    supportedInsurers: ['Tata AIG', 'Bajaj Allianz', 'ICICI Lombard', 'Royal Sundaram'],
    rating: '4.9 ★'
  },
  {
    id: 'G-02',
    name: 'Maruti Suzuki Arena Authorized Workshop',
    type: 'garage',
    address: 'Udgir Road, Opp. Govt Polytechnic',
    landmark: 'Udgir Road, Bidar',
    phone: '+91 8482 225410',
    supportedInsurers: ['Maruti Insurance', 'ICICI Lombard', 'HDFC ERGO', 'United India'],
    rating: '4.8 ★'
  },
  {
    id: 'G-03',
    name: 'Mahindra & Mahindra Cashless Service',
    type: 'garage',
    address: 'Janwada Road, Near Ring Road Junction',
    landmark: 'Ring Road, Bidar',
    phone: '+91 8482 230190',
    supportedInsurers: ['Bajaj Allianz', 'Tata AIG', 'New India Assurance'],
    rating: '4.7 ★'
  },
  {
    id: 'G-[04]',
    name: 'Hyundai Authorized Service Station',
    type: 'garage',
    address: 'Hyderabad Road, Near Mailoor Cross',
    landmark: 'Mailoor, Bidar',
    phone: '+91 8482 228900',
    supportedInsurers: ['HDFC ERGO', 'ICICI Lombard', 'Go Digit', 'Cholamandalam'],
    rating: '4.8 ★'
  },
  // Hospitals in Bidar
  {
    id: 'H-01',
    name: 'BRIMS Govt Teaching Hospital & Research Center',
    type: 'hospital',
    address: 'Udgir Road, Bidar City',
    landmark: 'Beside Deputy Commissioner Office',
    phone: '+91 8482 228401',
    supportedInsurers: ['Star Health', 'Ayushman Bharat', 'United India', 'National Insurance'],
    rating: '4.7 ★'
  },
  {
    id: 'H-02',
    name: 'Gurunanak Multi-Specialty Hospital',
    type: 'hospital',
    address: 'Mailoor Road, Bidar',
    landmark: 'Gurunanak Campus, Bidar',
    phone: '+91 8482 232500',
    supportedInsurers: ['Star Health', 'HDFC ERGO', 'Neva Bupa', 'Care Health', 'ICICI Lombard'],
    rating: '4.9 ★'
  },
  {
    id: 'H-03',
    name: 'Sahyadri Super-Specialty Hospital & Trauma Center',
    type: 'hospital',
    address: 'Near Ambedkar Circle, College Road',
    landmark: 'College Road, Bidar',
    phone: '+91 8482 226100',
    supportedInsurers: ['Star Health', 'Bajaj Allianz', 'HDFC ERGO', 'Neva Bupa'],
    rating: '4.8 ★'
  },
  {
    id: 'H-04',
    name: 'City Multi-Specialty Hospital & Critical Care',
    type: 'hospital',
    address: 'Udgir Road, Near Gumpa Ring Road',
    landmark: 'Gumpa, Bidar',
    phone: '+91 8482 221200',
    supportedInsurers: ['Star Health', 'Care Health', 'Aditya Birla', 'ICICI Lombard'],
    rating: '4.6 ★'
  }
];

export const CashlessNetworkFinder: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'garage' | 'hospital'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = NETWORK_DATA.filter((item) => {
    const matchType = filterType === 'all' || item.type === filterType;
    const matchQuery =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.landmark.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supportedInsurers.some((ins) => ins.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchType && matchQuery;
  });

  return (
    <section className="py-16 bg-slate-950 text-white relative border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-black uppercase tracking-wider">
            <Building className="w-4 h-4 text-emerald-400" />
            <span>Bidar Network Directory</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-heading font-black text-white">
            Bidar Cashless Garages & Network Hospitals
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Direct cashless claim approval facilities partnered with Chandrakant Kadadi (Kadadi Motors) in Bidar, Naubad, Udgir Road & Mailoor.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto shadow-xl">
          
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search garage, hospital, or insurer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 text-xs text-white border border-slate-800 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                filterType === 'all' ? 'bg-amber-400 text-slate-950 font-black' : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              All Facilities ({NETWORK_DATA.length})
            </button>

            <button
              onClick={() => setFilterType('garage')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                filterType === 'garage' ? 'bg-amber-400 text-slate-950 font-black' : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>Cashless Garages</span>
            </button>

            <button
              onClick={() => setFilterType('hospital')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                filterType === 'hospital' ? 'bg-amber-400 text-slate-950 font-black' : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              <HeartPulse className="w-3.5 h-3.5" />
              <span>Network Hospitals</span>
            </button>
          </div>

        </div>

        {/* Directory Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl glass-card transition-all shadow-xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2.5 rounded-xl border ${
                      item.type === 'garage' ? 'bg-amber-400/10 border-amber-500/30 text-amber-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    }`}>
                      {item.type === 'garage' ? <Car className="w-5 h-5" /> : <HeartPulse className="w-5 h-5" />}
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                        {item.type === 'garage' ? 'Cashless Motor Garage' : 'Network Hospital'}
                      </span>
                      <h3 className="text-base font-heading font-black text-white">{item.name}</h3>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-black shrink-0">
                    {item.rating}
                  </span>
                </div>

                <div className="text-xs text-slate-300 space-y-1 bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{item.address} ({item.landmark})</span>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-mono font-bold text-emerald-300">{item.phone}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Cashless Supported Insurers:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.supportedInsurers.map((ins, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 text-[11px] font-bold border border-slate-700">
                        {ins}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-extrabold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Cashless Desk</span>
                </span>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(item.name + ' ' + item.landmark)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline font-bold flex items-center gap-1"
                >
                  <span>Google Maps Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
