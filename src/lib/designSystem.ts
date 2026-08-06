/**
 * Kadadi Motors & Insurance Advisory Desk - Design System & Engineering Architecture
 * Ultra-high specification tokens, WCAG AA/AAA color matrices, glassmorphism, and spring dynamics.
 */

export const DESIGN_TOKENS = {
  brand: {
    primary: '#2563eb', // Blue-600
    primaryLight: '#3b82f6', // Blue-500
    primaryDark: '#1d4ed8', // Blue-700
    accentGold: '#f59e0b', // Amber-500
    accentAmber: '#d97706', // Amber-600
    emeraldSuccess: '#10b981', // Emerald-500
    roseAlert: '#f43f5e', // Rose-500
  },

  typography: {
    fontFamilySans: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    fontFamilyMono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    scaleRatio: 1.25, // Major Third Scale Ratio
    headings: {
      mobile: {
        h1: 'text-3xl font-extrabold tracking-tight',
        h2: 'text-2xl font-bold tracking-tight',
        h3: 'text-xl font-bold',
      },
      desktop: {
        h1: 'md:text-5xl lg:text-6xl font-black tracking-tight',
        h2: 'md:text-4xl font-extrabold tracking-tight',
        h3: 'md:text-2xl font-bold',
      },
    },
  },

  glassmorphism: {
    darkCard: 'bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50',
    lightPanel: 'bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-lg shadow-slate-200/50',
    floatingModal: 'bg-slate-950/95 backdrop-blur-2xl border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]',
  },

  springPhysics: {
    stiff: { type: 'spring', stiffness: 400, damping: 30 },
    gentle: { type: 'spring', stiffness: 180, damping: 20 },
    bouncy: { type: 'spring', stiffness: 500, damping: 15 },
    subtle: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },

  focusVisible: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
} as const;

export type FocusRingState = 'idle' | 'focus' | 'success' | 'error' | 'warning';

/**
 * Calculates a dynamic glowing ring utility string for input fields
 */
export function getGlowingRingClass(state: FocusRingState): string {
  switch (state) {
    case 'error':
      return 'border-rose-500/80 ring-2 ring-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.35)] bg-rose-950/20 text-rose-100 placeholder-rose-300/40';
    case 'success':
      return 'border-emerald-500/80 ring-2 ring-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.35)] bg-emerald-950/20 text-emerald-100';
    case 'warning':
      return 'border-amber-500/80 ring-2 ring-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.35)] bg-amber-950/20 text-amber-100';
    case 'focus':
      return 'border-blue-500 ring-2 ring-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.3)] bg-slate-900/90 text-white';
    default:
      return 'border-white/15 hover:border-white/30 focus:border-blue-500 bg-slate-950/80 text-white placeholder-slate-500';
  }
}

/**
 * Sanitizes and formats currency in Indian National Rupee (INR) format
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculates No Claim Bonus (NCB) tier percentage
 */
export function calculateNCBPercent(yearsWithoutClaims: number): number {
  if (yearsWithoutClaims <= 0) return 0;
  if (yearsWithoutClaims === 1) return 20;
  if (yearsWithoutClaims === 2) return 25;
  if (yearsWithoutClaims === 3) return 35;
  if (yearsWithoutClaims === 4) return 45;
  return 50; // Max NCB allowed under IRDAI guidelines
}
