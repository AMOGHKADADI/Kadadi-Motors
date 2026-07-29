export type InsuranceCategory =
  | 'health'
  | 'motor'
  | 'commercial'
  | 'life'
  | 'property'
  | 'business'
  | 'specialized';

export interface InsuranceSolution {
  id: string;
  title: string;
  category: InsuranceCategory;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  keyBenefits: string[];
  idealFor: string;
  howWeAssist: string;
  popularPartners?: string[];
}

export interface PartnerInsurer {
  id: string;
  name: string;
  shortName: string;
  category: string;
  description: string;
  logoBg: string;
  textColor: string;
  highlights: string[];
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  role: string;
  rating: number;
  date: string;
  comment: string;
  insuranceType: string;
  verified: boolean;
}

export interface AdvisoryStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  keyOutcome: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'claims' | 'renewals' | 'comparison';
}

export interface QuoteRequestForm {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  insuranceCategory: string;
  specificType: string;
  preferredContactTime: string;
  existingPolicyNumber?: string;
  comments?: string;
}
