import React, { useState } from 'react';
import { Calculator, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface PremiumCalculatorProps {
  onOpenQuoteModal: (category: string) => void;
}

export const PremiumCalculator: React.FC<PremiumCalculatorProps> = ({ onOpenQuoteModal }) => {
  const [calcCategory, setCalcCategory] = useState<'health' | 'motor' | 'life' | 'commercial'>('health');
  
  // Health State
  const [familyMembers, setFamilyMembers] = useState(3);
  const [seniorCitizen, setSeniorCitizen] = useState(false);
  const [cityTier, setCityTier] = useState<'tier2' | 'tier1'>('tier2');

  // Motor State
  const [vehicleAge, setVehicleAge] = useState<'new' | '1to3' | '3to5' | 'above5'>('1to3');
  const [hasNCB, setHasNCB] = useState(true);

  // Commercial State
  const [commercialType, setCommercialType] = useState<'goods' | 'passenger' | 'fleet'>('goods');

  // Calculate Health Sum Insured Recommendation
  const getHealthRecommendation = () => {
    let base = 500000; // 5 Lakhs
    if (familyMembers > 2) base += 200000;
    if (familyMembers > 4) base += 300000;
    if (seniorCitizen) base += 500000;
    if (cityTier === 'tier1') base += 300000;

    return {
      sumInsured: `₹${(base / 100000).toFixed(1)} Lakhs`,
      estimatedAnnualRange: `₹${Math.round(base * 0.016).toLocaleString('en-IN')} - ₹${Math.round(base * 0.024).toLocaleString('en-IN')}`,
      keyAddons: ['Cashless Hospitalization', 'No Sub-limits on Room Rent', 'No Claim Bonus Doubler']
    };
  };

  // Calculate Motor Recommendation
  const getMotorRecommendation = () => {
    const addons = ['Zero Depreciation (Bumper to Bumper)', '24x7 Roadside Assistance'];
    if (vehicleAge === 'new' || vehicleAge === '1to3') {
      addons.push('Engine & Gearbox Protection', 'Consumables Cover');
    }
    return {
      recommendation: vehicleAge === 'above5' ? 'Comprehensive or Third Party + Theft' : 'Full Comprehensive with Zero-Dep',
      ncbDiscount: hasNCB ? 'Up to 50% NCB Bonus Applicable' : 'Standard Rate',
      keyAddons: addons
    };
  };

  const healthRec = getHealthRecommendation();
  const motorRec = getMotorRecommendation();

  return (
    <section className="py-16 lg:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-blue-800 bg-blue-100 border border-blue-200 uppercase tracking-wider">
            Interactive Coverage Guidance
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            Estimate Your Family & Vehicle Coverage Needs
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Use our independent advisory tool to estimate sum insured and essential policy add-ons before requesting multi-insurer quotes.
          </p>
        </div>

        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl max-w-4xl mx-auto">
          
          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-2 border-b border-slate-100 pb-6 mb-8 overflow-x-auto">
            <button
              onClick={() => setCalcCategory('health')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                calcCategory === 'health'
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Health Coverage
            </button>
            <button
              onClick={() => setCalcCategory('motor')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                calcCategory === 'motor'
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Car & Bike Motor
            </button>
            <button
              onClick={() => setCalcCategory('commercial')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                calcCategory === 'commercial'
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Commercial / Truck
            </button>
          </div>

          {/* Health Calculator Form */}
          {calcCategory === 'health' && (
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-6 space-y-5 text-left">
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Number of Family Members to Cover: {familyMembers}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    value={familyMembers}
                    onChange={(e) => setFamilyMembers(parseInt(e.target.value))}
                    className="w-full accent-blue-700"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-medium mt-1">
                    <span>1 Person</span>
                    <span>3 Members</span>
                    <span>6+ Family</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-semibold text-slate-800">Include Senior Citizen Parents?</span>
                  <input
                    type="checkbox"
                    checked={seniorCitizen}
                    onChange={(e) => setSeniorCitizen(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">Primary Hospital Location Zone</label>
                  <select
                    value={cityTier}
                    onChange={(e) => setCityTier(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium"
                  >
                    <option value="tier2">Bidar & Surrounding Districts (Tier 2/3)</option>
                    <option value="tier1">Metros e.g. Bengaluru / Hyderabad (Tier 1)</option>
                  </select>
                </div>

              </div>

              <div className="md:col-span-6 bg-slate-900 text-white rounded-2xl p-6 space-y-4 shadow-lg text-left">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Recommended Sum Insured</span>
                  <Calculator className="w-4 h-4 text-amber-400" />
                </div>

                <div>
                  <div className="text-3xl font-heading font-extrabold text-amber-400">{healthRec.sumInsured}</div>
                  <div className="text-xs text-slate-300 mt-1">Family Floater Coverage</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800 text-xs space-y-1">
                  <span className="text-slate-400 block font-medium">Estimated Premium Range:</span>
                  <span className="text-emerald-400 font-bold text-sm">{healthRec.estimatedAnnualRange} / year</span>
                  <span className="text-[10px] text-slate-400 block">Subject to insurer NCB & medical underwriting.</span>
                </div>

                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wide">Must-Have Policy Features:</span>
                  {healthRec.keyAddons.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => onOpenQuoteModal('Health Insurance')}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md mt-4 flex items-center justify-center gap-2"
                >
                  <span>Compare Health Insurers Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Motor Calculator Form */}
          {calcCategory === 'motor' && (
            <div className="grid md:grid-cols-12 gap-8 items-center text-left">
              <div className="md:col-span-6 space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Vehicle Age</label>
                  <select
                    value={vehicleAge}
                    onChange={(e) => setVehicleAge(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium"
                  >
                    <option value="new">Brand New Vehicle (0-1 Year)</option>
                    <option value="1to3">1 to 3 Years Old</option>
                    <option value="3to5">3 to 5 Years Old</option>
                    <option value="above5">More than 5 Years Old</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Have Existing No Claim Bonus (NCB)?</span>
                    <span className="text-[11px] text-slate-500">Transfers up to 50% discount from old insurer</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={hasNCB}
                    onChange={(e) => setHasNCB(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="md:col-span-6 bg-slate-900 text-white rounded-2xl p-6 space-y-4 shadow-lg">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Motor Policy Recommendation</span>
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                </div>

                <div className="text-xl font-heading font-bold text-white">{motorRec.recommendation}</div>
                <div className="text-xs text-emerald-400 font-semibold">{motorRec.ncbDiscount}</div>

                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wide">Recommended Add-on Covers:</span>
                  {motorRec.keyAddons.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => onOpenQuoteModal('Car Insurance')}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md mt-4 flex items-center justify-center gap-2"
                >
                  <span>Get Instant Motor Quotes</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Commercial Calculator Form */}
          {calcCategory === 'commercial' && (
            <div className="grid md:grid-cols-12 gap-8 items-center text-left">
              <div className="md:col-span-6 space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Commercial Fleet Type</label>
                  <select
                    value={commercialType}
                    onChange={(e) => setCommercialType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium"
                  >
                    <option value="goods">Goods Transport (Trucks, Pickups, Tippers)</option>
                    <option value="passenger">Passenger Transport (Taxis, Buses, Shuttles)</option>
                    <option value="fleet">Multi-Vehicle Fleet (5+ Vehicles)</option>
                  </select>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Commercial vehicle policies require precise IDV valuation, third-party liability endorsements, and paid-driver accident protection to pass transport authority audits.
                </p>
              </div>

              <div className="md:col-span-6 bg-slate-900 text-white rounded-2xl p-6 space-y-4 shadow-lg">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Commercial Risk Advisory</span>
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  We negotiate bulk renewal rates across Tata AIG, New India, ICICI Lombard, and Reliance General for Bidar contractors and transporters.
                </p>

                <button
                  onClick={() => onOpenQuoteModal('Commercial Vehicle Insurance')}
                  className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md mt-4 flex items-center justify-center gap-2"
                >
                  <span>Request Commercial Fleet Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
