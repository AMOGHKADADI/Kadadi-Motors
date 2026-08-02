import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/insuranceData';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, ArrowUpRight, Shield } from 'lucide-react';
import { ShareButton } from './ShareButton';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    insuranceCategory: 'Car Insurance',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-slate-950 text-white border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-blue-400 bg-blue-950/80 border border-blue-800/50 uppercase tracking-wider">
            Visit or Contact Our Office
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
            We Are Here to Provide Personal, Honest Guidance
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Visit our Udgir Road office in Bidar or get in touch directly over phone and WhatsApp for immediate insurance consultation.
          </p>
        </div>

        {/* Main Grid: Left Details & Map, Right Contact Form */}
        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* Left Column: Office Details & Directions */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-sm space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <h3 className="text-lg font-heading font-bold text-white">
                  Official Business Address & Contact Info
                </h3>
                <ShareButton variant="dark" label="Share Details" />
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-white block font-semibold text-sm">Office Location</strong>
                    <p className="text-slate-400 leading-relaxed mt-0.5">{BUSINESS_INFO.address}</p>
                    
                    {/* Get Directions CTA & Share */}
                    <div className="flex flex-wrap items-center gap-2 mt-2.5">
                      <a
                        href={BUSINESS_INFO.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                      >
                        <span>Get Directions on Google Maps</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-white block font-semibold text-sm">Business Hours</strong>
                    <p className="text-slate-400 mt-0.5">{BUSINESS_INFO.hours}</p>
                    <span className="inline-block mt-1 text-[11px] font-semibold text-blue-400">Open for In-Person & Phone Consultations</span>
                  </div>
                </div>

                {/* Phone & WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-white block font-semibold text-sm">Phone & WhatsApp</strong>
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      <a
                        href={`tel:${BUSINESS_INFO.phoneRaw}`}
                        className="text-blue-400 hover:underline font-bold"
                      >
                        {BUSINESS_INFO.phoneDisplay}
                      </a>
                      <span className="text-slate-600">•</span>
                      <a
                        href={`https://wa.me/91${BUSINESS_INFO.whatsappRaw}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline font-semibold flex items-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp Desk</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-white block font-semibold text-sm">Official Email</strong>
                    <a
                      href={`mailto:${BUSINESS_INFO.email}`}
                      className="text-slate-300 hover:text-blue-400 hover:underline mt-0.5 block font-medium"
                    >
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                </div>

              </div>

            </div>

            {/* Embedded Interactive Google Map */}
            <div className="bg-slate-900 rounded-2xl p-2 border border-slate-800 shadow-sm overflow-hidden h-[260px] relative">
              <iframe
                title="Kadadi Motors Location Map - Bidar"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3799.30870954041!2d77.5186!3d17.9145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDU0JzUyLjIiTiA3N8KwMzEnMDcuMCJF!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '0.75rem' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>

          {/* Right Column: Direct Advisory Consultation Form */}
          <div className="lg:col-span-6">
            <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-sm space-y-6 text-white">
              
              <div className="space-y-1 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span>Direct Consultation Request</span>
                </div>
                <h3 className="text-xl font-heading font-bold text-white">
                  Request Personal Policy Advice
                </h3>
                <p className="text-xs text-slate-400">
                  Fill in your basic details to receive transparent policy comparisons from Chandrakant Kadadi’s advisory desk.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-blue-400 mx-auto" />
                  <h4 className="text-xl font-heading font-bold text-white">Request Received Successfully!</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Thank you, <strong className="text-white">{formData.fullName}</strong>. Our advisory team will contact you shortly on <strong>{formData.phone}</strong> with tailored options.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        phone: '',
                        email: '',
                        insuranceCategory: 'Car Insurance',
                        message: ''
                      });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Kumar"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Phone / Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9448114647"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Insurance Category *
                    </label>
                    <select
                      value={formData.insuranceCategory}
                      onChange={(e) => setFormData({ ...formData, insuranceCategory: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-blue-500"
                    >
                      <option value="Health Insurance" className="bg-slate-900 text-white">Health Insurance (Family / Individual)</option>
                      <option value="Car Insurance" className="bg-slate-900 text-white">Car Insurance</option>
                      <option value="Two Wheeler Insurance" className="bg-slate-900 text-white">Two Wheeler / Bike Insurance</option>
                      <option value="Commercial Vehicle" className="bg-slate-900 text-white">Commercial Vehicle (Truck, Taxi, Bus)</option>
                      <option value="Life & Term Insurance" className="bg-slate-900 text-white">Life & Term Insurance</option>
                      <option value="Property & Fire Insurance" className="bg-slate-900 text-white">Property & Fire Insurance</option>
                      <option value="Business & Corporate" className="bg-slate-900 text-white">Business & Engineering Insurance</option>
                      <option value="Policy Renewal" className="bg-slate-900 text-white">Policy Renewal & Premium Comparison</option>
                      <option value="Claims Assistance" className="bg-slate-900 text-white">Claims Assistance Support</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Brief Note / Particular Requirements
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Specify vehicle details, sum insured preferences, or current policy expiry date..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Request for Policy Advisory</span>
                  </button>

                  <div className="pt-2 text-center">
                    <a
                      href={`https://wa.me/91${BUSINESS_INFO.whatsappRaw}?text=Hi%20Kadadi%20Motors,%20I%20need%20insurance%20guidance.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-blue-400 hover:underline inline-flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-4 h-4 text-blue-400" />
                      <span>Prefer WhatsApp? Chat directly with us now</span>
                    </a>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
