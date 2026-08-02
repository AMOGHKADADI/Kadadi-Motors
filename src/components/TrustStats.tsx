import React from 'react';
import { Shield, Users, Award, HeartHandshake, FileCheck, Headphones } from 'lucide-react';

export const TrustStats: React.FC = () => {
  const trustPillars = [
    {
      icon: Award,
      title: '25+ Years of Experience',
      description: 'Quarter century of continuous guidance under founder Chandrakant Kadadi in Bidar, Karnataka.',
      badge: 'Heritage & Stability'
    },
    {
      icon: Shield,
      title: 'Multiple Insurance Partners',
      description: 'Independent evaluation across public and private giants like HDFC ERGO, Tata AIG, Reliance, SBI, ICICI & more.',
      badge: 'Unbiased Choice'
    },
    {
      icon: HeartHandshake,
      title: 'Personalised Guidance',
      description: 'Every recommendation starts by understanding your true coverage needs, not selling pre-made packages.',
      badge: 'Tailored Advisory'
    },
    {
      icon: Headphones,
      title: 'Local Claims Assistance',
      description: 'Physical surveyor coordination and hands-on document support in Bidar when an emergency occurs.',
      badge: 'Dedicated Advocacy'
    },
    {
      icon: FileCheck,
      title: 'Proactive Renewal Tracking',
      description: 'Never lose No Claim Bonus (NCB) or suffer policy lapse with our timely 30-day advance alerts.',
      badge: 'Continuous Care'
    },
    {
      icon: Users,
      title: 'Long-Term Relationships',
      description: 'Built on word-of-mouth referrals and generational trust from countless local families and transport owners.',
      badge: 'Generational Trust'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-950 text-white border-b border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-blue-400 bg-blue-950/80 border border-blue-800/50 uppercase tracking-wider">
            Why Families & Transporters Trust Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
            Built on Reputation, Technical Depth, and Lasting Relationships
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Insurance is a financial shield during emergencies. Kadadi Motors has spent over 25 years ensuring that promise is honored.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-slate-800 text-slate-300">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-heading font-bold text-white">
                    {pillar.title}
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-400">
                  <span>Advisory Standard</span>
                  <span className="text-blue-400">Verified</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-heading font-bold text-white">
              Personal 1-on-1 Advisory From Founder Chandrakant Kadadi
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Visit our office at Rishikesh Complex, Udgir Road, Beside MAX, Bidar for a transparent policy review.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:9448114647"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-xs transition-all"
            >
              Call +91 94481 14647
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
