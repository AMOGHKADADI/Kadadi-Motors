import { InsuranceSolution, PartnerInsurer, Testimonial, AdvisoryStep, FAQItem } from '../types';

export const BUSINESS_INFO = {
  name: 'Kadadi Motors',
  tagline: 'Independent Insurance Advisory & Policy Services',
  founder: 'Chandrakant Kadadi',
  experienceYears: 25,
  locationName: 'Bidar, Karnataka',
  address: 'Ground Floor, Rishikesh Complex, Udgir Road, Beside MAX, Bidar, Karnataka - 585401, India',
  phoneDisplay: '+91 94481 14647',
  phoneRaw: '9448114647',
  whatsappRaw: '9448114647',
  email: 'chandrakantkadadi@gmail.com',
  hours: '10:00 AM – 9:00 PM (Monday to Saturday)',
  googleMapsUrl: 'https://share.google/r2gNsuWmYkmmXmmf0',
  googleRating: 5.0,
  googleReviewCount: 'Google Business Verified',
  establishedYear: 2000,
};

export const INSURANCE_SOLUTIONS: InsuranceSolution[] = [
  {
    id: 'health-insurance',
    title: 'Health Insurance',
    category: 'health',
    shortDescription: 'Comprehensive medical coverage, cashless hospitalisation, and family floaters from top healthcare insurers.',
    fullDescription: 'Hospitalisation costs can unexpectedly disrupt family finances. We advise on health insurance plans that offer comprehensive coverage for hospital stays, day-care procedures, pre/post hospitalisation expenses, critical illnesses, and maternity benefits without hidden sub-limits.',
    iconName: 'HeartPulse',
    keyBenefits: [
      'Cashless admission across 10,000+ network hospitals',
      'No claim bonus accumulators up to 100%',
      'Coverage for pre-existing diseases after standard waiting periods',
      'Tax savings under Section 80D of Income Tax Act'
    ],
    idealFor: 'Individuals, Nuclear & Joint Families, Senior Citizens',
    howWeAssist: 'We analyse hospital network accessibility in Bidar and Karnataka, evaluate co-pay terms, and recommend policies with hassle-free claim settlement histories.',
    popularPartners: ['HDFC ERGO', 'Star Health', 'Care Health', 'ICICI Lombard']
  },
  {
    id: 'car-insurance',
    title: 'Car Insurance',
    category: 'motor',
    shortDescription: 'Comprehensive, zero-depreciation, and third-party car protection with instant digital policy issuance.',
    fullDescription: 'Complete protection for private cars against accidents, natural calamities, theft, and third-party liabilities. Protect your personal vehicle with zero-depreciation add-ons, engine protection, and 24x7 roadside assistance.',
    iconName: 'Car',
    keyBenefits: [
      'Zero depreciation cover for 100% bumper-to-bumper claim payout',
      'Engine and gearbox protection against water ingression',
      '24/7 Roadside Assistance including towing and battery jumpstart',
      'Seamless No Claim Bonus (NCB) transfer from old policies'
    ],
    idealFor: 'Private Car Owners, SUV Owners, New & Pre-owned Vehicle Buyers',
    howWeAssist: 'We compare quotes across 8+ motor insurers to secure optimal IDV (Insured Declared Value) and lowest premium rates with maximum add-on benefits.',
    popularPartners: ['Tata AIG', 'ICICI Lombard', 'Reliance General', 'Bajaj Allianz']
  },
  {
    id: 'bike-insurance',
    title: 'Two-Wheeler Insurance',
    category: 'motor',
    shortDescription: 'Instant multi-year policies for scooters, motorcycles, and superbikes with zero-dep cover.',
    fullDescription: 'Hassle-free coverage for two-wheelers including mandatory Third-Party Liability and Comprehensive Own-Damage protection. Avoid police fines and protect yourself against accidental damages or vehicle theft.',
    iconName: 'Bike',
    keyBenefits: [
      'Instant policy issuance with zero paperwork',
      'Multi-year policy options (1 year OD + 5 year TP)',
      'Personal Accident cover up to ₹15 Lakhs for owner-driver',
      'Consumables and zero-depreciation add-ons'
    ],
    idealFor: 'Scooter & Motorcycle Owners, Daily Commuters',
    howWeAssist: 'Quick online or desk renewals even for lapsed two-wheeler policies without physical inspection in most standard cases.',
    popularPartners: ['HDFC ERGO', 'SBI General', 'IFFCO Tokio', 'Reliance General']
  },
  {
    id: 'commercial-vehicle-insurance',
    title: 'Commercial Vehicle Insurance',
    category: 'commercial',
    shortDescription: 'Tailored policy coverage for commercial vans, pickups, goods carriers, and commercial transport.',
    fullDescription: 'Commercial vehicles are the lifeline of trade and logistics. We provide comprehensive insurance for light commercial vehicles (LCV), goods carrying vehicles, and commercial transport to safeguard business income.',
    iconName: 'Truck',
    keyBenefits: [
      'Coverage for vehicle damage, towing, and third-party liabilities',
      'Protection against transit accidents and natural hazards',
      'Owner-driver and paid driver personal accident cover',
      'Legal liability for goods and passengers'
    ],
    idealFor: 'Local Logistics Operators, Goods Transport Fleet, Business Owners',
    howWeAssist: 'We evaluate vehicle usage patterns and route risk parameters to structure cost-effective commercial vehicle policies.',
    popularPartners: ['Tata AIG', 'New India Assurance', 'ICICI Lombard', 'SBI General']
  },
  {
    id: 'truck-insurance',
    title: 'Heavy Truck & Tipper Insurance',
    category: 'commercial',
    shortDescription: 'High-capacity coverage for multi-axle trucks, trailers, tippers, and heavy goods vehicles.',
    fullDescription: 'Heavy goods vehicles operate under demanding conditions. Our truck insurance advisory ensures your heavy transport fleet has continuous cover against collision, overturn, cargo damage liability, and third-party claims.',
    iconName: 'Container',
    keyBenefits: [
      'High IDV valuation support for heavy vehicles',
      'Towing allowance and emergency highway assistance',
      'Third-party property damage liability coverage',
      'Customized endorsements for specialized tippers & trailers'
    ],
    idealFor: 'Transport Contractors, Heavy Logistics Companies, Fleet Owners',
    howWeAssist: 'We streamline claims documentation and coordinate directly with surveyor networks to minimize vehicle downtime during repair claims.',
    popularPartners: ['New India Assurance', 'Reliance General', 'Tata AIG', 'IFFCO Tokio']
  },
  {
    id: 'taxi-cab-insurance',
    title: 'Taxi & Passenger Vehicle Insurance',
    category: 'commercial',
    shortDescription: 'Comprehensive coverage for passenger taxis, cabs, auto-rickshaws, and tour operator vehicles.',
    fullDescription: 'Ensure full legal compliance and business peace of mind with passenger-carrying commercial vehicle insurance. Covers driver, passenger safety, vehicle damage, and third-party liability.',
    iconName: 'CarFront',
    keyBenefits: [
      'Legal liability cover for carried passengers',
      'Paid driver accidental injury protection',
      'Coverage against natural disasters, strike, and malicious damage',
      'Fast-track claim settlement for commercial cabs'
    ],
    idealFor: 'Taxi Operators, Tour & Travel Operators, Auto Rickshaw Owners',
    howWeAssist: 'We verify passenger seating capacity parameters and ensure accurate policy documentation to prevent claim repudiations.',
    popularPartners: ['ICICI Lombard', 'Bajaj Allianz', 'SBI General', 'New India Assurance']
  },
  {
    id: 'bus-insurance',
    title: 'Bus & Staff Transport Insurance',
    category: 'commercial',
    shortDescription: 'Specialised insurance for school buses, college transport, staff shuttles, and luxury passenger coaches.',
    fullDescription: 'Passenger buses require stringent safety standards and high-value liability coverage. We assist educational institutions, corporate transport providers, and intercity bus operators in obtaining robust insurance policies.',
    iconName: 'Bus',
    keyBenefits: [
      'Comprehensive liability for up to 60+ passengers',
      'Conductor and cleaner accident coverage',
      'Protection against fire, collision, and vandalism',
      'Emergency medical response add-on benefits'
    ],
    idealFor: 'Schools, Colleges, Corporate Fleet Managers, Intercity Operators',
    howWeAssist: 'We review fleet safety records and negotiate volume renewal rates across leading public and private insurers.',
    popularPartners: ['Tata AIG', 'New India Assurance', 'HDFC ERGO', 'ICICI Lombard']
  },
  {
    id: 'fleet-insurance',
    title: 'Fleet Insurance Solutions',
    category: 'commercial',
    shortDescription: 'Unified fleet management insurance covering multiple commercial and passenger vehicles under one arrangement.',
    fullDescription: 'Managing individual insurance policies for multiple vehicles creates administrative complexity. Our fleet insurance solutions consolidate your entire commercial vehicle inventory under streamlined management with synchronized renewal schedules.',
    iconName: 'Layers',
    keyBenefits: [
      'Single point of contact for all vehicle policies and renewals',
      'Volume premium discounts for fleets of 5+ vehicles',
      'Custom claims concierge service managed directly by Kadadi Motors',
      'Flexible vehicle additions and deletions throughout the year'
    ],
    idealFor: 'Logistics Companies, Bus Operators, Corporate Fleets, Contractors',
    howWeAssist: 'We audit your entire fleet history, unify expiry dates, and conduct annual risk-prevention reviews.',
    popularPartners: ['Tata AIG', 'Reliance General', 'ICICI Lombard', 'SBI General']
  },
  {
    id: 'life-insurance',
    title: 'Term & Life Protection',
    category: 'life',
    shortDescription: 'High-cover term life plans and guaranteed wealth protection for long-term family security.',
    fullDescription: 'Life insurance is the cornerstone of family financial planning. We help you calculate true human life value (HLV) to choose pure term insurance plans that protect your family against life’s uncertainties.',
    iconName: 'ShieldCheck',
    keyBenefits: [
      'High sum assured coverage at economical annual premiums',
      'Critical illness and accidental disability riders',
      'Tax benefits under Section 80C and 10(10D)',
      'Hassle-free claim settlement guarantee for non-disclosed exclusions'
    ],
    idealFor: 'Breadwinners, Business Owners, Parents with Dependent Children',
    howWeAssist: 'We conduct independent financial need assessments to ensure adequate sum assured without pushy sales or unnecessary investment products.',
    popularPartners: ['HDFC Life', 'ICICI Prudential', 'SBI Life', 'TATA AIA']
  },
  {
    id: 'property-insurance',
    title: 'Home & Property Insurance',
    category: 'property',
    shortDescription: 'Protection for residential houses, apartments, and commercial structures against natural hazards and burglary.',
    fullDescription: 'Your home or building structure represents a major lifetime investment. Property insurance protects the physical structure, interior contents, electronics, and valuables against fire, flood, storm, earthquake, and burglary.',
    iconName: 'Home',
    keyBenefits: [
      'Structure and contents cover against natural disasters',
      'Burglary, theft, and malicious damage protection',
      'Alternative accommodation expense support during repairs',
      'Valuables and electronic equipment cover'
    ],
    idealFor: 'Homeowners, Apartment Owners, Commercial Building Landlords',
    howWeAssist: 'We assist in accurate property reinstatement valuation to avoid under-insurance clauses during claims.',
    popularPartners: ['HDFC ERGO', 'Tata AIG', 'Reliance General', 'SBI General']
  },
  {
    id: 'fire-insurance',
    title: 'Fire & Special Perils Insurance',
    category: 'property',
    shortDescription: 'Mandatory and essential fire risk protection for factories, warehouses, shops, and commercial stocks.',
    fullDescription: 'Bharat Griha Raksha and Bharat Sookshma Udyam Suraksha policies designed to protect commercial premises, raw materials, finished inventory, machinery, and office assets against fire, explosion, lightning, and water damage.',
    iconName: 'Flame',
    keyBenefits: [
      'Coverage for fire, explosion, implosion, and lightning strike',
      'Protection against flood, inundation, cyclone, and landslide',
      'Loss of profit and business interruption coverage options',
      'Architect and surveyor fee inclusion in claim calculations'
    ],
    idealFor: 'Shopkeepers, Warehouse Owners, Rice Mills, Manufacturers, Retailers',
    howWeAssist: 'We perform on-site risk documentation in Bidar and surrounding industrial areas to ensure precise inventory and asset valuation.',
    popularPartners: ['New India Assurance', 'IFFCO Tokio', 'Tata AIG', 'Bajaj Allianz']
  },
  {
    id: 'business-insurance',
    title: 'Business & Office Insurance',
    category: 'business',
    shortDescription: 'Package policies for retail shops, offices, clinics, and commercial establishments.',
    fullDescription: 'Comprehensive package insurance protecting business premises, office equipment, cash-in-transit, public liability, and employee personal accidents under a single policy.',
    iconName: 'Building2',
    keyBenefits: [
      'All-in-one policy covering premises, contents, and cash in safe/transit',
      'Third-party public liability protection',
      'Electronic equipment breakdown and data restoration support',
      'Workmen compensation for employee injuries'
    ],
    idealFor: 'Shops, Showrooms, Medical Clinics, Offices, Service Centres',
    howWeAssist: 'We tailor shopkeeper and office package policies to eliminate overlapping covers and reduce overhead costs.',
    popularPartners: ['ICICI Lombard', 'SBI General', 'HDFC ERGO', 'Reliance General']
  },
  {
    id: 'engineering-insurance',
    title: 'Engineering & Construction Insurance',
    category: 'specialized',
    shortDescription: 'Contractors All Risk (CAR), Erector All Risk (EAR), and Plant & Machinery protection.',
    fullDescription: 'Specialised insurance policies for construction projects, civil engineering works, industrial machinery erection, and heavy equipment breakdown.',
    iconName: 'HardHat',
    keyBenefits: [
      'Contractors All Risk (CAR) cover for civil construction sites',
      'Contractor Plant & Machinery (CPM) protection',
      'Machinery breakdown and loss of profits insurance',
      'Third-party property damage at construction locations'
    ],
    idealFor: 'Civil Contractors, Real Estate Developers, Infrastructure Builders',
    howWeAssist: 'We review tender requirements and bank guarantee clauses to issue compliant engineering insurance policies promptly.',
    popularPartners: ['New India Assurance', 'Tata AIG', 'Reliance General', 'Bajaj Allianz']
  },
  {
    id: 'personal-accident-insurance',
    title: 'Personal Accident Insurance',
    category: 'health',
    shortDescription: '24/7 worldwide financial shield against accidental death, permanent disability, and income loss.',
    fullDescription: 'Health insurance covers hospital medical bills, but Personal Accident insurance provides direct financial compensation in case of accidental disability, loss of limbs, or accidental death to protect family income.',
    iconName: 'UserCheck',
    keyBenefits: [
      '100% sum assured payout for accidental permanent disability',
      'Weekly income payout during temporary total disability',
      'Children educational grant benefits in emergency cases',
      '24x7 worldwide coverage regardless of location'
    ],
    idealFor: 'Active Professionals, Drivers, Industrial Workers, Business Travellers',
    howWeAssist: 'We combine high-value personal accident policies with existing health plans for complete 360-degree security.',
    popularPartners: ['HDFC ERGO', 'Tata AIG', 'SBI General', 'ICICI Lombard']
  },
  {
    id: 'travel-insurance',
    title: 'International & Domestic Travel Cover',
    category: 'specialized',
    shortDescription: 'Medical emergency, trip cancellation, passport loss, and flight delay protection worldwide.',
    fullDescription: 'Overseas travel involves unexpected health and logistics risks. Our travel insurance advisory ensures full compliance with Schengen visa requirements and international travel safety guidelines.',
    iconName: 'Plane',
    keyBenefits: [
      'Cashless overseas medical emergency treatment',
      'Loss of checked baggage and passport replacement assistance',
      'Trip cancellation, delay, and missed connection compensation',
      'Schengen visa compliant insurance certificate'
    ],
    idealFor: 'Overseas Tourists, Business Travelers, Students Studying Abroad',
    howWeAssist: 'Instant digital policy issuance within 15 minutes before your flight departure.',
    popularPartners: ['Tata AIG', 'ICICI Lombard', 'HDFC ERGO', 'Reliance General']
  },
  {
    id: 'insurance-renewals',
    title: 'Proactive Insurance Renewals',
    category: 'specialized',
    shortDescription: 'Timely policy renewal alerts, NCB retention, and seamless transfer from lapsed policies.',
    fullDescription: 'Allowing an insurance policy to lapse can lead to loss of No Claim Bonus (NCB), penalty charges, or mandatory vehicle inspection. Kadadi Motors provides proactive renewal tracking across all insurance providers.',
    iconName: 'RotateCw',
    keyBenefits: [
      'Automated renewal reminders 30 days prior to expiry',
      'Retention and carry-forward of accrued No Claim Bonus (NCB)',
      'Easy policy porting from old insurers without losing benefits',
      'Instant digital soft copy sent straight to your WhatsApp'
    ],
    idealFor: 'All Existing Policyholders, Vehicle Owners, Health Plan Holders',
    howWeAssist: 'We review your existing policy terms before renewal to check if better rates or updated coverage options are available.',
    popularPartners: ['All Major Insurers']
  },
  {
    id: 'premium-comparison',
    title: 'Independent Premium Comparison',
    category: 'specialized',
    shortDescription: 'Transparent side-by-side comparison across top public and private insurance partners.',
    fullDescription: 'Because Kadadi Motors is an independent insurance advisory, we are not tied to a single insurance brand. We evaluate premium quotes, claim settlement ratios, and coverage terms from multiple leading insurers to give you unbiased recommendations.',
    iconName: 'Scale',
    keyBenefits: [
      'Side-by-side comparison of 6+ leading insurers',
      'Transparent disclosure of co-pay clauses and deductible terms',
      'Unbiased policy recommendation based on coverage quality',
      'Zero extra charge or hidden service fees for advisory'
    ],
    idealFor: 'Cost-Conscious Buyers, Smart Insurance Shoppers, Business Buyers',
    howWeAssist: 'We explain complex policy terms in plain language so you make informed, confident choices.',
    popularPartners: ['All Partner Insurers']
  },
  {
    id: 'claims-assistance',
    title: 'Dedicated Claims Assistance',
    category: 'specialized',
    shortDescription: 'Hands-on claim filing, surveyor coordination, document verification, and advocacy.',
    fullDescription: 'The true test of an insurance advisory comes at the time of a claim. Chandrakant Kadadi and the Kadadi Motors team personally guide policyholders through claim documentation, surveyor appointments, and cashless approvals.',
    iconName: 'Headset',
    keyBenefits: [
      'Step-by-step document verification before claim submission',
      'Direct liaison with insurance company surveyors in Bidar region',
      'Help resolving claim queries, delay issues, and rejection disputes',
      'Dedicated local support team standing by your side'
    ],
    idealFor: 'Policyholders Facing Accidents, Medical Claims, Property Damage',
    howWeAssist: 'You don\'t deal with distant call centres alone; our local team in Bidar actively supports your claim process from start to finish.',
    popularPartners: ['All Partner Insurers']
  }
];

export const PARTNER_INSURERS: PartnerInsurer[] = [
  {
    id: 'hdfc-ergo',
    name: 'HDFC ERGO General Insurance',
    shortName: 'HDFC ERGO',
    category: 'Health & Motor Specialist',
    description: 'One of India\'s premier private general insurers with a network of 10,000+ cashless hospitals and 7,500+ cashless garage partners.',
    logoBg: 'bg-blue-900',
    textColor: 'text-white',
    highlights: ['10,000+ Cashless Hospitals', '24x7 Claim Support', '98.5% Claim Settlement Ratio']
  },
  {
    id: 'tata-aig',
    name: 'Tata AIG General Insurance',
    shortName: 'Tata AIG',
    category: 'Commercial & Motor Pioneer',
    description: 'Backed by Tata Group heritage, offering trusted coverage across motor, health, commercial fleets, and industrial property risks.',
    logoBg: 'bg-slate-900',
    textColor: 'text-amber-400',
    highlights: ['Tata Brand Trust', 'Express Claims Concierge', 'Comprehensive Add-ons']
  },
  {
    id: 'icici-lombard',
    name: 'ICICI Lombard General Insurance',
    shortName: 'ICICI Lombard',
    category: 'Tech-Driven Comprehensive Insurer',
    description: 'Leading digital insurance provider known for swift cashless approvals, instant motor claims, and extensive health coverage networks.',
    logoBg: 'bg-orange-950',
    textColor: 'text-orange-400',
    highlights: ['Instant Digital Policy', 'InstaSpect Motor Claims', 'Wide Garages Network']
  },
  {
    id: 'reliance-general',
    name: 'Reliance General Insurance',
    shortName: 'Reliance General',
    category: 'Motor & Business Insurance',
    description: 'Robust motor and commercial vehicle insurer with broad coverage options for personal vehicles, trucks, and commercial establishments.',
    logoBg: 'bg-blue-950',
    textColor: 'text-blue-300',
    highlights: ['Competitive Motor Rates', 'Quick Commercial Approval', 'Nationwide Network']
  },
  {
    id: 'sbi-general',
    name: 'SBI General Insurance',
    shortName: 'SBI General',
    category: 'National Reach & Reliability',
    description: 'Joint venture backed by State Bank of India, delivering accessible, affordable health, motor, and agricultural protection nationwide.',
    logoBg: 'bg-cyan-950',
    textColor: 'text-cyan-300',
    highlights: ['Nationwide Banking Network', 'Transparent Terms', 'Affordable Premiums']
  },
  {
    id: 'bajaj-allianz',
    name: 'Bajaj Allianz General Insurance',
    shortName: 'Bajaj Allianz',
    category: 'Health & Fleet Security',
    description: 'Globally reputed general insurance giant known for drive-smart motor protection and comprehensive family health plans.',
    logoBg: 'bg-blue-900',
    textColor: 'text-sky-300',
    highlights: ['Caringly Yours App', 'Fast Drive-Thru Claims', 'Global Expertise']
  },
  {
    id: 'iffco-tokio',
    name: 'IFFCO Tokio General Insurance',
    shortName: 'IFFCO Tokio',
    category: 'Commercial & Rural Agriculture',
    description: 'Specialised insurer strong in commercial transport, factory insurance, tractor protection, and rural risk coverage.',
    logoBg: 'bg-emerald-950',
    textColor: 'text-emerald-300',
    highlights: ['Strong Commercial Focus', 'Quick On-Site Assessment', 'Trusted Rural Presence']
  },
  {
    id: 'new-india-assurance',
    name: 'The New India Assurance Co. Ltd.',
    shortName: 'New India Assurance',
    category: 'Public Sector Giant',
    description: 'India\'s premier multinational public sector general insurance company with unmatched reserves, stability, and institutional trust.',
    logoBg: 'bg-indigo-950',
    textColor: 'text-indigo-200',
    highlights: ['100+ Years Heritage', 'Government Sponsored Stability', 'Deep Institutional Trust']
  }
];

export const ADVISORY_STEPS: AdvisoryStep[] = [
  {
    stepNumber: 1,
    title: 'Understand Your Requirements',
    subtitle: 'Needs Analysis & Risk Assessment',
    description: 'We sit down with you—in person at our Udgir Road office or over phone/WhatsApp—to understand your vehicle, family health history, property details, or business risk requirements.',
    iconName: 'SearchCheck',
    keyOutcome: 'Clear understanding of required coverage limits and budgets.'
  },
  {
    stepNumber: 2,
    title: 'Compare Top Insurance Options',
    subtitle: 'Unbiased Multi-Insurer Evaluation',
    description: 'We query multiple leading public and private insurers (HDFC ERGO, Tata AIG, Reliance, ICICI Lombard, SBI, New India, etc.) to evaluate policy inclusions, IDV, sub-limits, and premiums.',
    iconName: 'GitCompare',
    keyOutcome: 'Side-by-side comparison highlighting key policy differences.'
  },
  {
    stepNumber: 3,
    title: 'Recommend Best Fit Policy',
    subtitle: 'Transparent Guidance Without Pressure',
    description: 'We present clear recommendations explaining why a particular policy best balances coverage depth, claim settlement reputation, and premium value.',
    iconName: 'ShieldCheck',
    keyOutcome: 'Confident decision with zero hidden surprises or pushy sales.'
  },
  {
    stepNumber: 4,
    title: 'Lifetime Renewal & Claims Support',
    subtitle: 'Ongoing Partnership & Local Concierge',
    description: 'We remain your dedicated advisor long after the policy is issued. We handle timely renewal alerts, NCB retention, and personal local claim assistance when you need it most.',
    iconName: 'LifeBuoy',
    keyOutcome: 'Complete peace of mind knowing a local expert stands with you.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    author: 'Rajeshwar Patil',
    location: 'Bidar Town',
    role: 'Transport Business Owner',
    rating: 5,
    date: '2 months ago',
    comment: 'Chandrakant Kadadi Sir has been handling our commercial fleet insurance for over 12 years. When one of our trucks met with an accident near Zaheerabad, his prompt help with the surveyor claim settlement saved us from huge loss. Pure honesty and dedication.',
    insuranceType: 'Commercial Vehicle & Fleet',
    verified: true
  },
  {
    id: '2',
    author: 'Dr. Sunita Kulkarni',
    location: 'Udgir Road, Bidar',
    role: 'Healthcare Professional',
    rating: 5,
    date: '1 month ago',
    comment: 'Choosing the right health insurance policy for my parents was confusing with so many aggressive agents calling. Mr. Kadadi calmly explained co-pay clauses and selected an HDFC ERGO family floater. The service here is truly top class.',
    insuranceType: 'Health Insurance',
    verified: true
  },
  {
    id: '3',
    author: 'Mohammed Arif',
    location: 'Basavakalyan',
    role: 'Showroom Partner',
    rating: 5,
    date: '3 weeks ago',
    comment: 'Instant car insurance renewal with zero hassle. I got my policy copy directly on WhatsApp within 10 minutes at a lower premium than online portals. Highly recommended independent advisor in Bidar!',
    insuranceType: 'Car Insurance Renewal',
    verified: true
  },
  {
    id: '4',
    author: 'Vijaykumar Deshmukh',
    location: 'Bhalki',
    role: 'Civil Contractor',
    rating: 5,
    date: '4 months ago',
    comment: 'We obtained Contractors All Risk (CAR) and machinery breakdown insurance for our infrastructure project through Kadadi Motors. Their understanding of tender insurance compliance is outstanding.',
    insuranceType: 'Engineering & Business',
    verified: true
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    category: 'general',
    question: 'Is Kadadi Motors an insurance company or an advisory firm?',
    answer: 'Kadadi Motors is an independent insurance advisory and policy service provider. We do not issue insurance policies directly as an underwriter; instead, we partner with multiple leading public and private insurance companies (such as HDFC ERGO, Tata AIG, ICICI Lombard, Reliance General, SBI General, New India Assurance, etc.) to evaluate and recommend the best policy for your specific needs.'
  },
  {
    category: 'comparison',
    question: 'Why should I consult Kadadi Motors instead of buying online directly?',
    answer: 'Online portals often hide co-pay terms, room rent sub-limits, or deductibles behind fine print. At Kadadi Motors, Chandrakant Kadadi and our team provide personalised, transparent advice with 25+ years of local experience. Most importantly, when a claim or emergency arises, online portals leave you with automated chatbots, whereas Kadadi Motors personally assists you through physical surveyor coordination and local claims guidance in Bidar.'
  },
  {
    category: 'claims',
    question: 'How does Kadadi Motors assist during an insurance claim?',
    answer: 'When an accident, hospitalisation, or property incident occurs, inform us immediately. We verify required claim forms and documents, guide you through cashless or reimbursement procedures, liaise with local insurance surveyors in the Bidar and Karnataka region, and advocate on your behalf to ensure quick, hassle-free settlement.'
  },
  {
    category: 'renewals',
    question: 'What happens if my car or bike insurance has already lapsed?',
    answer: 'If your policy has lapsed, do not panic. We arrange instant inspection where required or facilitate quick online renewal with top insurers to help you retain your accumulated No Claim Bonus (NCB) and restore legal driving status immediately.'
  },
  {
    category: 'general',
    question: 'Where is the Kadadi Motors office located in Bidar?',
    answer: 'Our official office is on the Ground Floor, Rishikesh Complex, Udgir Road, Beside MAX, Bidar, Karnataka - 585401. We are open from 10:00 AM to 9:00 PM, Monday through Saturday. You can also reach us directly on +91 9448114647 or via WhatsApp.'
  }
];
