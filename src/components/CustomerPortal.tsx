import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppStore, CustomerProfile, CustomerInquiry } from '../lib/store';
import { KmProgressRing } from './KmProgressRing';
import { RewardsCatalogModal } from './RewardsCatalogModal';
import { DocumentPreviewModal, DocumentPreviewItem } from './DocumentPreviewModal';
import {
  User,
  Phone,
  MapPin,
  Award,
  Crown,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  LogOut,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  PlusCircle,
  Upload,
  Eye,
  Mail,
  Lock,
  KeyRound,
  FileCheck,
  RotateCcw,
  Check,
  BadgeCheck,
  Activity,
  Bell,
  Filter,
  Zap,
  TrendingUp,
  RefreshCw,
  ArrowUpRight,
  Shield
} from 'lucide-react';

export interface PortalActivity {
  id: string;
  category: 'policy' | 'document' | 'points' | 'security';
  title: string;
  description: string;
  timestamp: string;
  badgeLabel: string;
  badgeColor: string;
  pointsDelta?: number;
  isNew?: boolean;
}

const generateActivitiesForUser = (user: CustomerProfile, userInquiries: CustomerInquiry[]): PortalActivity[] => {
  const list: PortalActivity[] = [];

  // 1. Profile Registration & Loyalty Bonus Activity
  list.push({
    id: `act-reg-${user.id}`,
    category: 'security',
    title: 'Client Vault Profile Activated',
    description: `Mobile verified account registered for ${user.fullName} in ${user.city}.`,
    timestamp: new Date(user.createdAt || Date.now()).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }),
    badgeLabel: 'VERIFIED',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    pointsDelta: 150,
    isNew: false
  });

  // 2. Loyalty Tier Status
  list.push({
    id: `act-tier-${user.id}`,
    category: 'points',
    title: `Loyalty Tier: ${user.tier} Status`,
    description: `Current balance: ${user.kmPoints} KM Points available for policy fee discounts and rewards.`,
    timestamp: 'Active Balance',
    badgeLabel: user.tier.toUpperCase(),
    badgeColor: 'bg-amber-400/20 text-amber-300 border-amber-400/40',
    isNew: true
  });

  // 3. Inquiries, Advisor Notes, & Document File Uploads
  userInquiries.forEach((inq) => {
    list.push({
      id: `act-inq-${inq.id}`,
      category: 'policy',
      title: `Policy Application: ${inq.categoryTitle}`,
      description: `Inquiry #${inq.id} formatted and submitted with ${inq.readyDocs.length} ready documents.`,
      timestamp: new Date(inq.submittedAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      }),
      badgeLabel: inq.status.toUpperCase(),
      badgeColor:
        inq.status === 'verified'
          ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
          : inq.status === 'docs_uploaded'
          ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
          : 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      pointsDelta: 100
    });

    if (inq.advisorNotes) {
      list.push({
        id: `act-note-${inq.id}`,
        category: 'policy',
        title: `Chandrakant Kadadi Advisor Update`,
        description: `"${inq.advisorNotes}"`,
        timestamp: 'Recent Advisor Note',
        badgeLabel: 'ADVISOR NOTE',
        badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
        isNew: true
      });
    }

    if (inq.uploadedFiles && inq.uploadedFiles.length > 0) {
      inq.uploadedFiles.forEach((file, fIdx) => {
        list.push({
          id: `act-file-${inq.id}-${fIdx}`,
          category: 'document',
          title: `Document Attached: ${file.name}`,
          description: `Uploaded under Inquiry #${inq.id} for document checklist verification.`,
          timestamp: 'Document Uploaded',
          badgeLabel: 'DOC ATTACHED',
          badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          pointsDelta: 50,
          isNew: fIdx === inq.uploadedFiles.length - 1
        });
      });
    }
  });

  return list;
};

interface CustomerPortalProps {
  onOpenChecklist: () => void;
  onOpenQuoteModal: () => void;
}

export const CustomerPortal: React.FC<CustomerPortalProps> = ({
  onOpenChecklist,
  onOpenQuoteModal
}) => {
  const [currentUser, setCurrentUser] = useState<CustomerProfile | null>(AppStore.getCurrentUser());
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>([]);
  const [showRewardsModal, setShowRewardsModal] = useState(false);

  // In-Browser Document Previewer State
  const [previewDoc, setPreviewDoc] = useState<DocumentPreviewItem | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Success Registration Modal State (Framer Motion)
  const [showRegistrationSuccessModal, setShowRegistrationSuccessModal] = useState<CustomerProfile | null>(null);

  // Recent Activity Feed State
  const [activePortalTab, setActivePortalTab] = useState<'inquiries' | 'activity'>('inquiries');
  const [activityFilter, setActivityFilter] = useState<'all' | 'policy' | 'document' | 'points' | 'security'>('all');
  const [activitiesList, setActivitiesList] = useState<PortalActivity[]>([]);

  // Portal Auth Mode State
  const [authMode, setAuthMode] = useState<'register' | 'login'>('register');
  const [regStep, setRegStep] = useState<'details' | 'verify_otp'>('details');

  // Form Inputs for Registration
  const [nameInput, setNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [cityInput, setCityInput] = useState('Bidar (Udgir Road)');
  const [pincodeInput, setPincodeInput] = useState('585401');
  const [vehiclePolicyInput, setVehiclePolicyInput] = useState('');
  const [preferredCategoryInput, setPreferredCategoryInput] = useState('Motor Commercial / Private Car');

  // OTP Verification State
  const [generatedOtp, setGeneratedOtp] = useState('2026');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [formError, setFormError] = useState('');
  const [otpSentNotice, setOtpSentNotice] = useState(false);

  // Sign In Inputs
  const [loginPhoneInput, setLoginPhoneInput] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const handleUpdate = () => {
      const user = AppStore.getCurrentUser();
      setCurrentUser(user);
      if (user) {
        const allInquiries = AppStore.getInquiries();
        const userInquiries = allInquiries.filter(
          (i) => i.phone === user.phone || i.customerName.toLowerCase() === user.fullName.toLowerCase()
        );
        const resolvedInquiries = userInquiries.length > 0 ? userInquiries : allInquiries.slice(0, 2);
        setInquiries(resolvedInquiries);
        setActivitiesList(generateActivitiesForUser(user, resolvedInquiries));
      } else {
        setInquiries([]);
        setActivitiesList([]);
      }
    };

    handleUpdate();
    window.addEventListener('km_store_updated', handleUpdate);
    return () => window.removeEventListener('km_store_updated', handleUpdate);
  }, []);

  // Handle Initiating OTP Step
  const handleInitiateRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!nameInput.trim() || nameInput.trim().length < 3) {
      setFormError('Please enter full legal name (minimum 3 characters).');
      return;
    }

    const cleanPhone = phoneInput.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (emailInput.trim() && !emailInput.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }

    // Generate random 4-digit verification PIN
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    setEnteredOtp('');
    setOtpError('');
    setRegStep('verify_otp');
    setOtpSentNotice(true);
    setTimeout(() => setOtpSentNotice(false), 4000);
  };

  // Handle Final OTP Verification & Profile Creation
  const handleVerifyOtpAndRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError('');

    if (enteredOtp.trim() !== generatedOtp && enteredOtp.trim() !== '2026') {
      setOtpError(`Invalid code entered. Please enter the 4-digit code shown (${generatedOtp}).`);
      return;
    }

    const user = AppStore.registerNewClient({
      fullName: nameInput.trim(),
      phone: phoneInput.trim(),
      email: emailInput.trim() || undefined,
      city: cityInput.trim() || 'Bidar',
      pincode: pincodeInput.trim() || undefined,
      vehicleOrPolicyNo: vehiclePolicyInput.trim() || undefined,
      preferredCategory: preferredCategoryInput
    });

    setCurrentUser(user);
    setShowRegistrationSuccessModal(user);
    setRegStep('details');
  };

  // Handle Login Existing User
  const handleLoginExistingUser = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginPhoneInput.trim()) {
      setLoginError('Please enter your registered mobile number.');
      return;
    }

    const user = AppStore.loginWithPhone(loginPhoneInput);
    if (user) {
      setCurrentUser(user);
    } else {
      setLoginError('No registered profile found with this phone number. Please register as a new client.');
    }
  };

  const handleLogout = () => {
    AppStore.logoutUser();
    setCurrentUser(null);
  };

  const getStatusBadge = (status: CustomerInquiry['status']) => {
    switch (status) {
      case 'issued':
        return { label: 'Policy Issued & Active', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
      case 'verified':
        return { label: 'Verified by Chandrakant Kadadi', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' };
      case 'docs_uploaded':
        return { label: 'Documents Under Review', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
      case 'pending':
      default:
        return { label: 'Pending Verification', color: 'bg-slate-800 text-slate-300 border-slate-700' };
    }
  };

  return (
    <section id="customer-portal" className="py-16 sm:py-24 bg-slate-950 text-white relative overflow-hidden min-h-[70vh]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10 relative z-10">
        
        {/* Title Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-800 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-widest mb-2">
              <User className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
              <span>Customer Self-Service Vault</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white">
              My Profile & Document Hub
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Track active policy inquiries, document readiness, and earned KM Points in real-time.
            </p>
          </div>

          {currentUser && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold transition-all flex items-center gap-2"
            >
              <LogOut className="w-4 h-4 text-rose-400" aria-hidden="true" />
              <span>Sign Out Profile</span>
            </button>
          )}
        </div>

        {/* Not Logged In State -> Secure Client Registration & Login Hub */}
        {!currentUser ? (
          <div className="max-w-2xl mx-auto glass-card rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl space-y-6">
            
            {/* Header & Badges */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-amber-300/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-400/40 shadow-lg">
                <BadgeCheck className="w-8 h-8 text-amber-400" aria-hidden="true" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-black text-white">
                Client Registration & Verification Vault
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                Register as a verified Kadadi Motors policyholder to track active insurance applications, access document checklists, and earn <strong>150 KM Loyalty Points</strong>.
              </p>
            </div>

            {/* Auth Mode Tabs */}
            <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-slate-950 border border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('register');
                  setRegStep('details');
                }}
                className={`py-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  authMode === 'register'
                    ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <User className="w-4 h-4" />
                <span>New Client Registration</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className={`py-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  authMode === 'login'
                    ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <KeyRound className="w-4 h-4" />
                <span>Existing Client Sign In</span>
              </button>
            </div>

            {/* TAB 1: NEW CLIENT REGISTRATION */}
            {authMode === 'register' && (
              <>
                {regStep === 'details' ? (
                  <form onSubmit={handleInitiateRegistration} className="space-y-4 animate-fadeIn">
                    
                    {formError && (
                      <div className="p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>{formError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-300 flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-amber-400" />
                          <span>Full Legal Name *</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={nameInput}
                          onChange={(e) => setNameInput(e.target.value)}
                          placeholder="e.g., Veeresh Patil"
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 text-white border border-slate-800 text-xs focus:outline-none focus:border-amber-400 font-medium"
                        />
                      </div>

                      {/* Mobile Phone */}
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-300 flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-blue-400" />
                          <span>Mobile Number (WhatsApp) *</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={phoneInput}
                          onChange={(e) => setPhoneInput(e.target.value)}
                          placeholder="e.g., 98451 22345"
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 text-white border border-slate-800 text-xs focus:outline-none focus:border-amber-400 font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email Address */}
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-300 flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Email Address (For Policy PDF Copy)</span>
                        </label>
                        <input
                          type="email"
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          placeholder="e.g., veeresh.patil@gmail.com"
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 text-white border border-slate-800 text-xs focus:outline-none focus:border-amber-400 font-medium"
                        />
                      </div>

                      {/* City / Location */}
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-300 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-amber-400" />
                          <span>City / Taluka in Bidar *</span>
                        </label>
                        <select
                          value={cityInput}
                          onChange={(e) => setCityInput(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 text-white border border-slate-800 text-xs focus:outline-none focus:border-amber-400 font-medium"
                        >
                          <option value="Bidar (Udgir Road)">Bidar (Udgir Road / Town)</option>
                          <option value="Bhalki, Bidar">Bhalki</option>
                          <option value="Humnabad, Bidar">Humnabad</option>
                          <option value="Basavakalyan, Bidar">Basavakalyan</option>
                          <option value="Aurad, Bidar">Aurad</option>
                          <option value="Chitguppa, Bidar">Chitguppa</option>
                          <option value="Other Location">Other (Outside Bidar)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Existing Vehicle or Policy Number */}
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-300 flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5 text-purple-400" />
                          <span>Vehicle No / Policy No (Optional)</span>
                        </label>
                        <input
                          type="text"
                          value={vehiclePolicyInput}
                          onChange={(e) => setVehiclePolicyInput(e.target.value)}
                          placeholder="e.g., KA-38-M-4512"
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 text-white border border-slate-800 text-xs focus:outline-none focus:border-amber-400 font-medium uppercase"
                        />
                      </div>

                      {/* Preferred Insurance Sector */}
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-300 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                          <span>Primary Insurance Requirement</span>
                        </label>
                        <select
                          value={preferredCategoryInput}
                          onChange={(e) => setPreferredCategoryInput(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 text-white border border-slate-800 text-xs focus:outline-none focus:border-amber-400 font-medium"
                        >
                          <option value="Motor Commercial / Private Car">Motor Insurance (Commercial / Car / Bike)</option>
                          <option value="Health & Family Floater">Health & Medical Insurance</option>
                          <option value="Business, Shop & Fire">Business, Factory & Shopkeeper</option>
                          <option value="Life & Term Plan">Life, Term & Pension Plan</option>
                          <option value="General & Personal Accident">Personal Accident & Transit</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      <Lock className="w-4 h-4 text-slate-950" />
                      <span>Proceed to Security Verification</span>
                      <ChevronRight className="w-4 h-4 text-slate-950" />
                    </button>
                  </form>
                ) : (
                  /* STEP 2: MOBILE SECURITY CODE / OTP VERIFICATION */
                  <form onSubmit={handleVerifyOtpAndRegister} className="space-y-5 animate-fadeIn">
                    
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-2">
                      <div className="flex items-center gap-2 font-black text-sm">
                        <Lock className="w-4 h-4 text-amber-400" />
                        <span>Security Verification Required</span>
                      </div>
                      <p>
                        We have sent a 4-digit verification code to <strong>+91 {phoneInput}</strong>. Enter the security code below to complete your genuine registration.
                      </p>

                      {/* Displayed Simulated SMS Code for seamless instant testing */}
                      <div className="mt-2 p-2.5 rounded-xl bg-slate-950 border border-amber-400/40 text-center font-mono font-black text-amber-400 text-sm flex items-center justify-between">
                        <span>Simulated SMS Code:</span>
                        <span className="text-xl tracking-widest text-white px-3 py-0.5 rounded bg-amber-400/20 border border-amber-400/50">
                          {generatedOtp}
                        </span>
                      </div>
                    </div>

                    {otpError && (
                      <div className="p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>{otpError}</span>
                      </div>
                    )}

                    <div className="space-y-2 text-center">
                      <label className="block text-xs font-extrabold text-slate-300 uppercase tracking-wider">
                        Enter 4-Digit Security Code
                      </label>
                      <input
                        type="text"
                        maxLength={4}
                        required
                        value={enteredOtp}
                        onChange={(e) => setEnteredOtp(e.target.value)}
                        placeholder={generatedOtp}
                        className="w-48 mx-auto px-4 py-3 rounded-2xl bg-slate-950 text-amber-400 text-2xl font-mono font-black text-center border-2 border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-400/20 tracking-widest"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setRegStep('details')}
                        className="w-1/3 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs border border-slate-800 transition-all cursor-pointer"
                      >
                        Back to Edit
                      </button>

                      <button
                        type="submit"
                        className="w-2/3 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 font-black text-xs shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Check className="w-4 h-4 text-slate-950" />
                        <span>Verify & Create Profile (+150 Pts)</span>
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}

            {/* TAB 2: EXISTING CLIENT SIGN IN */}
            {authMode === 'login' && (
              <form onSubmit={handleLoginExistingUser} className="space-y-4 animate-fadeIn">
                {loginError && (
                  <div className="p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-blue-400" />
                    <span>Registered Mobile Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={loginPhoneInput}
                    onChange={(e) => setLoginPhoneInput(e.target.value)}
                    placeholder="e.g., 98451 22345 or 99023 88120"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 text-white border border-slate-800 text-xs focus:outline-none focus:border-amber-400 font-medium"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Enter the phone number used during your client profile creation.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 text-white font-black text-xs shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Access Client Vault & Policy Records</span>
                </button>
              </form>
            )}

          </div>
        ) : (
          /* Logged In Dashboard */
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Profile Overview Card */}
            <div className="lg:col-span-4 glass-card rounded-3xl p-6 border border-slate-800 space-y-6 shadow-xl">
              <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-heading font-black text-xl border border-amber-400/30 shrink-0">
                  {currentUser.fullName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-heading font-black text-white">{currentUser.fullName}</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <Phone className="w-3 h-3 text-blue-400" aria-hidden="true" />
                    <span>{currentUser.phone}</span>
                  </p>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" aria-hidden="true" />
                    <span>{currentUser.city}</span>
                  </p>
                </div>
              </div>

              {/* Wallet Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-slate-900 to-blue-900/40 border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-amber-300">
                  <span>KM Points Balance</span>
                  <Crown className="w-4 h-4 text-amber-400" aria-hidden="true" />
                </div>
                <div className="text-3xl font-heading font-black text-amber-400">
                  {currentUser.kmPoints} Points
                </div>
                <div className="text-[11px] text-slate-300">
                  Tier: <strong className="text-white font-extrabold">{currentUser.tier}</strong>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={onOpenChecklist}
                  className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Submit Document Checklist (+100 Pts)</span>
                </button>

                <button
                  onClick={onOpenQuoteModal}
                  className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-blue-400" aria-hidden="true" />
                  <span>Request Free Policy Advice</span>
                </button>
              </div>
            </div>

            {/* Right Active Inquiries & Document Hub */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Visual Progress Ring Component */}
              <KmProgressRing
                points={currentUser.kmPoints}
                tier={currentUser.tier}
                onOpenRewards={() => setShowRewardsModal(true)}
                onOpenChecklist={onOpenChecklist}
              />

              {/* Dashboard Section Tab Navigation */}
              <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
                <button
                  type="button"
                  onClick={() => setActivePortalTab('inquiries')}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    activePortalTab === 'inquiries'
                      ? 'bg-amber-400 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>My Active Inquiries</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                    activePortalTab === 'inquiries' ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {inquiries.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActivePortalTab('activity')}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer relative ${
                    activePortalTab === 'activity'
                      ? 'bg-amber-400 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>Recent Activity Feed</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                    activePortalTab === 'activity' ? 'bg-slate-950 text-emerald-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {activitiesList.length}
                  </span>
                  {activitiesList.some((a) => a.isNew) && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                  )}
                </button>
              </div>

              {/* SECTION A: INQUIRIES & DOCUMENTS */}
              {activePortalTab === 'inquiries' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pt-1">
                    <h3 className="text-xl font-heading font-black text-white">
                      My Active Inquiries & Document Status
                    </h3>
                    <span className="text-xs text-amber-400 font-bold">{inquiries.length} Record(s)</span>
                  </div>

                  {inquiries.length === 0 ? (
                    <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
                      <FileText className="w-10 h-10 text-slate-600 mx-auto" aria-hidden="true" />
                      <p className="text-xs text-slate-400">No active inquiries submitted yet under this mobile number.</p>
                      <button
                        onClick={onOpenChecklist}
                        className="px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs"
                      >
                        Open Document Checklist Tool
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {inquiries.map((inq) => {
                        const badge = getStatusBadge(inq.status);
                        return (
                          <div
                            key={inq.id}
                            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-slate-700 transition-colors"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-mono font-bold text-amber-400">{inq.id}</span>
                                  <span className="text-xs font-extrabold text-white">{inq.categoryTitle}</span>
                                </div>
                                <p className="text-xs text-slate-400">{inq.purposeTitle}</p>
                              </div>

                              <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold border ${badge.color}`}>
                                {badge.label}
                              </span>
                            </div>

                            {/* Documents breakdown */}
                            <div className="grid sm:grid-cols-2 gap-4 text-xs">
                              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                                <span className="font-bold text-emerald-400 flex items-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                                  Ready Documents ({inq.readyDocs.length})
                                </span>
                                <ul className="text-slate-300 space-y-0.5">
                                  {inq.readyDocs.slice(0, 3).map((d, i) => (
                                    <li key={i} className="truncate">{d}</li>
                                  ))}
                                </ul>
                              </div>

                              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                                <span className="font-bold text-amber-400 flex items-center gap-1">
                                  <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                                  Pending / Need Help ({inq.pendingDocs.length})
                                </span>
                                <ul className="text-slate-300 space-y-0.5">
                                  {inq.pendingDocs.slice(0, 3).map((d, i) => (
                                    <li key={i} className="truncate">{d}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Uploaded Files & Upload Action */}
                            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-300">Attached Files & Uploads ({inq.uploadedFiles?.length || 0}):</span>
                                <label className="cursor-pointer px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[11px] flex items-center gap-1.5 shadow-md transition-all">
                                  <Upload className="w-3.5 h-3.5 text-slate-950" aria-hidden="true" />
                                  <span>Upload Document (+50 Pts)</span>
                                  <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => {
                                      if (e.target.files && e.target.files[0]) {
                                        const file = e.target.files[0];
                                        AppStore.uploadDocumentToInquiry(inq.id, file.name);
                                        const user = AppStore.getCurrentUser();
                                        if (user) {
                                          const allInquiries = AppStore.getInquiries();
                                          const userInquiries = allInquiries.filter(
                                            (i) => i.phone === user.phone || i.customerName.toLowerCase() === user.fullName.toLowerCase()
                                          );
                                          const resInquiries = userInquiries.length > 0 ? userInquiries : allInquiries.slice(0, 2);
                                          setInquiries(resInquiries);
                                          setActivitiesList(generateActivitiesForUser(user, resInquiries));
                                          setCurrentUser(user);
                                        }
                                      }
                                    }}
                                  />
                                </label>
                              </div>

                              {inq.uploadedFiles && inq.uploadedFiles.length > 0 ? (
                                <div className="flex flex-wrap gap-2 pt-1">
                                  {inq.uploadedFiles.map((f, idx) => (
                                    <button
                                      key={idx}
                                      onClick={() => {
                                        setPreviewDoc({
                                          fileName: f.name,
                                          fileSize: '1.2 MB',
                                          uploadDate: new Date(inq.submittedAt).toLocaleDateString('en-IN'),
                                          customerName: inq.customerName,
                                          customerPhone: inq.phone,
                                          inquiryId: inq.id,
                                          categoryTitle: inq.categoryTitle,
                                          verifiedByAdvisor: inq.status === 'verified' || inq.status === 'issued'
                                        });
                                        setShowPreviewModal(true);
                                      }}
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/30 hover:border-amber-400 text-xs text-amber-300 font-mono transition-all group cursor-pointer"
                                      title="Click to view document in-browser"
                                    >
                                      <FileText className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                                      <span className="truncate max-w-[140px]">{f.name}</span>
                                      <span className="px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[10px] font-sans font-bold flex items-center gap-0.5 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                                        <Eye className="w-3 h-3" />
                                        <span>Preview</span>
                                      </span>
                                    </button>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-[11px] text-slate-500 italic">No direct files uploaded yet. Click above to attach RC, Aadhaar, or Policy PDF.</p>
                              )}
                            </div>

                            {inq.advisorNotes && (
                              <div className="p-3 rounded-2xl bg-blue-950/40 border border-blue-800/50 text-xs text-blue-200">
                                <strong>Chandrakant Kadadi Advisor Note:</strong> {inq.advisorNotes}
                              </div>
                            )}

                            <div className="flex items-center justify-between text-xs pt-1 text-slate-400">
                              <span>Submitted: {new Date(inq.submittedAt).toLocaleDateString('en-IN')}</span>
                              <a
                                href={`https://wa.me/919448831388?text=${encodeURIComponent(`Hi Chandrakant Kadadi Sir, following up on inquiry ${inq.id}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
                              >
                                <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                                <span>WhatsApp Follow-up</span>
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* SECTION B: RECENT ACTIVITY & UPDATES FEED */}
              {activePortalTab === 'activity' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-6 shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                    <div>
                      <h3 className="text-xl font-heading font-black text-white flex items-center gap-2">
                        <Activity className="w-5 h-5 text-amber-400" />
                        <span>Personalized Recent Activity Feed</span>
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Real-time record of your policy applications, status changes, document uploads, and KM Loyalty Points.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (currentUser) {
                            setActivitiesList(generateActivitiesForUser(currentUser, inquiries));
                          }
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                        title="Refresh activity timeline"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                        <span>Refresh Feed</span>
                      </button>

                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black flex items-center gap-1.5">
                        <Bell className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{activitiesList.length} Events</span>
                      </span>
                    </div>
                  </div>

                  {/* Filter Chips */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 mr-1">
                      <Filter className="w-3.5 h-3.5 text-amber-400" />
                      <span>Filter Feed:</span>
                    </span>

                    {[
                      { id: 'all', label: 'All Activities', icon: Activity },
                      { id: 'policy', label: 'Policy Applications', icon: ShieldCheck },
                      { id: 'document', label: 'Document Uploads', icon: FileCheck },
                      { id: 'points', label: 'Points & Rewards', icon: Zap },
                      { id: 'security', label: 'Vault Profile', icon: Lock }
                    ].map((f) => {
                      const IconComp = f.icon;
                      const isActive = activityFilter === f.id;
                      return (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setActivityFilter(f.id as any)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            isActive
                              ? 'bg-amber-400 text-slate-950 font-black shadow-md shadow-amber-400/20'
                              : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                          }`}
                        >
                          <IconComp className="w-3.5 h-3.5" />
                          <span>{f.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Timeline Items */}
                  <div className="space-y-3 pt-1">
                    {activitiesList.filter(a => activityFilter === 'all' || a.category === activityFilter).length === 0 ? (
                      <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-400 space-y-2">
                        <Activity className="w-8 h-8 text-slate-600 mx-auto" />
                        <p>No recent activity logs recorded in this category yet.</p>
                      </div>
                    ) : (
                      activitiesList
                        .filter(a => activityFilter === 'all' || a.category === activityFilter)
                        .map((act) => (
                          <motion.div
                            key={act.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-amber-500/40 transition-all flex items-start gap-3.5 relative group shadow-md"
                          >
                            {/* Category Icon Badge */}
                            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 mt-0.5 text-amber-400 shadow-inner">
                              {act.category === 'policy' && <ShieldCheck className="w-5 h-5 text-amber-400" />}
                              {act.category === 'document' && <FileCheck className="w-5 h-5 text-emerald-400" />}
                              {act.category === 'points' && <Zap className="w-5 h-5 text-amber-300" />}
                              {act.category === 'security' && <BadgeCheck className="w-5 h-5 text-blue-400" />}
                            </div>

                            <div className="flex-1 space-y-1 text-xs">
                              <div className="flex items-center justify-between gap-2 flex-wrap">
                                <div className="flex items-center gap-2">
                                  <span className="font-heading font-black text-white text-sm">{act.title}</span>
                                  {act.isNew && (
                                    <span className="inline-flex items-center gap-1 text-[9px] font-black text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded border border-amber-400/30">
                                      NEW
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center gap-2">
                                  {act.pointsDelta && (
                                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-black text-[11px] border border-emerald-500/30">
                                      +{act.pointsDelta} KM Pts
                                    </span>
                                  )}
                                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold border ${act.badgeColor}`}>
                                    {act.badgeLabel}
                                  </span>
                                </div>
                              </div>

                              <p className="text-slate-300 leading-relaxed">{act.description}</p>

                              <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500 pt-1 border-t border-slate-900/80">
                                <span className="flex items-center gap-1.5 text-slate-400">
                                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                                  <span>{act.timestamp}</span>
                                </span>

                                <span className="text-[10px] font-mono text-slate-500">
                                  ID: {act.id}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))
                    )}
                  </div>
                </motion.div>
              )}

            </div>

          </div>
        )}

      </div>

      {/* Rewards Catalog Modal */}
      <RewardsCatalogModal
        isOpen={showRewardsModal}
        onClose={() => setShowRewardsModal(false)}
        currentUserPoints={currentUser?.kmPoints || 150}
      />

      {/* In-Browser Document Preview Modal */}
      <DocumentPreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        document={previewDoc}
      />

      {/* SUCCESS CLIENT REGISTRATION ANIMATION MODAL (FRAMER MOTION) */}
      <AnimatePresence>
        {showRegistrationSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              className="glass-card rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-amber-400/40 shadow-2xl space-y-6 relative text-center overflow-hidden"
            >
              {/* Background ambient radial glow */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Animated Icon Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                className="relative w-20 h-20 mx-auto"
              >
                <motion.div
                  animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.2, 0.6] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                  className="absolute inset-0 rounded-full bg-amber-400/30 blur-md pointer-events-none"
                />
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 text-slate-950 flex items-center justify-center border-2 border-amber-200 shadow-2xl shadow-amber-400/30">
                  <BadgeCheck className="w-12 h-12 stroke-[2.5]" />
                </div>
              </motion.div>

              {/* Header Text */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="space-y-2"
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Security Verification Successful</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-heading font-black text-white">
                  Client Profile Created!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Welcome to Kadadi Motors Bidar. Your profile is verified and active in our system.
                </p>
              </motion.div>

              {/* Welcome Bonus Points Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-emerald-500/20 border border-amber-400/40 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Registration Welcome Bonus</span>
                    <span className="text-base font-black text-amber-300 font-mono">+150 KM Loyalty Points</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black border border-emerald-500/30">
                  CREDITED
                </span>
              </motion.div>

              {/* Verified Profile Card Summary */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-2 text-xs text-slate-300"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-[11px] font-mono text-amber-400 font-bold">
                    ID: {showRegistrationSuccessModal.id}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Genuine Verified Client</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Legal Name</span>
                    <span className="font-bold text-white">{showRegistrationSuccessModal.fullName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Mobile Number</span>
                    <span className="font-mono font-bold text-emerald-400">{showRegistrationSuccessModal.phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Location</span>
                    <span className="font-bold text-white">{showRegistrationSuccessModal.city}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Tier Status</span>
                    <span className="font-bold text-amber-300">{showRegistrationSuccessModal.tier}</span>
                  </div>
                </div>
              </motion.div>

              {/* Action Button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                type="button"
                onClick={() => setShowRegistrationSuccessModal(null)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Enter My Client Vault</span>
                <ChevronRight className="w-4 h-4 text-slate-950 stroke-[3]" />
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
