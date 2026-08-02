# 🚗 Kadadi Motors — Premier Insurance Advisory Platform (Bidar)

[![Production Build](https://img.shields.io/badge/Build-Passing-emerald?style=for-the-badge&logo=github)](https://github.com)
[![TypeScript 5.8](https://img.shields.io/badge/TypeScript-5.8-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.1-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Express Backend](https://img.shields.io/badge/Express-v4.21-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber?style=for-the-badge)](LICENSE)

> **Kadadi Motors** is an enterprise-grade digital insurance advisory platform and client self-service portal engineered for **Chandrakant Kadadi Sir’s** premier independent insurance firm in Bidar, Karnataka. Celebrating over 25 years of trusted financial protection across Motor, Health, Life, Commercial Fleet, Machinery Breakdown, and Agriculture Insurance.

---

## 🌟 Key Product Features

### 🏢 1. Client Vault Self-Service Portal
- **OTP-Simulated Secure Authentication**: Client login and instant account setup with mobile number verification.
- **Genuine Client Verification**: Automatic ID generation (`KM-USR-XXXX`) and verification badge assignment.
- **Personalized Recent Activity Feed**: Real-time event log tracking policy submissions, advisor notes, document verification status, and point accruals.
- **KM Rewards Loyalty Program**: Tier progression system (**Bronze ➔ Silver ➔ Gold ➔ Diamond Platinum**) with automated point tracking (+150 welcome bonus, +100 per policy inquiry, +50 per document upload).

### 🛠️ 2. Interactive Policy Flow Wizard
- **Guided 4-Step Questionnaire**: Intelligent step-by-step assistant for Motor, Health, Commercial Fleet, Life, and Agriculture policies.
- **Interactive Document Readiness Checklist**: Real-time breakdown of ready documents vs. pending items required for instant quote issuance.
- **Dynamic WhatsApp Payload Generator**: Automatically formats applicant details, document status, and policy parameters into a pre-structured message sent directly to Chandrakant Kadadi Sir.
- **Framer Motion Micro-Animations**: Smooth visual feedback and glowing success modal animations.

### 🛡️ 3. Comprehensive Insurance Solutions & Premium Calculators
- **6 Specialized Insurance Categories**: Motor & Vehicle, Health & Mediclaim, Life & Term Insurance, Commercial Fleet & Cargo, Machinery Breakdown, and Crop/Agri Protection.
- **Real-Time Premium Estimator**: Interactive calculator factoring in Vehicle Age, NCB (No Claim Bonus) percentage, Sum Insured, Add-on Covers (Zero Depreciation, Engine Protect, RSA), and regional discounts.
- **Comparative Solution Analysis**: Side-by-side policy feature breakdown against standard market offerings.

### 🏥 4. Cashless Hospital & Network Garage Locator
- **Bidar & Hyderabad Region Directory**: Searchable finder for cashless network hospitals, authorized vehicle service centers, and emergency towing dispatchers across Bidar, Gulbarga, and Hyderabad.
- **Emergency SOS Dispatch**: One-tap emergency dispatch trigger for roadside breakdowns and medical hospitalization.

### 💼 5. Admin Portal & Client Management Desk
- **Role-Gated Management Suite**: Secured admin portal (`PIN: 2026`) for Chandrakant Kadadi Sir and internal advisors.
- **Client Directory**: Full view of registered genuine clients, contact records, vehicle/policy numbers, and loyalty points.
- **Inquiry Management**: Ability to update inquiry status (`pending` ➔ `verified` ➔ `quoted` ➔ `issued`), append custom advisor notes, and trigger client updates.
- **Lead Generation Analytics**: Overview of total inquiries, document uploads, and regional service demands.

---

## 📐 System Architecture

```
                                +-----------------------------------+
                                |        Client Browser / PWA       |
                                +-----------------------------------+
                                                  |
                                                  v
                                +-----------------------------------+
                                |    Vite + React 19 Frontend App   |
                                +-----------------------------------+
                                |  - Policy Flow Wizard             |
                                |  - Customer Vault & Activity Feed |
                                |  - Premium Calculator             |
                                |  - Cashless Network Finder        |
                                |  - Admin Management Portal        |
                                +-----------------------------------+
                                                  |
                                                  v
                                +-----------------------------------+
                                |    Client-Side Local Store (State) |
                                |  - AppStore (Storage Proxy)       |
                                |  - In-Memory / LocalPersistence   |
                                +-----------------------------------+
                                                  |
                                                  v
                                +-----------------------------------+
                                |      Express Node.js Backend      |
                                |       (Port 3000 / Server.ts)     |
                                +-----------------------------------+
                                                  |
                                                  v
                                +-----------------------------------+
                                |  Google Gemini AI Engine Integration|
                                |   - Document Analysis & Summaries |
                                +-----------------------------------+
```

---

## 🛠️ Technology Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | React | `^19.0.1` | Concurrent UI rendering & declarative component views |
| **Build Tool** | Vite | `^6.2.3` | HMR dev server & optimized production asset bundler |
| **Styling Engine** | Tailwind CSS | `v4.1.14` | Modern CSS engine with utility-first styling |
| **Animations** | Motion (Framer) | `^12.23.24` | Spring physics, entrance, and success modal transitions |
| **Icons** | Lucide React | `^0.546.0` | Accessible vector icon design system |
| **Backend Runtime** | Node.js + Express | `v4.21.2` | REST API routes, static asset distribution, Gemini AI proxy |
| **AI Engine** | `@google/genai` | `^2.4.0` | Server-side Gemini 2.5 AI integration for advisory logic |
| **Language** | TypeScript | `^5.8.2` | Strict compile-time type safety across full stack |

---

## 📂 Repository Structure

```
kadadi-motors/
├── assets/                       # Static logo and media assets
├── src/
│   ├── components/               # Modular UI Components
│   │   ├── AboutSection.tsx      # Firm backstory, awards & trust metrics
│   │   ├── AdminPortal.tsx       # Internal management desk & lead portal
│   │   ├── CustomerPortal.tsx    # Client Vault, activity feed & loyalty store
│   │   ├── PolicyFlowWizard.tsx  # 4-Step policy questionnaire & WhatsApp trigger
│   │   ├── PremiumCalculator.tsx # Dynamic quote estimator for motor/health
│   │   ├── QuoteModal.tsx        # Quick advisory inquiry popup modal
│   │   ├── CashlessNetworkFinder.tsx # Network hospital & garage search
│   │   ├── DocumentChecklistHub.tsx  # Required documents directory
│   │   ├── Header.tsx            # Navigation bar & emergency banner
│   │   └── Footer.tsx            # Business contacts, Google Maps & disclaimers
│   ├── data/
│   │   └── insuranceData.ts      # Policy definitions, pricing tiers & hospital lists
│   ├── lib/
│   │   └── store.ts              # Local state management engine & persistence proxy
│   ├── App.tsx                   # Main root application router & view coordinator
│   ├── main.tsx                  # React DOM client mounting point
│   └── index.css                 # Global CSS stylesheet & Tailwind imports
├── .env.example                  # Environment variable contract declaration
├── ARCHITECTURE.md               # Deep-dive architecture design document
├── CHANGELOG.md                  # Release notes & semantic versioning history
├── CONTRIBUTING.md               # Guidelines for open-source contributors
├── DEPLOYMENT.md                 # Docker, Cloud Run & Production deployment guide
├── ROADMAP.md                    # Feature pipeline & strategic vision
├── metadata.json                 # AI Studio app metadata declaration
├── package.json                  # Dependencies & script configurations
├── server.ts                     # Express server & Vite middleware entrypoint
├── tsconfig.json                 # TypeScript compiler configuration
└── vite.config.ts                # Vite build and plugin setup
```

---

## 🚀 Quick Start & Installation Guide

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### 1. Clone Repository
```bash
git clone https://github.com/amoghkadadi/kadadi-motors.git
cd kadadi-motors
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env` and provide required credentials:
```bash
cp .env.example .env
```
Ensure `GEMINI_API_KEY` is configured if testing AI analysis features.

### 4. Run Development Server
```bash
npm run dev
```
Navigate to `http://localhost:3000` in your web browser.

---

## 🛡️ Security, Accessibility & WCAG Compliance

- **No Public API Keys**: All AI and external requests pass through `/api/*` server routes.
- **Input Sanitization**: Client inputs are sanitized before rendering or transmitting.
- **ARIA & Keyboard Navigation**: Complete modal focus traps, accessible buttons (`aria-label`), and `role` attributes across interactive components.
- **Contrast & Legibility**: High contrast text ratios adhering to WCAG 2.1 AA standards.

---

## 📄 License & Acknowledgments

Distributed under the **MIT License**. See `LICENSE` for details.

Developed with pride for **Kadadi Motors Insurance Advisory**, Bidar, Karnataka. Built with guidance from Chandrakant Kadadi Sir.
