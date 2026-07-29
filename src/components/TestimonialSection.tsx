import React from 'react';
import { TESTIMONIALS, BUSINESS_INFO } from '../data/insuranceData';
import { Star, CheckCircle, ExternalLink, Quote, MessageSquare } from 'lucide-react';

export const TestimonialSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-blue-800 bg-blue-50 border border-blue-100 uppercase tracking-wider">
            Verified Customer Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            Trusted by Families, Transporters & Businesses Across Bidar
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Our reputation is built on authentic customer experiences, personal claim advocacy, and long-term advisory relationships.
          </p>
        </div>

        {/* Google Business Profile Rating Hero Card */}
        <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-slate-900 text-white max-w-2xl mx-auto shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-white text-slate-900 font-heading font-black text-2xl flex items-center justify-center shrink-0 shadow-md">
              5.0
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <h3 className="font-heading font-bold text-lg text-white mt-1">Google Business Profile Rating</h3>
              <p className="text-xs text-slate-400">Official Profile • Ground Floor, Rishikesh Complex, Bidar</p>
            </div>
          </div>

          <a
            href={BUSINESS_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md transition-all shrink-0 flex items-center gap-2"
          >
            <span>View Profile on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-12 grid md:grid-cols-2 gap-6 sm:gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 hover:bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 hover:border-blue-300 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                
                {/* Rating Stars & Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-100 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-blue-600" />
                    <span>{item.insuranceType}</span>
                  </span>
                </div>

                {/* Comment Text */}
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              {/* Author Details */}
              <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-heading font-bold text-slate-900 text-sm">{item.author}</h4>
                  <p className="text-slate-500">{item.role} • {item.location}</p>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">{item.date}</span>
              </div>

            </div>
          ))}
        </div>

        {/* Scalable Future Review Note */}
        <div className="mt-12 text-center text-xs text-slate-500 max-w-xl mx-auto space-y-2">
          <p className="flex items-center justify-center gap-1.5 font-medium text-slate-600">
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span>Have you experienced Kadadi Motors policy advisory?</span>
          </p>
          <p>
            We welcome your authentic feedback! <a href={BUSINESS_INFO.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-bold">Leave a review on Google Maps</a> to help fellow residents in Bidar choose trusted insurance protection.
          </p>
        </div>

      </div>
    </section>
  );
};
