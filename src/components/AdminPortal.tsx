import React, { useState, useEffect } from 'react';
import { AppStore, CustomerInquiry, KMLeaderboardUser, AdminEmailNotification } from '../lib/store';
import { AutomatedEmailNotificationModal } from './AutomatedEmailNotificationModal';
import { DocumentPreviewModal, DocumentPreviewItem } from './DocumentPreviewModal';
import logoImg from '../assets/images/kadadi_motors_logo_1785494192983.jpg';
import {
  ShieldAlert,
  Lock,
  UserCheck,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  FileText,
  MessageSquare,
  Award,
  LogOut,
  Sparkles,
  TrendingUp,
  AlertCircle,
  Building,
  Car,
  Truck,
  HeartPulse,
  Send,
  Check,
  ShieldCheck,
  RefreshCw,
  Radio,
  Wifi,
  Zap,
  Download,
  FileSpreadsheet,
  Copy,
  X,
  FileCode,
  Share2,
  Bell,
  BellRing,
  Trash2,
  UploadCloud,
  ChevronRight,
  Calendar,
  RotateCcw,
  SlidersHorizontal,
  FileCheck,
  Mail,
  Eye,
  Users,
  CheckSquare,
  Square,
  UserX,
  PlusCircle,
  CalendarDays
} from 'lucide-react';

export interface AdminToast {
  id: string;
  type: 'new_inquiry' | 'doc_upload' | 'status_update' | 'system';
  title: string;
  message: string;
  customerName?: string;
  inquiryId?: string;
  timestamp: string;
  unread: boolean;
}

export const AdminPortal: React.FC = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(AppStore.isAdminLoggedIn());
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Main Section Navigation Tab (Inquiries, Registered Users, Quote Builder, Renewals)
  const [adminSection, setAdminSection] = useState<'inquiries' | 'registered_users' | 'quote_dispatcher' | 'renewals'>('inquiries');

  // Dashboard state & Advanced Filters
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>([]);
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedRegistration, setSelectedRegistration] = useState<'all' | 'registered' | 'guest'>('all');
  const [selectedDateRange, setSelectedDateRange] = useState<'all' | 'today' | 'last_7_days' | 'last_30_days'>('all');
  const [selectedDocStatus, setSelectedDocStatus] = useState<'all' | 'ready' | 'pending' | 'uploaded'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'action_required' | 'completed'>('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(true);

  // Bulk Selection & Spam Management State
  const [selectedInquiryIds, setSelectedInquiryIds] = useState<string[]>([]);

  // Registered Users Vault State
  const [registeredUsers, setRegisteredUsers] = useState<any[]>(AppStore.getRegisteredUsers());

  // Quote Builder State
  const [quoteName, setQuoteName] = useState('');
  const [quotePhone, setQuotePhone] = useState('');
  const [quoteCategory, setQuoteCategory] = useState('Motor Commercial / Private Car');
  const [quoteInsurer, setQuoteInsurer] = useState('Star Health & Allied Insurance');
  const [quotePremium, setQuotePremium] = useState('14,850');
  const [quoteSumInsured, setQuoteSumInsured] = useState('₹ 10 Lakhs Coverage');
  const [quoteAddons, setQuoteAddons] = useState('Zero Depreciation + Engine Protect + Roadside Assistance + Cashless at Bidar Garages');

  // Real-time Sync State
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSyncedTime, setLastSyncedTime] = useState<Date>(new Date());
  const [secondsAgo, setSecondsAgo] = useState<number>(0);
  const [refreshNotification, setRefreshNotification] = useState<string>('');

  // Toast Notification System for Chandu Kadadi Desk
  const [toasts, setToasts] = useState<AdminToast[]>([
    {
      id: 'init-toast-1',
      type: 'system',
      title: '🟢 Real-Time Lead & Document Alert Active',
      message: 'Chandrakant Kadadi Desk is monitoring live customer inquiries & document uploads across Bidar.',
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      unread: false
    }
  ]);
  const [showToastDrawer, setShowToastDrawer] = useState(false);
  const prevInquiriesRef = React.useRef<CustomerInquiry[]>([]);

  // Automated Email Service Hub State
  const [emailNotifications, setEmailNotifications] = useState<AdminEmailNotification[]>(
    AppStore.getAdminEmailNotifications()
  );
  const [showEmailModal, setShowEmailModal] = useState(false);

  // In-Browser Document Previewer State
  const [previewDoc, setPreviewDoc] = useState<DocumentPreviewItem | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);

  // Selected Inquiry for Verification Action
  const [selectedInquiry, setSelectedInquiry] = useState<CustomerInquiry | null>(null);
  const [advisorNotes, setAdvisorNotes] = useState('');
  const [policyNo, setPolicyNo] = useState('');
  const [bonusPoints, setBonusPoints] = useState(250);
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');

  // CSV Report & Partner Export State
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportPreset, setExportPreset] = useState<'master' | 'star_health' | 'icici_lombard' | 'new_india'>('master');
  const [exportScope, setExportScope] = useState<'filtered' | 'all' | 'pending' | 'completed'>('filtered');
  const [includeHeaderSummary, setIncludeHeaderSummary] = useState(true);
  const [copiedToast, setCopiedToast] = useState(false);

  const addAdminToast = (
    type: AdminToast['type'],
    title: string,
    message: string,
    customerName?: string,
    inquiryId?: string
  ) => {
    const newToast: AdminToast = {
      id: `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      type,
      title,
      message,
      customerName,
      inquiryId,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      unread: true
    };
    setToasts((prev) => [newToast, ...prev.slice(0, 19)]);
  };

  const markToastRead = (id: string) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, unread: false } : t)));
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const clearAllToasts = () => {
    setToasts([]);
  };

  const handleInspectToast = (toast: AdminToast) => {
    markToastRead(toast.id);
    if (toast.inquiryId) {
      setSearchQuery(toast.inquiryId);
    } else if (toast.customerName) {
      setSearchQuery(toast.customerName);
    }
    const el = document.getElementById('inquiry-register-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Simulation Handlers for Chandu Kadadi & Evaluator Testing
  const handleSimulateNewInquiry = () => {
    const mockNames = ['Basavaraj Patil', 'Suresh Biradar', 'Mohd Alimuddin', 'Dr. Shridhar Rao', 'Vijaykumar Kulkarni'];
    const mockCities = ['Bidar (Udgir Road)', 'Bhalki, Bidar', 'Basavakalyan', 'Humnabad', 'Chitguppa'];
    const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];
    const randomCity = mockCities[Math.floor(Math.random() * mockCities.length)];

    AppStore.addInquiry({
      customerName: randomName,
      phone: `9${Math.floor(100000000 + Math.random() * 900000000)}`,
      city: randomCity,
      category: 'motor',
      categoryTitle: 'Commercial Goods Vehicle',
      purposeTitle: 'Goods Vehicle Comprehensive Insurance',
      readyDocs: ['RC Smart Card', 'Aadhaar Card'],
      pendingDocs: ['Fitness Certificate'],
      advisorNotes: 'Simulated real-time lead submission for Chandu Kadadi.'
    });
  };

  const handleSimulateDocUpload = () => {
    const currentInquiries = AppStore.getInquiries();
    if (currentInquiries.length > 0) {
      const target = currentInquiries[Math.floor(Math.random() * currentInquiries.length)];
      const docs = ['RC_Smart_Card_Scanned.pdf', 'Aadhaar_Front_Back.pdf', 'Previous_Policy_Schedule_2025.pdf', 'PUC_Valid_Certificate.pdf'];
      const randomDoc = docs[Math.floor(Math.random() * docs.length)];
      AppStore.uploadDocumentToInquiry(target.id, randomDoc);
    }
  };

  const fetchLatestInquiries = (showToast: boolean = false) => {
    setIsRefreshing(true);
    const latestData = AppStore.getInquiries();

    // Real-time diff detection comparing with previous snapshot
    if (prevInquiriesRef.current.length > 0) {
      // 1. Detect New Inquiries
      const newInquiries = latestData.filter(
        (latest) => !prevInquiriesRef.current.some((prev) => prev.id === latest.id)
      );

      newInquiries.forEach((inq) => {
        addAdminToast(
          'new_inquiry',
          `⚡ New Insurance Inquiry: ${inq.id}`,
          `${inq.customerName} (${inq.city}) submitted a ${inq.categoryTitle} requirement.`,
          inq.customerName,
          inq.id
        );
      });

      // 2. Detect New Document Uploads or Status Changes
      latestData.forEach((latestInq) => {
        const prevInq = prevInquiriesRef.current.find((p) => p.id === latestInq.id);
        if (prevInq) {
          const prevCount = prevInq.uploadedFiles ? prevInq.uploadedFiles.length : 0;
          const newCount = latestInq.uploadedFiles ? latestInq.uploadedFiles.length : 0;
          if (newCount > prevCount || (prevInq.status !== 'docs_uploaded' && latestInq.status === 'docs_uploaded')) {
            const fileName = latestInq.uploadedFiles && latestInq.uploadedFiles.length > 0 ? latestInq.uploadedFiles[0].name : 'Document File';
            addAdminToast(
              'doc_upload',
              `📄 New Document Uploaded: ${latestInq.id}`,
              `${latestInq.customerName} uploaded "${fileName}" for review.`,
              latestInq.customerName,
              latestInq.id
            );
          }
        }
      });
    }

    prevInquiriesRef.current = latestData;
    setInquiries(latestData);
    setLastSyncedTime(new Date());
    setSecondsAgo(0);

    if (showToast) {
      setRefreshNotification(`Live sync complete • ${latestData.length} records verified.`);
      setTimeout(() => setRefreshNotification(''), 3000);
    }

    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

  useEffect(() => {
    const handleUpdate = (e?: Event) => {
      setIsAdminLoggedIn(AppStore.isAdminLoggedIn());
      setEmailNotifications(AppStore.getAdminEmailNotifications());

      if (e && (e as CustomEvent).detail) {
        const detail = (e as CustomEvent).detail;
        if (detail.type === 'doc_upload') {
          addAdminToast(
            'doc_upload',
            `📄 New Document Uploaded: ${detail.inquiryId}`,
            `${detail.customerName} uploaded "${detail.fileName || 'file'}"!`,
            detail.customerName,
            detail.inquiryId
          );
        }
      }
      fetchLatestInquiries(false);
    };

    const handleEmailSent = (e: Event) => {
      setEmailNotifications(AppStore.getAdminEmailNotifications());
      const mail = (e as CustomEvent).detail as AdminEmailNotification;
      if (mail) {
        addAdminToast(
          'system',
          `📧 Email Dispatched to Chandrakant Kadadi`,
          `Alert sent to chandrakant.kadadi@kadadimotors.com for ${mail.customerName} (${mail.fileName}).`,
          mail.customerName,
          mail.inquiryId
        );
      }
    };

    handleUpdate();
    window.addEventListener('km_store_updated', handleUpdate);
    window.addEventListener('km_admin_email_sent', handleEmailSent);

    // Auto-refresh timer every 10 seconds to ensure up-to-date data without page reloads
    const syncInterval = setInterval(() => {
      fetchLatestInquiries(false);
    }, 10000);

    // Seconds ticker for live sync status
    const ticker = setInterval(() => {
      setSecondsAgo((prev) => prev + 1);
    }, 1000);

    return () => {
      window.removeEventListener('km_store_updated', handleUpdate);
      window.removeEventListener('km_admin_email_sent', handleEmailSent);
      clearInterval(syncInterval);
      clearInterval(ticker);
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = AppStore.adminLogin(username, password);
    if (success) {
      setIsAdminLoggedIn(true);
      setUsername('');
      setPassword('');
    } else {
      setLoginError('Invalid Admin credentials. Please check Username & Password.');
    }
  };

  const handleLogout = () => {
    AppStore.adminLogout();
    setIsAdminLoggedIn(false);
  };

  const handleApproveInquiry = (status: CustomerInquiry['status']) => {
    if (!selectedInquiry) return;

    AppStore.updateInquiryStatus(
      selectedInquiry.id,
      status,
      advisorNotes || 'Reviewed & processed by Chandrakant Kadadi.',
      policyNo,
      bonusPoints
    );

    setActionSuccessMsg(`Inquiry ${selectedInquiry.id} updated to ${status.toUpperCase()}!`);
    setTimeout(() => {
      setActionSuccessMsg('');
      setSelectedInquiry(null);
      setAdvisorNotes('');
      setPolicyNo('');
    }, 2000);
  };

  const handleGenerateWhatsAppReply = (inq: CustomerInquiry) => {
    let msg = `Hello ${encodeURIComponent(inq.customerName)},%0A%0A`;
    msg += `This is *Chandrakant Kadadi* from *Kadadi Motors Insurance Advisory, Bidar*.%0A%0A`;
    msg += `Regarding your inquiry *${inq.id}* for *${encodeURIComponent(inq.categoryTitle)}*:%0A`;
    msg += `Current Status: *${inq.status.toUpperCase()}*%0A%0A`;
    if (inq.policyNo) msg += `*Policy Number Issued:* ${encodeURIComponent(inq.policyNo)}%0A`;
    if (inq.advisorNotes) msg += `*Advisor Note:* ${encodeURIComponent(inq.advisorNotes)}%0A%0A`;
    msg += `Please visit our Udgir Road office in Bidar or reply here if you have any questions!`;

    const waUrl = `https://wa.me/91${inq.phone.replace(/[^0-9]/g, '')}?text=${msg}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  // Single delete inquiry handler
  const handleDeleteSingleInquiry = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete inquiry ${id} for ${name}? This action cannot be undone.`)) {
      AppStore.deleteInquiry(id);
      setSelectedInquiryIds((prev) => prev.filter((item) => item !== id));
      setRefreshNotification(`Inquiry ${id} deleted successfully.`);
      setTimeout(() => setRefreshNotification(''), 3000);
    }
  };

  // Bulk delete selected inquiries handler
  const handleBulkDeleteInquiries = () => {
    if (selectedInquiryIds.length === 0) return;
    if (window.confirm(`Are you sure you want to delete ${selectedInquiryIds.length} selected inquiries?`)) {
      AppStore.deleteInquiriesBulk(selectedInquiryIds);
      setRefreshNotification(`Deleted ${selectedInquiryIds.length} selected inquiries.`);
      setSelectedInquiryIds([]);
      setTimeout(() => setRefreshNotification(''), 3000);
    }
  };

  // Purge Guest / Unregistered Spam handler
  const handlePurgeGuestSpam = () => {
    const guestLeads = inquiries.filter((inq) => !AppStore.isPhoneRegistered(inq.phone));
    if (guestLeads.length === 0) {
      alert('No unregistered guest leads found to purge.');
      return;
    }
    if (window.confirm(`Found ${guestLeads.length} guest / unregistered leads. Do you want to purge them all to clear spam?`)) {
      const idsToPurge = guestLeads.map((g) => g.id);
      AppStore.deleteInquiriesBulk(idsToPurge);
      setRefreshNotification(`Successfully purged ${idsToPurge.length} guest spam leads.`);
      setSelectedInquiryIds([]);
      setTimeout(() => setRefreshNotification(''), 3000);
    }
  };

  // Delete registered user handler
  const handleDeleteRegisteredUser = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete registered user "${name}"?`)) {
      AppStore.deleteRegisteredUser(id);
      setRegisteredUsers(AppStore.getRegisteredUsers());
      setRefreshNotification(`User profile "${name}" deleted.`);
      setTimeout(() => setRefreshNotification(''), 3000);
    }
  };

  // Award user points handler
  const handleAwardUserPoints = (id: string, deltaPoints: number) => {
    AppStore.updateRegisteredUserPoints(id, deltaPoints);
    setRegisteredUsers(AppStore.getRegisteredUsers());
    setRefreshNotification(`Updated loyalty points by ${deltaPoints > 0 ? '+' : ''}${deltaPoints}.`);
    setTimeout(() => setRefreshNotification(''), 3000);
  };

  // Dispatch custom WhatsApp quote
  const handleDispatchWhatsAppQuote = () => {
    if (!quoteName.trim() || !quotePhone.trim()) {
      alert('Please enter customer name and phone number.');
      return;
    }
    let msg = `Hello *${encodeURIComponent(quoteName.trim())}*,%0A%0A`;
    msg += `This is *Chandrakant Kadadi* from *Kadadi Motors Insurance Advisory, Bidar*.%0A%0A`;
    msg += `Here is your customized policy quote details:%0A`;
    msg += `📋 *Insurance Sector:* ${encodeURIComponent(quoteCategory)}%0A`;
    msg += `🛡️ *Insurer Name:* ${encodeURIComponent(quoteInsurer)}%0A`;
    msg += `💰 *Coverage / Sum Insured:* ${encodeURIComponent(quoteSumInsured)}%0A`;
    msg += `🏷️ *Annual Premium:* ₹${encodeURIComponent(quotePremium)}%0A`;
    if (quoteAddons) {
      msg += `✨ *Key Benefits & Covers:* ${encodeURIComponent(quoteAddons)}%0A`;
    }
    msg += `%0APlease let me know if you would like me to issue this policy today or visit our Udgir Road, Bidar office!`;

    const cleanPhone = quotePhone.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/91${cleanPhone}?text=${msg}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  // Filtered inquiries list with multi-criteria advanced search
  const filteredInquiries = inquiries.filter((inq) => {
    // 1. Insurance Sector Matching
    const matchSector = selectedSector === 'all' || inq.category === selectedSector;
    
    // 2. Status Tab Matching
    let matchTab = true;
    if (activeTab === 'pending') {
      matchTab = inq.status === 'pending';
    } else if (activeTab === 'action_required') {
      matchTab = inq.status === 'docs_uploaded' || inq.status === 'verified';
    } else if (activeTab === 'completed') {
      matchTab = inq.status === 'issued';
    }

    // 3. Registration Filter Matching
    let matchRegistration = true;
    if (selectedRegistration === 'registered') {
      matchRegistration = AppStore.isPhoneRegistered(inq.phone);
    } else if (selectedRegistration === 'guest') {
      matchRegistration = !AppStore.isPhoneRegistered(inq.phone);
    }

    // 4. Status Dropdown Matching
    const matchStatus = selectedStatus === 'all' || inq.status === selectedStatus;

    // 5. Date Range Matching
    let matchDate = true;
    if (selectedDateRange !== 'all') {
      const submittedDate = new Date(inq.submittedAt);
      const now = new Date();
      if (selectedDateRange === 'today') {
        matchDate = submittedDate.toDateString() === now.toDateString();
      } else if (selectedDateRange === 'last_7_days') {
        const diffMs = now.getTime() - submittedDate.getTime();
        matchDate = diffMs <= 7 * 24 * 60 * 60 * 1000;
      } else if (selectedDateRange === 'last_30_days') {
        const diffMs = now.getTime() - submittedDate.getTime();
        matchDate = diffMs <= 30 * 24 * 60 * 60 * 1000;
      }
    }

    // 6. Document Completion Status Matching
    let matchDoc = true;
    if (selectedDocStatus === 'ready') {
      matchDoc = Boolean(inq.readyDocs && inq.readyDocs.length > 0) || inq.status === 'verified' || inq.status === 'issued';
    } else if (selectedDocStatus === 'pending') {
      matchDoc = Boolean(inq.pendingDocs && inq.pendingDocs.length > 0) || inq.status === 'pending';
    } else if (selectedDocStatus === 'uploaded') {
      matchDoc = Boolean(inq.uploadedFiles && inq.uploadedFiles.length > 0);
    }

    // 7. Universal Search Bar Query Matching
    const q = searchQuery.trim().toLowerCase();
    const matchSearch =
      !q ||
      inq.customerName.toLowerCase().includes(q) ||
      inq.phone.includes(q) ||
      inq.city.toLowerCase().includes(q) ||
      inq.id.toLowerCase().includes(q) ||
      inq.categoryTitle.toLowerCase().includes(q) ||
      inq.purposeTitle.toLowerCase().includes(q) ||
      (inq.policyNo && inq.policyNo.toLowerCase().includes(q));

    return matchSector && matchTab && matchRegistration && matchStatus && matchDate && matchDoc && matchSearch;
  });

  // Active Filter Helper Calculations
  const activeFiltersCount =
    (searchQuery.trim() !== '' ? 1 : 0) +
    (selectedSector !== 'all' ? 1 : 0) +
    (selectedStatus !== 'all' ? 1 : 0) +
    (selectedRegistration !== 'all' ? 1 : 0) +
    (selectedDateRange !== 'all' ? 1 : 0) +
    (selectedDocStatus !== 'all' ? 1 : 0) +
    (activeTab !== 'all' ? 1 : 0);

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedSector('all');
    setSelectedStatus('all');
    setSelectedDateRange('all');
    setSelectedDocStatus('all');
    setActiveTab('all');
  };

  // Get Target Inquiries based on selected export scope
  const getExportTargetInquiries = (): CustomerInquiry[] => {
    if (exportScope === 'all') return inquiries;
    if (exportScope === 'pending') return inquiries.filter((i) => i.status === 'pending');
    if (exportScope === 'completed') return inquiries.filter((i) => i.status === 'issued');
    return filteredInquiries;
  };

  // CSV Data Generator according to Insurance Partner Preset
  const generateCsvData = (): string => {
    const list = getExportTargetInquiries();
    let headers: string[] = [];
    let rows: string[][] = [];

    const formatField = (val: string | number | undefined): string => {
      const clean = String(val ?? 'N/A').replace(/"/g, '""');
      return `"${clean}"`;
    };

    if (exportPreset === 'star_health') {
      headers = [
        'Partner Agency ID',
        'Member Full Name',
        'Contact Mobile',
        'City / Location',
        'Proposal Sector',
        'Insurance Purpose',
        'Current Status',
        'Policy Issued No',
        'Submitted Date',
        'Remarks / Notes'
      ];
      rows = list.map((i) => [
        '"KM-BIDAR-AGENCY-9801"',
        formatField(i.customerName),
        formatField(i.phone),
        formatField(i.city),
        formatField(i.categoryTitle),
        formatField(i.purposeTitle),
        formatField(i.status.toUpperCase()),
        formatField(i.policyNo || 'PENDING_APPROVAL'),
        formatField(new Date(i.submittedAt).toLocaleDateString('en-IN')),
        formatField(i.advisorNotes || 'Direct Star Health Partner Lead')
      ]);
    } else if (exportPreset === 'icici_lombard') {
      headers = [
        'Docket Ref No',
        'Insured Name',
        'Phone No',
        'Location (Bidar)',
        'Vehicle Category',
        'Policy Purpose',
        'Verification Status',
        'Policy Issued No',
        'KM Points',
        'Submission Timestamp'
      ];
      rows = list.map((i) => [
        formatField(i.id),
        formatField(i.customerName),
        formatField(i.phone),
        formatField(i.city),
        formatField(i.categoryTitle),
        formatField(i.purposeTitle),
        formatField(i.status),
        formatField(i.policyNo || 'N/A'),
        formatField(i.kmPointsAwarded),
        formatField(new Date(i.submittedAt).toLocaleString('en-IN'))
      ]);
    } else if (exportPreset === 'new_india') {
      headers = [
        'Branch Code',
        'Inquiry ID',
        'Client Name',
        'Contact Phone',
        'City / Taluk',
        'Insurance Class',
        'Requirement',
        'Status',
        'Policy Number',
        'Ready Docs Count',
        'Advisor Notes'
      ];
      rows = list.map((i) => [
        '"BIDAR-BRANCH-585401"',
        formatField(i.id),
        formatField(i.customerName),
        formatField(i.phone),
        formatField(i.city),
        formatField(i.categoryTitle),
        formatField(i.purposeTitle),
        formatField(i.status),
        formatField(i.policyNo || 'N/A'),
        formatField(i.readyDocs ? i.readyDocs.length : 0),
        formatField(i.advisorNotes || 'N/A')
      ]);
    } else {
      // General Master Offline Ledger
      headers = [
        'Inquiry ID',
        'Customer Full Name',
        'Contact Phone',
        'City / Location',
        'Insurance Sector',
        'Insurance Requirement',
        'Status',
        'Issued Policy Number',
        'KM Points Awarded',
        'Ready Docs Count',
        'Pending Docs Count',
        'Submission Date',
        'Last Updated Date',
        'Advisor Notes / Remarks'
      ];
      rows = list.map((i) => [
        formatField(i.id),
        formatField(i.customerName),
        formatField(i.phone),
        formatField(i.city),
        formatField(i.categoryTitle),
        formatField(i.purposeTitle),
        formatField(i.status),
        formatField(i.policyNo || 'N/A'),
        formatField(i.kmPointsAwarded),
        formatField(i.readyDocs ? i.readyDocs.length : 0),
        formatField(i.pendingDocs ? i.pendingDocs.length : 0),
        formatField(new Date(i.submittedAt).toLocaleDateString('en-IN')),
        formatField(new Date(i.updatedAt).toLocaleDateString('en-IN')),
        formatField(i.advisorNotes || 'N/A')
      ]);
    }

    let csvLines: string[] = [];
    if (includeHeaderSummary) {
      csvLines.push(`# KADADI MOTORS INSURANCE ADVISORY - OFFICIAL CLIENT INQUIRY REPORT`);
      csvLines.push(`# Export Preset: ${exportPreset.toUpperCase()} | Generated By: Chandrakant Kadadi (Bidar HQ)`);
      csvLines.push(`# Generated At: ${new Date().toLocaleString('en-IN')} | Total Records: ${list.length}`);
      csvLines.push(`#`);
    }

    csvLines.push(headers.join(','));
    rows.forEach((r) => csvLines.push(r.join(',')));

    return csvLines.join('\n');
  };

  // Download CSV File Handler
  const handleDownloadCsv = () => {
    const list = getExportTargetInquiries();
    if (list.length === 0) {
      alert('No client inquiries found for the selected export scope.');
      return;
    }

    const csvContent = generateCsvData();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const dateStr = new Date().toISOString().slice(0, 10);
    link.setAttribute('download', `Kadadi_Motors_${exportPreset.toUpperCase()}_Report_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setRefreshNotification(`Successfully exported ${list.length} records into formatted CSV report!`);
    setTimeout(() => setRefreshNotification(''), 4000);
    setShowExportModal(false);
  };

  // Copy CSV Content to Clipboard
  const handleCopyCsvToClipboard = () => {
    const csvContent = generateCsvData();
    navigator.clipboard.writeText(csvContent);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 3000);
  };

  const totalInquiries = inquiries.length;
  const pendingCount = inquiries.filter((i) => i.status === 'pending').length;
  const docsUploadedCount = inquiries.filter((i) => i.status === 'docs_uploaded' || i.status === 'verified').length;
  const completedCount = inquiries.filter((i) => i.status === 'issued').length;

  if (!isAdminLoggedIn) {
    return (
      <section id="admin-portal-login" className="py-20 sm:py-32 bg-slate-950 text-white min-h-[80vh] flex items-center justify-center p-4 relative overflow-hidden">
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full bg-slate-900/90 rounded-3xl p-8 border border-amber-500/40 shadow-2xl space-y-6 relative z-10 backdrop-blur-xl">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-3">
              <img src={logoImg} alt="Kadadi Motors" className="w-12 h-12 rounded-xl border border-amber-400/40 object-contain" />
              <div className="text-left">
                <span className="text-[10px] uppercase tracking-widest text-amber-400 font-extrabold block">Executive Portal</span>
                <h3 className="text-xl font-heading font-black text-white">Chandrakant Kadadi Admin</h3>
              </div>
            </div>
            <p className="text-xs text-slate-300">
              Restricted management portal for Kadadi Motors Insurance Advisory Bidar.
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-xs text-rose-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" aria-hidden="true" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Admin Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Chandrakant Kadadi"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 text-white border border-slate-800 text-xs focus:outline-none focus:border-amber-400 font-medium font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Admin Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 text-white border border-slate-800 text-xs focus:outline-none focus:border-amber-400 font-medium font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-300 text-slate-950 font-black text-xs shadow-lg transition-all cursor-pointer active:scale-98"
            >
              Authenticate & Launch Control Center
            </button>
          </form>

          <p className="text-[10px] text-slate-500 text-center">
            🔐 Authorized Access Only • Kadadi Motors Bidar (Est. 1998)
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="admin-dashboard-active" className="py-12 sm:py-20 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Admin Header Bar */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-amber-500/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <img src={logoImg} alt="Kadadi Motors" className="w-14 h-14 rounded-2xl border border-amber-400/40 object-contain shrink-0" />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-black uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                  <span>Executive Control Center</span>
                </div>

                {/* Real-Time Live Status Indicator Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold shadow-inner">
                  <span className="relative flex h-2 w-2">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Live Firestore Sync: Active</span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-heading font-black text-white mt-1">
                Welcome, Chandrakant Kadadi
              </h2>
              <p className="text-xs text-slate-400">Founder & Principal Advisor • Kadadi Motors Udgir Road, Bidar</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
            {/* Quick Simulation Buttons for Real-time Testing */}
            <div className="hidden sm:flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950 border border-slate-800">
              <button
                onClick={handleSimulateNewInquiry}
                className="px-2.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold text-[11px] flex items-center gap-1 transition-all"
                title="Simulate incoming inquiry lead submission to test real-time toast alert"
              >
                <Zap className="w-3 h-3 text-amber-400" />
                <span>Simulate Lead</span>
              </button>
              <button
                onClick={handleSimulateDocUpload}
                className="px-2.5 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-[11px] flex items-center gap-1 transition-all"
                title="Simulate customer document upload to test real-time toast alert"
              >
                <UploadCloud className="w-3 h-3 text-emerald-400" />
                <span>Simulate Upload</span>
              </button>
            </div>

            {/* Automated Summary Email Dispatch Button */}
            <button
              onClick={() => setShowEmailModal(true)}
              className="relative px-3.5 py-2.5 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-amber-300 transition-all flex items-center gap-2 cursor-pointer"
              title="View Automated Summary Email Dispatch History sent to Chandrakant Kadadi"
            >
              <Mail className="w-4 h-4 text-amber-400" aria-hidden="true" />
              <span className="hidden sm:inline text-xs font-extrabold">Email Service</span>
              {emailNotifications.filter((n) => !n.read).length > 0 && (
                <span className="flex h-5 px-1.5 items-center justify-center rounded-full bg-amber-400 text-slate-950 text-[10px] font-black shadow-lg">
                  {emailNotifications.filter((n) => !n.read).length}
                </span>
              )}
            </button>

            {/* Real-time Bell Alert Button with Badge */}
            <button
              onClick={() => setShowToastDrawer(true)}
              className="relative p-2.5 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-amber-300 transition-all flex items-center justify-center cursor-pointer"
              title="Open Real-time Alerts History Drawer"
            >
              <Bell className="w-5 h-5 text-amber-400" aria-hidden="true" />
              {toasts.filter((t) => t.unread).length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-black text-white shadow-lg">
                  {toasts.filter((t) => t.unread).length}
                </span>
              )}
            </button>

            {/* Live Sync Status & Manual Refresh Button */}
            <div className="flex items-center gap-3 bg-slate-950/80 px-3.5 py-2 rounded-2xl border border-slate-800">
              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Live Status</div>
                <div className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" aria-hidden="true" />
                  <span>{secondsAgo === 0 ? 'Synced just now' : `Synced ${secondsAgo}s ago`}</span>
                </div>
              </div>

              <button
                onClick={() => fetchLatestInquiries(true)}
                disabled={isRefreshing}
                className={`px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black text-xs transition-all flex items-center gap-2 shadow-lg shadow-amber-400/10 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                  isRefreshing ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                title="Fetch latest user inquiries from Firestore database"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-slate-950 ${isRefreshing ? 'animate-spin' : ''}`} aria-hidden="true" />
                <span>{isRefreshing ? 'Syncing...' : 'Refresh Live Feed'}</span>
              </button>
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold transition-all flex items-center gap-2"
            >
              <LogOut className="w-4 h-4 text-rose-400" aria-hidden="true" />
              <span>Admin Logout</span>
            </button>
          </div>
        </div>

        {/* Live Notification Banner upon Refresh */}
        {refreshNotification && (
          <div className="p-3.5 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-xs text-emerald-200 font-bold flex items-center justify-between gap-3 shadow-lg animate-fadeIn">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
              <span>{refreshNotification}</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono">Real-time update verified</span>
          </div>
        )}

        {/* Real-time Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Customer Inquiries</span>
            <div className="text-3xl font-heading font-black text-white">{totalInquiries}</div>
            <span className="text-[11px] text-blue-400 font-semibold">Across All Sectors</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Pending Verification</span>
            <div className="text-3xl font-heading font-black text-amber-400">{pendingCount}</div>
            <span className="text-[11px] text-amber-300 font-semibold">Action Required</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Docs Under Review</span>
            <div className="text-3xl font-heading font-black text-blue-400">{docsUploadedCount}</div>
            <span className="text-[11px] text-blue-300 font-semibold">Client Docs Ready</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Issued Policies</span>
            <div className="text-3xl font-heading font-black text-emerald-400">{completedCount}</div>
            <span className="text-[11px] text-emerald-300 font-semibold">Completed Records</span>
          </div>
        </div>

        {/* Top Executive Section Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-2 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <button
            onClick={() => setAdminSection('inquiries')}
            className={`px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              adminSection === 'inquiries'
                ? 'bg-amber-400 text-slate-950 font-black shadow-lg shadow-amber-400/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-slate-950" />
            <span>Client Inquiries & Spam Control</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-950 text-amber-300 font-mono font-bold">
              {inquiries.length}
            </span>
          </button>

          <button
            onClick={() => {
              setRegisteredUsers(AppStore.getRegisteredUsers());
              setAdminSection('registered_users');
            }}
            className={`px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              adminSection === 'registered_users'
                ? 'bg-amber-400 text-slate-950 font-black shadow-lg shadow-amber-400/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Users className="w-4 h-4 text-emerald-400" />
            <span>Registered Website Users Directory</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-950 text-emerald-400 font-mono font-bold">
              {registeredUsers.length} Users
            </span>
          </button>

          <button
            onClick={() => setAdminSection('quote_dispatcher')}
            className={`px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              adminSection === 'quote_dispatcher'
                ? 'bg-amber-400 text-slate-950 font-black shadow-lg shadow-amber-400/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Send className="w-4 h-4 text-blue-400" />
            <span>Instant WhatsApp Quote Generator</span>
          </button>

          <button
            onClick={() => setAdminSection('renewals')}
            className={`px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              adminSection === 'renewals'
                ? 'bg-amber-400 text-slate-950 font-black shadow-lg shadow-amber-400/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <CalendarDays className="w-4 h-4 text-amber-400" />
            <span>Annual Policy Renewal Reminders</span>
          </button>
        </div>

        {/* SECTION 1: INQUIRIES REGISTER & SPAM PURGE */}
        {adminSection === 'inquiries' && (
          <div id="inquiry-register-section" className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-6 shadow-xl">
            
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-heading font-black text-white">Client Inquiry Register</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-500/30 text-[10px] font-black uppercase">
                    {filteredInquiries.length} Records Shown
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Filter by registered users, purge spam leads, or review documents for instant policy sanctioning.</p>
              </div>

              {/* Quick Spam Purge Button */}
              <button
                onClick={handlePurgeGuestSpam}
                className="px-3.5 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
                title="Purge all unregistered guest submissions to keep ledger spam-free"
              >
                <UserX className="w-4 h-4 text-rose-400" />
                <span>Purge Unregistered Spam Leads</span>
              </button>
            </div>

            {/* Bulk Selection Actions Bar */}
            {selectedInquiryIds.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-amber-400 text-slate-950 font-bold text-xs flex flex-wrap items-center justify-between gap-3 shadow-xl animate-fadeIn">
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-slate-950" />
                  <span>{selectedInquiryIds.length} lead(s) selected for bulk management</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleBulkDeleteInquiries}
                    className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-extrabold hover:bg-rose-700 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Selected Spam ({selectedInquiryIds.length})</span>
                  </button>

                  <button
                    onClick={() => setSelectedInquiryIds([])}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-950 text-amber-300 font-bold hover:bg-slate-900 cursor-pointer"
                  >
                    Clear Selection
                  </button>
                </div>
              </div>
            )}

            {/* Advanced Search & Multi-Filter Control Panel */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-4">
              
              {/* Control Bar: Primary Search Input & Utility Buttons */}
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
                {/* Universal Search Input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-3" aria-hidden="true" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by customer name, phone, city, ID, requirement or policy no..."
                    className="w-full pl-10 pr-9 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-medium"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-3 text-slate-400 hover:text-white"
                      title="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Utility Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className={`px-3.5 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      showAdvancedFilters
                        ? 'bg-amber-400/10 border-amber-400/50 text-amber-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                    <span>Filters</span>
                    {activeFiltersCount > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black">
                        {activeFiltersCount}
                      </span>
                    )}
                  </button>

                  {activeFiltersCount > 0 && (
                    <button
                      onClick={resetAllFilters}
                      className="px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-rose-400 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                      title="Reset all active search filters"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
                      <span className="hidden sm:inline">Reset</span>
                    </button>
                  )}

                  <button
                    onClick={() => fetchLatestInquiries(true)}
                    disabled={isRefreshing}
                    className="px-3 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs text-amber-300 font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                    title="Sync Latest Data"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isRefreshing ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline">Sync</span>
                  </button>

                  <button
                    onClick={() => setShowExportModal(true)}
                    className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                    title="Export Inquiries into Formatted CSV Report"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-slate-950" />
                    <span className="hidden sm:inline">Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Expandable Multi-Criteria Filter Controls Grid */}
              {showAdvancedFilters && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-3 border-t border-slate-800/80 animate-fadeIn">
                  
                  {/* 1. Website Registration Filter */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                      <UserCheck className="w-3 h-3 text-amber-400" />
                      <span>User Registration</span>
                    </label>
                    <select
                      value={selectedRegistration}
                      onChange={(e) => setSelectedRegistration(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-900 border border-amber-500/40 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-bold"
                    >
                      <option value="all">All Submissions</option>
                      <option value="registered">Registered Website Users Only</option>
                      <option value="guest">Unregistered Guest Leads</option>
                    </select>
                  </div>

                  {/* 2. Insurance Sector Selector */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                      <Filter className="w-3 h-3 text-amber-400" />
                      <span>Insurance Sector</span>
                    </label>
                    <select
                      value={selectedSector}
                      onChange={(e) => setSelectedSector(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="all">All Insurance Sectors</option>
                      <option value="motor">Motor & Transport Vehicles</option>
                      <option value="health">Health & Medical Plans</option>
                      <option value="business">Business, Shop & Fire</option>
                      <option value="life">Life, Term & Savings</option>
                      <option value="general">General & Personal Accident</option>
                    </select>
                  </div>

                  {/* 3. Date Range Filter */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      <span>Date Submitted Range</span>
                    </label>
                    <select
                      value={selectedDateRange}
                      onChange={(e) => setSelectedDateRange(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="all">All Dates / All Time</option>
                      <option value="today">Submitted Today</option>
                      <option value="last_7_days">Last 7 Days</option>
                      <option value="last_30_days">Last 30 Days</option>
                    </select>
                  </div>

                  {/* 4. Document Completion Status */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                      <FileCheck className="w-3 h-3 text-amber-400" />
                      <span>Doc Completion Status</span>
                    </label>
                    <select
                      value={selectedDocStatus}
                      onChange={(e) => setSelectedDocStatus(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="all">All Document States</option>
                      <option value="ready">Has Ready Verified Docs</option>
                      <option value="pending">Has Pending Required Docs</option>
                      <option value="uploaded">Customer Uploaded Direct Files</option>
                    </select>
                  </div>

                  {/* 5. Workflow Stage */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-amber-400" />
                      <span>Workflow Stage</span>
                    </label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="all">All Workflow Stages</option>
                      <option value="pending">Pending Advisory Review</option>
                      <option value="docs_uploaded">Docs Uploaded (Under Verification)</option>
                      <option value="verified">Verified (Ready for Issuance)</option>
                      <option value="issued">Policy Issued & Active</option>
                      <option value="rejected">Inquiry Closed / Cancelled</option>
                    </select>
                  </div>

                </div>
              )}

              {/* Active Filters Badge Strip */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/60 text-xs">
                  <span className="text-[11px] font-bold text-slate-400">Active Filters:</span>

                  {selectedRegistration !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold">
                      Registration: {selectedRegistration === 'registered' ? 'Registered Users Only' : 'Guest Leads Only'}
                      <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setSelectedRegistration('all')} />
                    </span>
                  )}

                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-300 font-medium">
                      Search: "{searchQuery}"
                      <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setSearchQuery('')} />
                    </span>
                  )}

                  {selectedSector !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-300 font-medium capitalize">
                      Sector: {selectedSector}
                      <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setSelectedSector('all')} />
                    </span>
                  )}

                  <button
                    onClick={resetAllFilters}
                    className="text-[11px] font-extrabold text-rose-400 hover:underline ml-auto cursor-pointer"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}

            </div>

            {/* Dedicated Status Tabs (Pending, Action Required, Completed, All) */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-950 border border-slate-800/80">
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 focus:outline-none ${
                  activeTab === 'pending'
                    ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20 font-black'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Clock className={`w-4 h-4 ${activeTab === 'pending' ? 'text-slate-950' : 'text-amber-400'}`} aria-hidden="true" />
                <span>Pending</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  activeTab === 'pending' ? 'bg-slate-950 text-amber-300' : 'bg-slate-900 text-amber-400 border border-amber-500/20'
                }`}>
                  {pendingCount}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('action_required')}
                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 focus:outline-none ${
                  activeTab === 'action_required'
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20 font-black'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                <AlertCircle className={`w-4 h-4 ${activeTab === 'action_required' ? 'text-white' : 'text-blue-400'}`} aria-hidden="true" />
                <span>Action Required</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  activeTab === 'action_required' ? 'bg-slate-950 text-blue-300' : 'bg-slate-900 text-blue-400 border border-blue-500/20'
                }`}>
                  {docsUploadedCount}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('completed')}
                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 focus:outline-none ${
                  activeTab === 'completed'
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-black'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 ${activeTab === 'completed' ? 'text-slate-950' : 'text-emerald-400'}`} aria-hidden="true" />
                <span>Completed</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  activeTab === 'completed' ? 'bg-slate-950 text-emerald-300' : 'bg-slate-900 text-emerald-400 border border-emerald-500/20'
                }`}>
                  {completedCount}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 focus:outline-none ${
                  activeTab === 'all'
                    ? 'bg-slate-800 text-white border border-slate-700 shadow-md font-black'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <ShieldCheck className={`w-4 h-4 ${activeTab === 'all' ? 'text-amber-400' : 'text-slate-400'}`} aria-hidden="true" />
                <span>All Inquiries</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-slate-900 text-slate-300 border border-slate-800">
                  {totalInquiries}
                </span>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-3 w-8">
                      <input
                        type="checkbox"
                        checked={filteredInquiries.length > 0 && selectedInquiryIds.length === filteredInquiries.length}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedInquiryIds(filteredInquiries.map((i) => i.id));
                          } else {
                            setSelectedInquiryIds([]);
                          }
                        }}
                        className="rounded border-slate-700 text-amber-400 focus:ring-amber-400"
                      />
                    </th>
                    <th className="py-3 px-4">Inquiry ID</th>
                    <th className="py-3 px-4">Client Name & Phone</th>
                    <th className="py-3 px-4">User Status</th>
                    <th className="py-3 px-4">Insurance Category</th>
                    <th className="py-3 px-4">Ready Docs</th>
                    <th className="py-3 px-4">Uploaded Files</th>
                    <th className="py-3 px-4">Stage</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredInquiries.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-12 text-center text-slate-400">
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <Clock className="w-8 h-8 text-slate-600" aria-hidden="true" />
                          <span className="font-bold text-sm text-slate-300">No customer inquiries found in this view.</span>
                          <p className="text-xs text-slate-500 max-w-sm">
                            Try clearing your search filters or switching tabs to view registered user leads.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredInquiries.map((inq) => {
                      const isRegistered = AppStore.isPhoneRegistered(inq.phone);
                      const isSelected = selectedInquiryIds.includes(inq.id);

                      return (
                        <tr key={inq.id} className={`hover:bg-slate-800/50 transition-colors ${isSelected ? 'bg-amber-500/10' : ''}`}>
                          <td className="py-3.5 px-3">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedInquiryIds((prev) => [...prev, inq.id]);
                                } else {
                                  setSelectedInquiryIds((prev) => prev.filter((id) => id !== inq.id));
                                }
                              }}
                              className="rounded border-slate-700 text-amber-400 focus:ring-amber-400"
                            />
                          </td>

                          <td className="py-3.5 px-4 font-mono font-bold text-amber-400">{inq.id}</td>
                          
                          <td className="py-3.5 px-4 font-bold text-white">
                            <div>{inq.customerName}</div>
                            <div className="text-[10px] text-slate-400 font-normal">{inq.phone} • {inq.city}</div>
                          </td>

                          <td className="py-3.5 px-4">
                            {isRegistered ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                                <UserCheck className="w-3 h-3 text-emerald-400" />
                                <span>Registered User</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">
                                <span>Guest Lead</span>
                              </span>
                            )}
                          </td>

                          <td className="py-3.5 px-4 text-slate-300">
                            <div className="font-semibold">{inq.categoryTitle}</div>
                            <div className="text-[10px] text-slate-500">{inq.purposeTitle}</div>
                          </td>

                          <td className="py-3.5 px-4 text-emerald-400 font-semibold">
                            {inq.readyDocs.length} Ready / {inq.pendingDocs.length} Pending
                          </td>

                          <td className="py-3.5 px-4">
                            {inq.uploadedFiles && inq.uploadedFiles.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {inq.uploadedFiles.map((f, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => {
                                      setPreviewDoc({
                                        fileName: f.name,
                                        fileSize: '1.4 MB',
                                        uploadDate: new Date(inq.submittedAt).toLocaleDateString('en-IN'),
                                        customerName: inq.customerName,
                                        customerPhone: inq.phone,
                                        inquiryId: inq.id,
                                        categoryTitle: inq.categoryTitle,
                                        verifiedByAdvisor: inq.status === 'verified' || inq.status === 'issued'
                                      });
                                      setShowPreviewModal(true);
                                    }}
                                    className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-[10px] text-amber-300 font-mono font-bold flex items-center gap-1 transition-all cursor-pointer"
                                    title="Inspect document in-browser without downloading"
                                  >
                                    <Eye className="w-3 h-3 text-amber-400 shrink-0" />
                                    <span className="truncate max-w-[110px]">{f.name}</span>
                                  </button>
                                ))}
                              </div>
                            ) : (
                              <span className="text-[10px] text-slate-500 italic">No files attached</span>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                              inq.status === 'issued'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : inq.status === 'verified'
                                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            }`}>
                              {inq.status.toUpperCase()}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-right space-x-1.5">
                            <button
                              onClick={() => setSelectedInquiry(inq)}
                              className="px-2.5 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-bold text-[11px] hover:bg-amber-300 transition-all cursor-pointer"
                            >
                              Review
                            </button>

                            <button
                              onClick={() => handleGenerateWhatsAppReply(inq)}
                              className="px-2 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-500 transition-all cursor-pointer"
                              title="Send WhatsApp confirmation"
                            >
                              <MessageSquare className="w-3.5 h-3.5 inline" aria-hidden="true" />
                            </button>

                            <button
                              onClick={() => handleDeleteSingleInquiry(inq.id, inq.customerName)}
                              className="px-2 py-1.5 rounded-lg bg-slate-950 hover:bg-rose-950 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-500/50 transition-all cursor-pointer"
                              title="Delete inquiry lead (Spam Removal)"
                            >
                              <Trash2 className="w-3.5 h-3.5 inline" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* SECTION 2: REGISTERED USERS DIRECTORY */}
        {adminSection === 'registered_users' && (
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <h3 className="text-xl font-heading font-black text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-400" />
                  <span>Genuine Registered Clients Directory</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Verified client accounts registered through the Kadadi Motors self-service portal in Bidar.
                </p>
              </div>

              <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{registeredUsers.length} Genuine Verified Clients</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {registeredUsers.map((u) => (
                <div key={u.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 relative hover:border-amber-500/50 transition-all shadow-lg flex flex-col justify-between">
                  
                  <div className="space-y-3">
                    {/* Header Badges */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                            {u.id}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                            <ShieldCheck className="w-3 h-3 text-emerald-400" />
                            <span>Genuine Client</span>
                          </span>
                        </div>
                        <h4 className="text-lg font-heading font-black text-white pt-1">{u.fullName}</h4>
                      </div>

                      <button
                        onClick={() => handleDeleteRegisteredUser(u.id, u.fullName)}
                        className="p-2 rounded-xl bg-slate-900 hover:bg-rose-950 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-500/40 transition-all cursor-pointer shrink-0"
                        title="Delete user profile"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Client Contact & Location Details */}
                    <div className="space-y-1.5 text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                      <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{u.phone}</span>
                      </div>

                      {u.email && (
                        <div className="flex items-center gap-2 text-slate-300 font-medium truncate">
                          <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                          <span className="truncate">{u.email}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-slate-300">
                        <Building className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{u.city || 'Bidar'}{u.pincode ? ` - ${u.pincode}` : ''}</span>
                      </div>

                      {u.vehicleOrPolicyNo && (
                        <div className="flex items-center gap-2 pt-1">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">Vehicle/Policy RC:</span>
                          <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono font-bold text-[11px]">
                            {u.vehicleOrPolicyNo}
                          </span>
                        </div>
                      )}

                      {u.preferredCategory && (
                        <div className="text-[11px] text-slate-400 pt-0.5">
                          <span className="font-bold text-slate-300">Requirement:</span> {u.preferredCategory}
                        </div>
                      )}
                    </div>

                    {/* Tier & Loyalty Points */}
                    <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold block uppercase">Loyalty Tier</span>
                        <span className="font-extrabold text-amber-300">{u.tier || 'Bronze'}</span>
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-400 font-bold block uppercase">KM Points</span>
                        <span className="font-extrabold text-emerald-400 font-mono">{u.kmPoints} Pts</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => {
                        const waUrl = `https://wa.me/91${u.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(u.fullName)},%20this%20is%20Chandrakant%20Kadadi%20from%20Kadadi%20Motors%20Bidar.`;
                        window.open(waUrl, '_blank', 'noopener,noreferrer');
                      }}
                      className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>

                    <button
                      onClick={() => handleAwardUserPoints(u.id, 100)}
                      className="py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
                      title="Award 100 Bonus KM Points"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>+100 Pts</span>
                    </button>

                    <button
                      onClick={() => {
                        setSearchQuery(u.phone);
                        setAdminSection('inquiries');
                      }}
                      className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all cursor-pointer"
                      title="Filter inquiries for this user"
                    >
                      <span>Inquiries</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3: INSTANT WHATSAPP QUOTE GENERATOR */}
        {adminSection === 'quote_dispatcher' && (
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-6 shadow-xl">
            <div className="border-b border-slate-800/80 pb-4">
              <h3 className="text-xl font-heading font-black text-white flex items-center gap-2">
                <Send className="w-5 h-5 text-amber-400" />
                <span>Instant WhatsApp Quote Generator</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Compose and send custom insurance policy quotes directly to customer WhatsApp phones in Bidar.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Form Input */}
              <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Customer Full Name</label>
                  <input
                    type="text"
                    value={quoteName}
                    onChange={(e) => setQuoteName(e.target.value)}
                    placeholder="e.g., Veeresh Patil"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">WhatsApp Mobile Number</label>
                  <input
                    type="text"
                    value={quotePhone}
                    onChange={(e) => setQuotePhone(e.target.value)}
                    placeholder="e.g., 98451 22345"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-mono font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Insurance Category</label>
                    <input
                      type="text"
                      value={quoteCategory}
                      onChange={(e) => setQuoteCategory(e.target.value)}
                      placeholder="e.g., Commercial Vehicle"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Insurance Partner</label>
                    <input
                      type="text"
                      value={quoteInsurer}
                      onChange={(e) => setQuoteInsurer(e.target.value)}
                      placeholder="e.g., Star Health / Tata AIG"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Annual Premium (₹)</label>
                    <input
                      type="text"
                      value={quotePremium}
                      onChange={(e) => setQuotePremium(e.target.value)}
                      placeholder="e.g., 14,850"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Sum Insured / IDV</label>
                    <input
                      type="text"
                      value={quoteSumInsured}
                      onChange={(e) => setQuoteSumInsured(e.target.value)}
                      placeholder="e.g., ₹ 10 Lakhs"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Key Covers & Add-ons</label>
                  <textarea
                    rows={3}
                    value={quoteAddons}
                    onChange={(e) => setQuoteAddons(e.target.value)}
                    placeholder="e.g., Zero Depreciation, Engine Protect, Cashless in Bidar garages"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-medium"
                  />
                </div>

                <button
                  onClick={handleDispatchWhatsAppQuote}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-slate-950" />
                  <span>Dispatch Quote to WhatsApp</span>
                </button>
              </div>

              {/* Message Live Preview */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Live Message Preview</span>
                <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-100 font-sans text-xs space-y-3 shadow-inner">
                  <p>Hello <strong>{quoteName || '[Customer Name]'}</strong>,</p>
                  <p>This is <strong>Chandrakant Kadadi</strong> from <strong>Kadadi Motors Insurance Advisory, Bidar</strong>.</p>
                  <p>Here is your customized policy quote details:</p>
                  <ul className="space-y-1 pl-2 border-l-2 border-emerald-500/50">
                    <li>📋 <strong>Category:</strong> {quoteCategory}</li>
                    <li>🛡️ <strong>Insurer:</strong> {quoteInsurer}</li>
                    <li>💰 <strong>Coverage:</strong> {quoteSumInsured}</li>
                    <li>🏷️ <strong>Annual Premium:</strong> ₹{quotePremium}</li>
                    {quoteAddons && <li>✨ <strong>Covers:</strong> {quoteAddons}</li>}
                  </ul>
                  <p className="text-[11px] text-emerald-300 italic pt-2">
                    Please let me know if you would like me to issue this policy today or visit our Udgir Road, Bidar office!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: ANNUAL POLICY RENEWAL REMINDERS */}
        {adminSection === 'renewals' && (
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-6 shadow-xl">
            <div className="border-b border-slate-800/80 pb-4">
              <h3 className="text-xl font-heading font-black text-white flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-amber-400" />
                <span>Annual Policy Renewal Reminders (Bidar HQ)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Upcoming motor and health policy expirations requiring Chandrakant Kadadi renewal alerts.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-4">Client Name</th>
                    <th className="py-3 px-4">Policy / Vehicle No</th>
                    <th className="py-3 px-4">Insurer</th>
                    <th className="py-3 px-4">Expiration Date</th>
                    <th className="py-3 px-4">Est. Premium</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {[
                    { name: 'Veeresh Patil', phone: '98451 22345', policyNo: 'KA-38-M-4512', insurer: 'Tata AIG General', expiry: 'In 12 Days (14 Aug 2026)', est: '₹12,450' },
                    { name: 'Anand Kumar Biradar', phone: '99023 88120', policyNo: 'STAR-HEALTH-99210', insurer: 'Star Health', expiry: 'In 18 Days (20 Aug 2026)', est: '₹18,900' },
                    { name: 'Rajeshwar Swamy', phone: '97312 44510', policyNo: 'BAJAJ-ALL-FIRE-882104', insurer: 'Bajaj Allianz', expiry: 'In 25 Days (27 Aug 2026)', est: '₹24,500' },
                    { name: 'Santosh Deshmukh', phone: '94481 99321', policyNo: 'KA-38-P-9011', insurer: 'ICICI Lombard', expiry: 'In 30 Days (01 Sep 2026)', est: '₹8,200' }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-white">
                        <div>{row.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{row.phone}</div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-amber-400 font-bold">{row.policyNo}</td>
                      <td className="py-3.5 px-4 text-slate-300 font-medium">{row.insurer}</td>
                      <td className="py-3.5 px-4 text-rose-400 font-bold">{row.expiry}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">{row.est}</td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            const msg = `Hello *${encodeURIComponent(row.name)}*,%0A%0AYour policy *${encodeURIComponent(row.policyNo)}* (${encodeURIComponent(row.insurer)}) is due for renewal on *${encodeURIComponent(row.expiry)}*.%0A%0AEst Renewal Premium: *${encodeURIComponent(row.est)}*.%0A%0APlease contact *Chandrakant Kadadi* at Kadadi Motors Bidar to renew today and keep your coverage active!`;
                            const waUrl = `https://wa.me/91${row.phone.replace(/[^0-9]/g, '')}?text=${msg}`;
                            window.open(waUrl, '_blank', 'noopener,noreferrer');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 ml-auto transition-all cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Send WhatsApp Renewal Notice</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Review Modal for Chandrakant Kadadi */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 text-white max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400">{selectedInquiry.id}</span>
                <h3 className="text-2xl font-heading font-black text-white">Review Inquiry: {selectedInquiry.customerName}</h3>
                <p className="text-xs text-slate-400">{selectedInquiry.phone} • {selectedInquiry.categoryTitle}</p>
              </div>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            {actionSuccessMsg && (
              <div className="p-3 bg-emerald-950 border border-emerald-500 rounded-xl text-xs text-emerald-200">
                ✅ {actionSuccessMsg}
              </div>
            )}

            {/* Document Checklist Details */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest">Document Readiness Breakdown</h4>
              <div className="grid sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="font-bold text-emerald-400">Documents Client Has Ready:</span>
                  <ul className="mt-1 space-y-0.5 text-slate-300">
                    {selectedInquiry.readyDocs.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="font-bold text-amber-400">Documents Needing Advisor Help:</span>
                  <ul className="mt-1 space-y-0.5 text-slate-300">
                    {selectedInquiry.pendingDocs.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Form */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest">Chandrakant Kadadi Approval Actions</h4>
              
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Issue Policy Number (If Approved)</label>
                <input
                  type="text"
                  value={policyNo}
                  onChange={(e) => setPolicyNo(e.target.value)}
                  placeholder="e.g., TATA-AIG-CAR-991823"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Advisor Notes for Client</label>
                <textarea
                  rows={2}
                  value={advisorNotes}
                  onChange={(e) => setAdvisorNotes(e.target.value)}
                  placeholder="e.g., Verified RC and previous policy. Cashless approval sanctioned at Tata garage Bidar."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => handleApproveInquiry('issued')}
                  className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs"
                >
                  Approve & Issue Policy (+500 KM Pts)
                </button>

                <button
                  onClick={() => handleApproveInquiry('verified')}
                  className="px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                >
                  Mark Verified (+250 Pts)
                </button>

                <button
                  onClick={() => handleGenerateWhatsAppReply(selectedInquiry)}
                  className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-slate-700"
                >
                  Send WhatsApp Reply
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* CSV Report Export Modal for Chandrakant Kadadi */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40 shrink-0">
                  <FileSpreadsheet className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-black text-white">
                    Export Client Inquiry CSV Report
                  </h3>
                  <p className="text-xs text-slate-400">
                    Formatted report generator for offline record-keeping & insurance partner synchronization.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowExportModal(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Step 1: Select Insurance Partner Preset */}
            <div className="space-y-3">
              <label className="text-xs font-black text-amber-400 uppercase tracking-wider block">
                1. Select Export Format / Insurance Partner Format
              </label>
              
              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setExportPreset('master')}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    exportPreset === 'master'
                      ? 'bg-amber-400/10 border-amber-400 text-white shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-300">Master Offline Ledger</span>
                    {exportPreset === 'master' && <Check className="w-4 h-4 text-amber-400" />}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Complete record with all fields, doc counts, and advisor notes.</p>
                </button>

                <button
                  type="button"
                  onClick={() => setExportPreset('star_health')}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    exportPreset === 'star_health'
                      ? 'bg-emerald-500/10 border-emerald-400 text-white shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-400">Star Health Partner Format</span>
                    {exportPreset === 'star_health' && <Check className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Formatted for Star Health portal bulk lead upload & proposal sync.</p>
                </button>

                <button
                  type="button"
                  onClick={() => setExportPreset('icici_lombard')}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    exportPreset === 'icici_lombard'
                      ? 'bg-blue-500/10 border-blue-400 text-white shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-blue-400">ICICI Lombard Motor Format</span>
                    {exportPreset === 'icici_lombard' && <Check className="w-4 h-4 text-blue-400" />}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Optimized for vehicle insurance policy & endorsement sync.</p>
                </button>

                <button
                  type="button"
                  onClick={() => setExportPreset('new_india')}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    exportPreset === 'new_india'
                      ? 'bg-purple-500/10 border-purple-400 text-white shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-purple-300">New India Assurance Audit</span>
                    {exportPreset === 'new_india' && <Check className="w-4 h-4 text-purple-400" />}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Includes Branch Code BIDAR-585401 for government register audit.</p>
                </button>
              </div>
            </div>

            {/* Step 2: Export Scope */}
            <div className="space-y-3">
              <label className="text-xs font-black text-amber-400 uppercase tracking-wider block">
                2. Select Export Scope
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setExportScope('filtered')}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                    exportScope === 'filtered'
                      ? 'bg-amber-400 text-slate-950 border-amber-400'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  Filtered ({filteredInquiries.length})
                </button>

                <button
                  type="button"
                  onClick={() => setExportScope('all')}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                    exportScope === 'all'
                      ? 'bg-amber-400 text-slate-950 border-amber-400'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  All ({inquiries.length})
                </button>

                <button
                  type="button"
                  onClick={() => setExportScope('pending')}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                    exportScope === 'pending'
                      ? 'bg-amber-400 text-slate-950 border-amber-400'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  Pending Only ({inquiries.filter((i) => i.status === 'pending').length})
                </button>

                <button
                  type="button"
                  onClick={() => setExportScope('completed')}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                    exportScope === 'completed'
                      ? 'bg-amber-400 text-slate-950 border-amber-400'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  Issued Only ({inquiries.filter((i) => i.status === 'issued').length})
                </button>
              </div>
            </div>

            {/* Step 3: Options */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <input
                type="checkbox"
                id="headerSummaryCheck"
                checked={includeHeaderSummary}
                onChange={(e) => setIncludeHeaderSummary(e.target.checked)}
                className="w-4 h-4 rounded text-amber-400 focus:ring-amber-400 bg-slate-900 border-slate-700"
              />
              <label htmlFor="headerSummaryCheck" className="text-xs text-slate-300 font-medium cursor-pointer">
                Include Metadata Header Summary (# Kadadi Motors Advisory Report Stamp & Timestamp)
              </label>
            </div>

            {/* Live Preview Snippet */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                <span>CSV Output Preview ({getExportTargetInquiries().length} Records)</span>
                <span className="text-[10px] text-amber-400 font-mono">Standard UTF-8 CSV</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-[10px] text-slate-300 overflow-x-auto max-h-32 whitespace-pre leading-relaxed">
                {generateCsvData()}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={handleCopyCsvToClipboard}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                {copiedToast ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-amber-400" />
                    <span>Copy Raw CSV</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownloadCsv}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 hover:from-emerald-400 hover:to-emerald-300 text-slate-950 font-black text-xs shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-slate-950" />
                <span>Download Formatted .CSV Report</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Real-time Floating Toast Alert Stack for Chandu Kadadi Desk */}
      <div className="fixed bottom-6 right-6 z-50 pointer-events-none max-w-sm w-full space-y-3 px-4 sm:px-0">
        {toasts
          .filter((t) => t.unread)
          .slice(0, 3)
          .map((t) => {
            const isNewInquiry = t.type === 'new_inquiry';
            const isDocUpload = t.type === 'doc_upload';

            return (
              <div
                key={t.id}
                className="pointer-events-auto p-4 rounded-2xl bg-slate-900/95 border border-amber-500/50 text-white shadow-2xl backdrop-blur-xl animate-fadeIn transition-all transform hover:scale-102 flex flex-col gap-2.5 relative overflow-hidden"
              >
                {/* Accent glow strip */}
                <div
                  className={`absolute top-0 left-0 bottom-0 w-1.5 ${
                    isNewInquiry ? 'bg-amber-400' : isDocUpload ? 'bg-emerald-400' : 'bg-blue-400'
                  }`}
                />

                <div className="flex items-start justify-between gap-3 pl-1">
                  <div className="flex items-center gap-2">
                    {isNewInquiry ? (
                      <div className="p-1.5 rounded-lg bg-amber-400/20 text-amber-400 shrink-0">
                        <Zap className="w-4 h-4" />
                      </div>
                    ) : isDocUpload ? (
                      <div className="p-1.5 rounded-lg bg-emerald-400/20 text-emerald-400 shrink-0">
                        <UploadCloud className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="p-1.5 rounded-lg bg-blue-400/20 text-blue-400 shrink-0">
                        <Bell className="w-4 h-4" />
                      </div>
                    )}
                    <div>
                      <h4 className="text-xs font-black text-white leading-tight">{t.title}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">{t.timestamp}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeToast(t.id)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                    title="Dismiss alert"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-snug pl-1 font-medium">{t.message}</p>

                <div className="flex items-center justify-between pt-1 pl-1 border-t border-slate-800/80">
                  <button
                    onClick={() => handleInspectToast(t)}
                    className="text-[11px] font-extrabold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    <span>Inspect Record</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => markToastRead(t.id)}
                    className="text-[10px] text-slate-400 hover:text-slate-200"
                  >
                    Mark as Read
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      {/* Real-time Alerts Notification History Drawer Modal */}
      {showToastDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border-l border-amber-500/40 h-full max-w-md w-full p-6 space-y-6 shadow-2xl overflow-y-auto flex flex-col justify-between">
            
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 border border-amber-400/30 flex items-center justify-center">
                    <BellRing className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-black text-white">Live Real-time Alerts</h3>
                    <p className="text-[11px] text-slate-400">Chandrakant Kadadi Inquiry & Document Alert Log</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowToastDrawer(false)}
                  className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-bold">{toasts.length} Total Alert(s) Logged</span>
                {toasts.length > 0 && (
                  <button
                    onClick={clearAllToasts}
                    className="text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All</span>
                  </button>
                )}
              </div>

              {/* Toast List */}
              <div className="space-y-3">
                {toasts.length === 0 ? (
                  <div className="p-8 text-center bg-slate-950/60 rounded-2xl border border-slate-800 text-slate-500 text-xs space-y-2">
                    <Bell className="w-8 h-8 mx-auto opacity-40 text-slate-600" />
                    <p>No active alerts in memory right now.</p>
                  </div>
                ) : (
                  toasts.map((t) => (
                    <div
                      key={t.id}
                      className={`p-4 rounded-2xl border transition-all space-y-2 ${
                        t.unread
                          ? 'bg-amber-400/10 border-amber-400/50 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-extrabold text-amber-300">{t.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{t.timestamp}</span>
                      </div>

                      <p className="text-xs text-slate-300">{t.message}</p>

                      <div className="flex items-center justify-between pt-1">
                        <button
                          onClick={() => {
                            setShowToastDrawer(false);
                            handleInspectToast(t);
                          }}
                          className="text-[11px] font-bold text-amber-400 hover:underline"
                        >
                          View Inquiry
                        </button>

                        <button
                          onClick={() => removeToast(t.id)}
                          className="text-[10px] text-slate-500 hover:text-rose-400"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Bottom Footer Note */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 text-center space-y-1">
              <p className="font-bold text-amber-300">⚡ Instant Real-Time Alert Engine</p>
              <p>Alerts trigger automatically whenever a Bidar customer completes an inquiry or uploads a document.</p>
            </div>

          </div>
        </div>
      )}

      {/* Automated Email Service Dispatch Modal */}
      <AutomatedEmailNotificationModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        notifications={emailNotifications}
        onMarkRead={(id) => AppStore.markNotificationRead(id)}
        onTriggerTestEmail={handleSimulateDocUpload}
        onViewInquiry={(inqId) => {
          setSearchQuery(inqId);
          const el = document.getElementById('inquiry-register-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

    </section>
  );
};
