// Local storage management & reactive event hub for Kadadi Motors
export interface CustomerProfile {
  id: string;
  fullName: string;
  phone: string;
  vehicleOrPolicyNo?: string;
  city: string;
  kmPoints: number;
  tier: 'Bronze' | 'Silver Executive' | 'Gold Partner' | 'Platinum Patron';
  createdAt: string;
  uploadedDocsCount: number;
  referralsCount: number;
}

export interface CustomerInquiry {
  id: string;
  customerName: string;
  phone: string;
  city: string;
  category: string;
  categoryTitle: string;
  purposeTitle: string;
  readyDocs: string[];
  pendingDocs: string[];
  status: 'pending' | 'docs_uploaded' | 'verified' | 'issued' | 'rejected';
  submittedAt: string;
  updatedAt: string;
  advisorNotes?: string;
  policyNo?: string;
  uploadedFiles?: { name: string; url: string; uploadedAt: string }[];
  kmPointsAwarded: number;
}

export interface KMLeaderboardUser {
  id: string;
  name: string;
  phoneMasked: string;
  location: string;
  points: number;
  tier: 'Platinum Patron' | 'Gold Partner' | 'Silver Executive' | 'Bronze Advocate';
  policiesIssued: number;
  referrals: number;
  badge: string;
}

export interface AdminEmailNotification {
  id: string;
  inquiryId: string;
  customerName: string;
  customerPhone: string;
  city: string;
  categoryTitle: string;
  fileName: string;
  sentToEmail: string;
  sentAt: string;
  status: 'Delivered & Alerted';
  emailSubject: string;
  emailBody: string;
  read: boolean;
}

// Key Constants
const STORAGE_KEYS = {
  CURRENT_USER: 'km_current_user_v2',
  INQUIRIES: 'km_inquiries_v2',
  ADMIN_AUTH: 'km_admin_auth_v2',
  KM_POINTS: 'km_points_v2',
  ADMIN_NOTIFICATIONS: 'km_admin_notifications_v2'
};

const INITIAL_NOTIFICATIONS: AdminEmailNotification[] = [
  {
    id: 'MAIL-9801-01',
    inquiryId: 'INQ-9801',
    customerName: 'Veeresh Patil',
    customerPhone: '98451 22345',
    city: 'Bidar (Udgir Road)',
    categoryTitle: 'Commercial & Goods Vehicle',
    fileName: 'RC_Book_KA38_M4512.pdf',
    sentToEmail: 'chandu.kadadi@kadadimotors.com',
    sentAt: 'Today, 10:30 AM',
    status: 'Delivered & Alerted',
    emailSubject: '🚨 [DOC UPLOAD ALERT] Veeresh Patil uploaded "RC_Book_KA38_M4512.pdf" for Inquiry INQ-9801',
    emailBody: 'Dear Chandrakant Kadadi Sir,\n\nA new document has been uploaded to the Kadadi Motors Advisory Portal.\n\nCustomer Details:\n• Name: Veeresh Patil\n• Mobile: 98451 22345\n• City: Bidar (Udgir Road)\n• Inquiry ID: INQ-9801\n• Insurance Sector: Commercial & Goods Vehicle\n• Document Uploaded: RC_Book_KA38_M4512.pdf\n• Timestamp: Today, 10:30 AM\n\nPlease log into the Admin Portal to inspect the document and proceed with verification or policy issuance.\n\nAutomated Desk Dispatch Service\nKadadi Motors Insurance Advisory',
    read: false
  },
  {
    id: 'MAIL-9784-01',
    inquiryId: 'INQ-9784',
    customerName: 'Anand Kumar Biradar',
    customerPhone: '99023 88120',
    city: 'Bhalki, Bidar',
    categoryTitle: 'Health & Family Insurance',
    fileName: 'Family_Aadhaar_Set.pdf',
    sentToEmail: 'chandu.kadadi@kadadimotors.com',
    sentAt: 'Yesterday, 04:15 PM',
    status: 'Delivered & Alerted',
    emailSubject: '🚨 [DOC UPLOAD ALERT] Anand Kumar Biradar uploaded "Family_Aadhaar_Set.pdf" for Inquiry INQ-9784',
    emailBody: 'Dear Chandrakant Kadadi Sir,\n\nA new document has been uploaded to the Kadadi Motors Advisory Portal.\n\nCustomer Details:\n• Name: Anand Kumar Biradar\n• Mobile: 99023 88120\n• City: Bhalki, Bidar\n• Inquiry ID: INQ-9784\n• Insurance Sector: Health & Family Insurance\n• Document Uploaded: Family_Aadhaar_Set.pdf\n• Timestamp: Yesterday, 04:15 PM\n\nPlease log into the Admin Portal to inspect the document and proceed with verification or policy issuance.\n\nAutomated Desk Dispatch Service\nKadadi Motors Insurance Advisory',
    read: true
  }
];

// Initial Seed Data for Bidar Clients & Inquiries
const INITIAL_INQUIRIES: CustomerInquiry[] = [
  {
    id: 'INQ-9801',
    customerName: 'Veeresh Patil',
    phone: '98451 22345',
    city: 'Bidar (Udgir Road)',
    category: 'motor',
    categoryTitle: 'Commercial & Goods Vehicle',
    purposeTitle: 'Goods Vehicle Comprehensive Insurance',
    readyDocs: ['RC Book (Smart Card)', 'Previous Policy Copy', 'Aadhaar Card'],
    pendingDocs: ['Fitness Certificate', 'Pollution Control (PUC)'],
    status: 'docs_uploaded',
    submittedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    advisorNotes: 'Inspected vehicle RC details. Fitness certificate renewal pending at RTO Bidar.',
    kmPointsAwarded: 100,
    uploadedFiles: [
      { name: 'RC_Book_KA38_M4512.pdf', url: '#', uploadedAt: 'Today, 10:30 AM' },
      { name: 'Aadhaar_Veeresh_Patil.pdf', url: '#', uploadedAt: 'Today, 10:32 AM' }
    ]
  },
  {
    id: 'INQ-9784',
    customerName: 'Anand Kumar Biradar',
    phone: '99023 88120',
    city: 'Bhalki, Bidar',
    category: 'health',
    categoryTitle: 'Health & Family Insurance',
    purposeTitle: 'Family Floater Health Coverage',
    readyDocs: ['Pan Card', 'Aadhaar Card', 'Passport Photo', 'Medical Records'],
    pendingDocs: [],
    status: 'verified',
    submittedAt: new Date(Date.now() - 3600000 * 28).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    advisorNotes: 'Star Health & HDFC ERGO comparison completed. Client opted for 10 Lakhs Floater.',
    kmPointsAwarded: 250,
    uploadedFiles: [
      { name: 'Family_Aadhaar_Set.pdf', url: '#', uploadedAt: 'Yesterday, 04:15 PM' }
    ]
  },
  {
    id: 'INQ-9760',
    customerName: 'Santosh Deshmukh',
    phone: '94481 99321',
    city: 'Bidar (Near MAX)',
    category: 'motor',
    categoryTitle: 'Private Car & SUV',
    purposeTitle: 'Car Cashless Claim Settlement',
    readyDocs: ['RC Book', 'Driving License', 'Claim Form', 'Surveyor Report', 'Repair Estimate'],
    pendingDocs: ['Final Repair Invoice'],
    status: 'pending',
    submittedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    advisorNotes: 'Surveyor assigned at Tata AIG authorized garage Bidar.',
    kmPointsAwarded: 100
  },
  {
    id: 'INQ-9650',
    customerName: 'Rajeshwar Swamy',
    phone: '97312 44510',
    city: 'Humnabad, Bidar',
    category: 'business',
    categoryTitle: 'Shopkeeper & Liability',
    purposeTitle: 'Shop Fire & Burglary Protection',
    readyDocs: ['GST Certificate', 'Trade License', 'Stock Audit Sheet'],
    pendingDocs: [],
    status: 'issued',
    submittedAt: new Date(Date.now() - 3600000 * 120).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    policyNo: 'BAJAJ-ALL-FIRE-882104',
    advisorNotes: 'Policy issued successfully for 25 Lakhs Stock coverage.',
    kmPointsAwarded: 500
  }
];

const INITIAL_LEADERBOARD: KMLeaderboardUser[] = [
  {
    id: 'KM-01',
    name: 'Rajeshwar Swamy',
    phoneMasked: '+91 97312 *****',
    location: 'Humnabad, Bidar',
    points: 850,
    tier: 'Gold Partner',
    policiesIssued: 3,
    referrals: 4,
    badge: '🏆 Top Advocate'
  },
  {
    id: 'KM-02',
    name: 'Anand Kumar Biradar',
    phoneMasked: '+91 99023 *****',
    location: 'Bhalki, Bidar',
    points: 600,
    tier: 'Gold Partner',
    policiesIssued: 2,
    referrals: 3,
    badge: '⭐ Health Champion'
  },
  {
    id: 'KM-03',
    name: 'Veeresh Patil',
    phoneMasked: '+91 98451 *****',
    location: 'Udgir Road, Bidar',
    points: 450,
    tier: 'Silver Executive',
    policiesIssued: 1,
    referrals: 2,
    badge: '🚛 Transport Fleet Owner'
  },
  {
    id: 'KM-04',
    name: 'Dr. Ramesh Kulkarni',
    phoneMasked: '+91 94488 *****',
    location: 'Bidar City',
    points: 350,
    tier: 'Silver Executive',
    policiesIssued: 1,
    referrals: 1,
    badge: '🛡️ Loyal Client'
  },
  {
    id: 'KM-05',
    name: 'Santosh Deshmukh',
    phoneMasked: '+91 94481 *****',
    location: 'Bidar (Beside MAX)',
    points: 200,
    tier: 'Bronze Advocate',
    policiesIssued: 1,
    referrals: 0,
    badge: '🚗 Motor Enthusiast'
  }
];

export class AppStore {
  // Get all inquiries
  static getInquiries(): CustomerInquiry[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(INITIAL_INQUIRIES));
        return INITIAL_INQUIRIES;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_INQUIRIES;
    }
  }

  // Save new inquiry
  static addInquiry(inquiryData: Omit<CustomerInquiry, 'id' | 'submittedAt' | 'updatedAt' | 'status' | 'kmPointsAwarded'>): CustomerInquiry {
    const inquiries = this.getInquiries();
    const newInquiry: CustomerInquiry = {
      ...inquiryData,
      id: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      kmPointsAwarded: 100 // Award 100 points for submitting verified checklist
    };

    const updated = [newInquiry, ...inquiries];
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));

    // Update current user points if logged in
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      this.awardKmPoints(currentUser.phone, 100, `Submitted Document Checklist (${newInquiry.id})`);
    }

    // Trigger reactive listener
    window.dispatchEvent(new CustomEvent('km_store_updated'));
    return newInquiry;
  }

  // Update inquiry status by Admin (Chandu Kadadi)
  static updateInquiryStatus(
    id: string,
    status: CustomerInquiry['status'],
    advisorNotes?: string,
    policyNo?: string,
    bonusPoints: number = 0
  ) {
    const inquiries = this.getInquiries();
    const index = inquiries.findIndex((i) => i.id === id);
    if (index !== -1) {
      inquiries[index].status = status;
      inquiries[index].updatedAt = new Date().toISOString();
      if (advisorNotes) inquiries[index].advisorNotes = advisorNotes;
      if (policyNo) inquiries[index].policyNo = policyNo;
      if (bonusPoints > 0) {
        inquiries[index].kmPointsAwarded += bonusPoints;
      }

      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
      window.dispatchEvent(new CustomEvent('km_store_updated'));
    }
  }

  // Automated Email Notification Service Methods
  static getAdminEmailNotifications(): AdminEmailNotification[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ADMIN_NOTIFICATIONS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.ADMIN_NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
        return INITIAL_NOTIFICATIONS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  }

  static markNotificationRead(id: string) {
    const list = this.getAdminEmailNotifications();
    const item = list.find((n) => n.id === id);
    if (item) {
      item.read = true;
      localStorage.setItem(STORAGE_KEYS.ADMIN_NOTIFICATIONS, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('km_store_updated'));
    }
  }

  static sendDocumentUploadEmailNotification(data: {
    inquiryId: string;
    customerName: string;
    customerPhone: string;
    city: string;
    categoryTitle: string;
    fileName: string;
  }): AdminEmailNotification {
    const notifications = this.getAdminEmailNotifications();
    const timestamp = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const notification: AdminEmailNotification = {
      id: `MAIL-${data.inquiryId.replace('INQ-', '')}-${Date.now().toString().slice(-4)}`,
      inquiryId: data.inquiryId,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      city: data.city || 'Bidar',
      categoryTitle: data.categoryTitle,
      fileName: data.fileName,
      sentToEmail: 'chandu.kadadi@kadadimotors.com',
      sentAt: timestamp,
      status: 'Delivered & Alerted',
      emailSubject: `🚨 [DOC UPLOAD ALERT] ${data.customerName} uploaded "${data.fileName}" for Inquiry ${data.inquiryId}`,
      emailBody: `Dear Chandrakant Kadadi Sir,\n\nA new document has been uploaded to the Kadadi Motors Advisory Portal.\n\nCustomer Details:\n• Name: ${data.customerName}\n• Mobile: ${data.customerPhone}\n• City: ${data.city}\n• Inquiry ID: ${data.inquiryId}\n• Insurance Sector: ${data.categoryTitle}\n• Document Uploaded: ${data.fileName}\n• Timestamp: ${timestamp}\n\nPlease log into the Admin Portal to inspect the document and proceed with verification or policy issuance.\n\nAutomated Desk Dispatch Service\nKadadi Motors Insurance Advisory`,
      read: false
    };

    const updated = [notification, ...notifications];
    localStorage.setItem(STORAGE_KEYS.ADMIN_NOTIFICATIONS, JSON.stringify(updated));

    window.dispatchEvent(
      new CustomEvent('km_admin_email_sent', { detail: notification })
    );
    window.dispatchEvent(new CustomEvent('km_store_updated'));

    return notification;
  }

  // Upload document to inquiry by Customer
  static uploadDocumentToInquiry(id: string, fileName: string): CustomerInquiry | null {
    const inquiries = this.getInquiries();
    const index = inquiries.findIndex((i) => i.id === id);
    if (index !== -1) {
      const inq = inquiries[index];
      const newFile = {
        name: fileName,
        url: '#',
        uploadedAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };
      const files = inq.uploadedFiles || [];
      inq.uploadedFiles = [newFile, ...files];
      inq.status = 'docs_uploaded';
      inq.updatedAt = new Date().toISOString();
      inq.kmPointsAwarded += 50;

      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));

      // Trigger Automated Summary Email Notification to Chandu Kadadi
      this.sendDocumentUploadEmailNotification({
        inquiryId: inq.id,
        customerName: inq.customerName,
        customerPhone: inq.phone,
        city: inq.city,
        categoryTitle: inq.categoryTitle,
        fileName
      });

      window.dispatchEvent(
        new CustomEvent('km_store_updated', {
          detail: { type: 'doc_upload', inquiryId: id, customerName: inq.customerName, fileName }
        })
      );

      const currentUser = this.getCurrentUser();
      if (currentUser) {
        this.awardKmPoints(currentUser.phone, 50, `Uploaded document ${fileName}`);
      }

      return inq;
    }
    return null;
  }

  // User Profile Management
  static getCurrentUser(): CustomerProfile | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  static loginOrCreateUser(fullName: string, phone: string, city: string = 'Bidar'): CustomerProfile {
    let currentUser = this.getCurrentUser();
    if (!currentUser || currentUser.phone !== phone) {
      currentUser = {
        id: `CUST-${Math.floor(10000 + Math.random() * 90000)}`,
        fullName,
        phone,
        city,
        kmPoints: 150, // Welcome bonus!
        tier: 'Bronze',
        createdAt: new Date().toISOString(),
        uploadedDocsCount: 0,
        referralsCount: 0
      };
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
      window.dispatchEvent(new CustomEvent('km_store_updated'));
    }
    return currentUser;
  }

  static logoutUser() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    window.dispatchEvent(new CustomEvent('km_store_updated'));
  }

  // Award KM Points based on criteria
  static awardKmPoints(phone: string, points: number, reason: string) {
    const currentUser = this.getCurrentUser();
    if (currentUser && (currentUser.phone === phone || currentUser.phone.includes(phone))) {
      currentUser.kmPoints += points;
      // Upgrade Tier
      if (currentUser.kmPoints >= 800) currentUser.tier = 'Platinum Patron';
      else if (currentUser.kmPoints >= 500) currentUser.tier = 'Gold Partner';
      else if (currentUser.kmPoints >= 250) currentUser.tier = 'Silver Executive';

      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
      window.dispatchEvent(new CustomEvent('km_store_updated'));
    }
  }

  // Admin Session Management
  static isAdminLoggedIn(): boolean {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  }

  static adminLogin(username: string, password: string): boolean {
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim().toLowerCase().replace(/\s+/g, '');

    const validUsers = ['chandukadadi', 'chandu', 'admin'];
    const validPasswords = ['kadadimotors123'];

    if (validUsers.includes(cleanUser) && validPasswords.includes(cleanPass)) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      window.dispatchEvent(new CustomEvent('km_store_updated'));
      return true;
    }
    return false;
  }

  static adminLogout() {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    window.dispatchEvent(new CustomEvent('km_store_updated'));
  }

  // Leaderboard data
  static getLeaderboard(): KMLeaderboardUser[] {
    return INITIAL_LEADERBOARD;
  }
}
