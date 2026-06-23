export const PHONE_REGEX = new RegExp(
  '^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$'
);

export function maskPhone(num: string): string {
  if (!num) return '';
  const digits = num.replace(/\s+/g, '');
  if (digits.length >= 8) {
    const end = digits.slice(-4);
    const prefix = digits.startsWith('+') ? digits.slice(0, 6) : digits.slice(0, 2);
    return `${prefix} •••• ${end}`;
  }
  return num;
}

export function sanitizePhoneDigits(phone: string): string {
  return phone.replace(/[^0-9]/g, '');
}

export function validatePhone(phone: string): { isValid: boolean; error: string } {
  if (!PHONE_REGEX.test(phone)) {
    return { isValid: false, error: 'Ingresa un número de teléfono válido.' };
  }
  return { isValid: true, error: '' };
}

export function getPhoneFlowRoute(sanitizedPhone: string): {
  nextPage: number;
  isLoginFlow: boolean;
} {
  if (sanitizedPhone.endsWith('0000')) {
    return { nextPage: 1, isLoginFlow: true };
  }
  if (sanitizedPhone.endsWith('1111')) {
    return { nextPage: 3, isLoginFlow: false };
  }
  return { nextPage: 2, isLoginFlow: true };
}
