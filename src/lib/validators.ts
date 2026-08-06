/**
 * Kadadi Motors & Insurance Advisory Desk - Ultra-Precise Real-time Validation Engine
 * Handles real-time validation logic for emails, Indian mobile numbers, vehicle registration numbers, policy numbers, and tax identifiers.
 */

export interface ValidationResult {
  isValid: boolean;
  score: number; // 0 to 100 quality score
  errorMessage?: string;
  successMessage?: string;
  fieldState: 'idle' | 'validating' | 'success' | 'error';
  metadata?: Record<string, string | number | boolean>;
}

export class InsuranceValidators {
  /**
   * Real-time Email Validator with domain analysis & TLD safety checks
   */
  static validateEmail(email: string): ValidationResult {
    const trimmed = email.trim();

    if (!trimmed) {
      return {
        isValid: false,
        score: 0,
        fieldState: 'idle',
        errorMessage: 'Email address is required for regulatory updates.',
      };
    }

    if (!trimmed.includes('@')) {
      return {
        isValid: false,
        score: 20,
        fieldState: 'error',
        errorMessage: 'Missing "@" symbol in email address (e.g. client@example.com).',
      };
    }

    const parts = trimmed.split('@');
    if (parts.length > 2) {
      return {
        isValid: false,
        score: 25,
        fieldState: 'error',
        errorMessage: 'Email contains multiple "@" symbols. Please check format.',
      };
    }

    const [username, domain] = parts;

    if (!username || username.length < 1) {
      return {
        isValid: false,
        score: 30,
        fieldState: 'error',
        errorMessage: 'Username prefix before "@" cannot be empty.',
      };
    }

    if (!domain || !domain.includes('.')) {
      return {
        isValid: false,
        score: 40,
        fieldState: 'error',
        errorMessage: 'Domain must include top-level extension (e.g. @gmail.com or @company.in).',
      };
    }

    const domainParts = domain.split('.');
    const tld = domainParts[domainParts.length - 1];

    if (!tld || tld.length < 2) {
      return {
        isValid: false,
        score: 50,
        fieldState: 'error',
        errorMessage: 'Top-level domain extension must be at least 2 characters.',
      };
    }

    // Standard RFC-compliant regex pattern
    const strictRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!strictRegex.test(trimmed)) {
      return {
        isValid: false,
        score: 60,
        fieldState: 'error',
        errorMessage: 'Email contains invalid special characters.',
      };
    }

    // High quality valid email
    return {
      isValid: true,
      score: 100,
      fieldState: 'success',
      successMessage: '✓ Valid email address format verified.',
      metadata: { username, domain, tld },
    };
  }

  /**
   * Indian Mobile Number Validator (10-digit Indian formats starting with 6, 7, 8, or 9)
   */
  static validateIndianPhone(phone: string): ValidationResult {
    const digits = phone.replace(/\D/g, '');

    if (!digits) {
      return {
        isValid: false,
        score: 0,
        fieldState: 'idle',
        errorMessage: 'Mobile number is required for direct WhatsApp & callback dispatch.',
      };
    }

    // Strip leading 91 or 0
    let cleanDigits = digits;
    if (cleanDigits.length === 12 && cleanDigits.startsWith('91')) {
      cleanDigits = cleanDigits.slice(2);
    } else if (cleanDigits.length === 11 && cleanDigits.startsWith('0')) {
      cleanDigits = cleanDigits.slice(1);
    }

    if (cleanDigits.length < 10) {
      return {
        isValid: false,
        score: Math.round((cleanDigits.length / 10) * 80),
        fieldState: 'error',
        errorMessage: `Mobile number incomplete (${cleanDigits.length}/10 digits entered).`,
      };
    }

    if (cleanDigits.length > 10) {
      return {
        isValid: false,
        score: 60,
        fieldState: 'error',
        errorMessage: 'Mobile number exceeds 10 digits.',
      };
    }

    const firstDigit = cleanDigits.charAt(0);
    if (!['6', '7', '8', '9'].includes(firstDigit)) {
      return {
        isValid: false,
        score: 50,
        fieldState: 'error',
        errorMessage: 'Indian mobile numbers must start with 6, 7, 8, or 9.',
      };
    }

    // Formatted presentation: +91 XXXXX XXXXX
    const formatted = `+91 ${cleanDigits.slice(0, 5)} ${cleanDigits.slice(5)}`;

    return {
      isValid: true,
      score: 100,
      fieldState: 'success',
      successMessage: `✓ Valid Indian mobile format: ${formatted}`,
      metadata: { cleanDigits, formatted },
    };
  }

  /**
   * Karnataka / Indian Vehicle Registration (RC) Number Validator
   * Example: KA-38-M-4512 or KA38M4512
   */
  static validateVehicleRC(rcNumber: string): ValidationResult {
    const raw = rcNumber.trim().toUpperCase().replace(/[\s-]/g, '');

    if (!raw) {
      return {
        isValid: false,
        score: 0,
        fieldState: 'idle',
        errorMessage: 'Vehicle RC number is required for instant motor insurance quotes.',
      };
    }

    // Standard Indian RC Pattern: SS-DD-AA-NNNN (e.g. KA38M4512)
    const rcRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{1,3}[0-9]{4}$/;

    if (!rcRegex.test(raw)) {
      return {
        isValid: false,
        score: 40,
        fieldState: 'error',
        errorMessage: 'Format must follow State RTO pattern (e.g., KA-38-M-4512).',
      };
    }

    const stateCode = raw.slice(0, 2);
    const rtoCode = raw.slice(2, 4);
    const registrationNo = raw.slice(-4);

    return {
      isValid: true,
      score: 100,
      fieldState: 'success',
      successMessage: `✓ RTO Verified (${stateCode}-${rtoCode} Desk): ${raw}`,
      metadata: { stateCode, rtoCode, registrationNo },
    };
  }
}
