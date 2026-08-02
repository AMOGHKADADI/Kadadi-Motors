# 🏛️ Architecture & Technical Specifications — Kadadi Motors

## 1. Overview & Architectural Goals

The **Kadadi Motors** web platform is designed as an enterprise-grade full-stack Web application delivering insurance advisory services, real-time premium calculations, client self-service vault capabilities, and lead management.

### Key Engineering Objectives:
1. **Sub-Second Initial Page Load**: Optimized bundle structure and lightweight client runtime.
2. **Offline-First Resilience**: Local state store proxy (`AppStore` in `/src/lib/store.ts`) ensuring immediate UI responsiveness regardless of connectivity.
3. **Server-Side API Security**: Server-proxied API routes (`/api/*`) in `server.ts` enforcing zero client-side exposure of secret keys.
4. **Accessible & Responsive UX**: Mobile-first fluid layout built with Tailwind CSS v4 and Framer Motion spring physics.

---

## 2. System Layer Diagram

```
+-----------------------------------------------------------------------------------+
|                                  PRESENTATION LAYER                               |
|                                                                                   |
|  [ Header / Nav ]       [ Hero Banner ]       [ Policy Flow Wizard ]             |
|  [ Customer Vault ]     [ Admin Desk ]        [ Cashless Hospital Finder ]       |
|  [ Premium Calc ]       [ Document Hub ]      [ Quick Quote Modal ]              |
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                                 STATE MANAGEMENT LAYER                            |
|                                                                                   |
|  AppStore Proxy (Singleton / Observer Pattern)                                    |
|  - Customer Profiles & Genuine User Verification                                  |
|  - Inquiries & Document Upload Attachments                                        |
|  - Recent Activity Event Timeline Generator                                       |
|  - KM Points & Loyalty Tier Calculation Engine                                    |
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                                SERVER & BACKEND LAYER                             |
|                                                                                   |
|  Node.js + Express Server (server.ts / Port 3000)                                 |
|  - Vite Middleware (Development Mode)                                             |
|  - Static File Production Server (`dist/`)                                         |
|  - Google Gemini AI API Proxy (`/api/gemini/analyze`)                             |
|  - Health Checks & Diagnostic Endpoints (`/api/health`)                           |
+-----------------------------------------------------------------------------------+
```

---

## 3. State Management Architecture

The application implements a centralized reactive store pattern in `/src/lib/store.ts`:

```typescript
// AppStore Singleton Interface
export interface AppStoreType {
  getProfiles(): CustomerProfile[];
  getCurrentUser(): CustomerProfile | null;
  setCurrentUser(user: CustomerProfile | null): void;
  getInquiries(): CustomerInquiry[];
  addInquiry(inquiry: Omit<CustomerInquiry, 'id' | 'submittedAt' | 'status'>): CustomerInquiry;
  updateInquiryStatus(id: string, status: CustomerInquiry['status'], notes?: string): void;
  uploadDocumentToInquiry(inquiryId: string, fileName: string): void;
  deleteRegisteredUser(userId: string): void;
  // Subscribers
  subscribe(callback: () => void): () => void;
}
```

### Key Highlights of `AppStore`:
- **Observer Pattern**: Standard listener subscription framework triggers UI re-renders on state mutation.
- **Local Persistence Integration**: Hydrates initial state from `localStorage` if available, falling back seamlessly to seeded default records.
- **Automatic Reward Point Accruals**: Automatically awards KM Points upon account registration (+150 Pts), inquiry creation (+100 Pts), and document attachment (+50 Pts).

---

## 4. Component Hierarchy & Data Flow

```
App.tsx (Root View Coordinator)
│
├── Header.tsx (Global Nav, Emergency SOS, Call CTA)
├── Hero.tsx (Main Value Prop, CTAs to Wizard & Portal)
├── HomeQuickDirectory.tsx (Instant Feature Shortcuts)
├── InsuranceSolutions.tsx (6 Category Cards & Modals)
├── PolicyFlowWizard.tsx (4-Step Guided Questionnaire)
│     └── Motion Animations & WhatsApp Payload Formatter
├── CustomerPortal.tsx (Client Vault)
│     ├── KmProgressRing.tsx (Loyalty Tier Graphic)
│     └── Activity Feed (Generated Event Timeline)
├── AdminPortal.tsx (Internal Management Desk)
│     ├── Lead Directory & Status Updater
│     └── Registered Genuine Users Directory
├── CashlessNetworkFinder.tsx (Hospitals & Garage Locator)
├── PremiumCalculator.tsx (Interactive Quote Estimator)
├── DocumentChecklistHub.tsx (Required Document Guides)
├── AboutSection.tsx (Firm Backstory & Credentials)
├── TestimonialSection.tsx (Verified Client Reviews)
├── FaqSection.tsx (Frequently Asked Questions)
└── Footer.tsx (Business Hours, Location Map, Disclaimers)
```

---

## 5. Security & Server Integration Model

1. **Environment Variable Guarding**:
   - `GEMINI_API_KEY` is loaded exclusively inside `server.ts` via `process.env`.
   - Never exposed to browser scripts or DOM context.

2. **Server Bundle Strategy**:
   - Production builds bundle `server.ts` using `esbuild` into CommonJS (`dist/server.cjs`).
   - Standard execution: `NODE_ENV=production node dist/server.cjs`.

3. **Input Validation & Escaping**:
   - Form inputs (phone numbers, full names, policy numbers) are validated before formatting into WhatsApp query strings or persisting to store.

---

## 6. Performance Optimization Principles

- **Code Splitting**: Dynamic component imports for modal overlays and admin views.
- **Icon Optimization**: Tree-shaken icon imports from `lucide-react`.
- **CSS Engine**: Tailwind v4 engine using optimized CSS variable utilities with minimal stylesheet overhead.
