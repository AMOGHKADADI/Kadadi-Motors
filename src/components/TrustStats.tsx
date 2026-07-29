import React from 'react';
import { Shield, Users, Award, HeartHandshake, FileCheck, Headphones } from 'lucide-react';

export const TrustStats: React.FC = () => {
  const trustPillars = [
    {
      icon: Award,
      title: '25+ Years of Experience',
      description: 'Quarter century of continuous guidance under founder Chandrakant Kadadi in Bidar, Karnataka.',
      badge: 'Heritage & Stability',
      color: 'text-amber-600 bg-amber-50 border-amber-200'
    },
    {
      icon: Shield,
      title: 'Multiple Insurance Partners',
      description: 'Independent evaluation across public and private giants like HDFC ERGO, Tata AIG, Reliance, SBI, ICICI & more.',
      badge: 'Unbiased Choice',
      color: 'text-blue-600 bg-blue-50 border-blue-200'
    },
    {
      icon: HeartHandshake,
      title: 'Personalised Guidance',
      description: 'Every recommendation starts by understanding your true coverage needs, not selling pre-made packages.',
      badge: 'Tailored Advisory',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200'
    },
    {
      icon: Headphones,
      title: 'Local Claims Assistance',
      description: 'Physical surveyor coordination and hands-on document support in Bidar when an emergency occurs.',
      badge: 'Dedicated Advocacy',
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200'
    },
    {
      icon: FileCheck,
      title: 'Proactive Renewal Tracking',
      description: 'Never lose No Claim Bonus (NCB) or suffer policy lapse with our timely 30-day advance alerts.',
      badge: 'Continuous Care',
      color: 'text-sky-600 bg-sky-50 border-sky-200'
    },
    {
      icon: Users,
      title: 'Long-Term Relationships',
      description: 'Built on word-of-mouth referrals and generational trust from countless local families and transport owners.',
      badge: 'Generational Trust',
      color: 'text-purple-600 bg-purple-50 border-purple-200'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-blue-800 bg-blue-50 border border-blue-100 uppercase tracking-wider">
            Why Countless Families & Businesses Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            Built on Reputation, Technical Knowledge, and Lasting Relationships
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Insurance is not merely a piece of paper; it is a promise made for times of uncertainty. Kadadi Motors has spent twenty-five years ensuring that promise is kept.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="mt-12 sm:mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group p-6 sm:p-8 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-blue-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${pillar.color} border shadow-xs group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 shadow-xs">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-heading font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>Kadadi Motors Standard</span>
                  <span className="text-blue-600 font-bold group-hover:translate-x-1 transition-transform inline-block">
                    Verified →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quiet Integrity Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-heading font-bold text-amber-400">
              Personal Advisory From Founder Chandrakant Kadadi
            </h4>
            <p className="text-sm text-slate-300">
              Visit our office at Rishikesh Complex, Udgir Road, Beside MAX, Bidar for a coffee and an honest policy review.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:9448114647"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all"
            >
              Call 9448114647
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
