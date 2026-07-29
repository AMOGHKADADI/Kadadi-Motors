import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/insuranceData';
import { Headset, RotateCw, PhoneCall, CheckCircle2, AlertTriangle, FileText, Send, MessageSquare } from 'lucide-react';

export const ClaimsRenewalSupport: React.FC = () => {
  const [renewalForm, setRenewalForm] = useState({
    vehicleOrPolicyNumber: '',
    holderName: '',
    phone: '',
    expiryDate: '',
    policyType: 'Car Insurance'
  });
  const [renewalSubmitted, setRenewalSubmitted] = useState(false);

  const handleRenewalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!renewalForm.phone || !renewalForm.holderName) return;
    setRenewalSubmitted(true);
    setTimeout(() => {
      setRenewalSubmitted(false);
      setRenewalForm({
        vehicleOrPolicyNumber: '',
        holderName: '',
        phone: '',
        expiryDate: '',
        policyType: 'Car Insurance'
      });
    }, 5000);
  };

  const claimSteps = [
    {
      num: 1,
      title: 'Inform Us Immediately',
      desc: 'Contact Chandrakant Kadadi or our Bidar desk immediately at 9448114647 after an accident, medical emergency, or property event.'
    },
    {
      num: 2,
      title: 'Document & Spot Verification',
      desc: 'We assist with police intimation if needed, spot photographs, hospital cashless authorization, or garage estimate verification.'
    },
    {
      num: 3,
      title: 'Local Surveyor Liaison',
      desc: 'We coordinate directly with the insurance surveyor assigned to the Bidar and Karnataka region for fair, timely damage assessment.'
    },
    {
      num: 4,
      title: 'Hassle-Free Claim Payout',
      desc: 'We track your claim approval with the insurance company until final cashless repair delivery or direct bank account credit.'
    }
  ];

  return (
    <section id="claims-renewals" className="py-16 lg:py-24 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-amber-400 bg-amber-950/80 border border-amber-800/60 uppercase tracking-wider">
            Lifetime Post-Purchase Support
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
            Dedicated Claims Assistance & Proactive Renewals
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Buying a policy is only step one. Our true value is proven when you need to file a claim or ensure uninterrupted policy coverage.
          </p>
        </div>

        {/* Two Column Grid: Left Claims Guide, Right Renewal Tracker Form */}
        <div className="mt-16 grid lg:grid-cols-12 gap-12">
          
          {/* Left Column: Claims Assistance Guide */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Headset className="w-5 h-5" />
                <span>Claims Assistance Concierge</span>
              </div>
              <h3 className="text-2xl font-heading font-bold text-white">
                Never Deal With Insurers or Call Centres Alone
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                When an accident or emergency occurs, filing claims through distant call centres can be frustrating. Kadadi Motors provides personal local advocacy in Bidar to safeguard your rights.
              </p>
            </div>

            {/* Step-by-Step Claims Process */}
            <div className="space-y-4">
              {claimSteps.map((step) => (
                <div key={step.num} className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                    {step.num}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-white text-base">{step.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Emergency Claim Hotline Box */}
            <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-amber-400 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Emergency Claim Helpline</span>
                </div>
                <p className="text-xs text-slate-300">Call Chandrakant Kadadi directly for urgent accident or hospital claim guidance.</p>
              </div>

              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md shrink-0 flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>

          </div>

          {/* Right Column: Instant Renewal Reminder Registration */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800/90 rounded-2xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl space-y-6">
              
              <div className="space-y-2 pb-4 border-b border-slate-700">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                  <RotateCw className="w-5 h-5" />
                  <span>Proactive Renewal Tracker</span>
                </div>
                <h3 className="text-xl font-heading font-bold text-white">
                  Never Suffer a Policy Lapse
                </h3>
                <p className="text-xs text-slate-300">
                  Register your vehicle or health policy expiry date to receive proactive WhatsApp reminders 30 days before due date.
                </p>
              </div>

              {renewalSubmitted ? (
                <div className="p-6 rounded-xl bg-emerald-950/80 border border-emerald-700/80 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-emerald-300">Renewal Reminder Scheduled!</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Thank you, {renewalForm.holderName}. Our team at Kadadi Motors will review your policy details and send you a reminder with updated rate comparisons before expiry.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRenewalSubmit} className="space-y-4 text-left">
                  
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patil"
                      value={renewalForm.holderName}
                      onChange={(e) => setRenewalForm({ ...renewalForm, holderName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9448114647"
                      value={renewalForm.phone}
                      onChange={(e) => setRenewalForm({ ...renewalForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Policy Category
                      </label>
                      <select
                        value={renewalForm.policyType}
                        onChange={(e) => setRenewalForm({ ...renewalForm, policyType: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Car Insurance">Car Insurance</option>
                        <option value="Two Wheeler Insurance">Bike Insurance</option>
                        <option value="Commercial Vehicle">Commercial Vehicle</option>
                        <option value="Health Insurance">Health Insurance</option>
                        <option value="Fire / Property">Property / Fire</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Approx Expiry Date
                      </label>
                      <input
                        type="date"
                        value={renewalForm.expiryDate}
                        onChange={(e) => setRenewalForm({ ...renewalForm, expiryDate: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Vehicle / Policy Reg No. (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. KA-38-M-1234"
                      value={renewalForm.vehicleOrPolicyNumber}
                      onChange={(e) => setRenewalForm({ ...renewalForm, vehicleOrPolicyNumber: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Set Renewal Alert & Rate Comparison</span>
                  </button>

                  <p className="text-[10px] text-slate-400 text-center">
                    We respect your privacy. No spam or third-party sharing.
                  </p>

                </form>
              )}

              {/* Direct WhatsApp Action */}
              <div className="pt-4 border-t border-slate-700 text-center">
                <a
                  href={`https://wa.me/91${BUSINESS_INFO.whatsappRaw}?text=Hi%20Kadadi%20Motors,%20I%20want%20to%20renew%20my%20policy.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:underline"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Or Send Existing Policy Photo on WhatsApp Directly</span>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
