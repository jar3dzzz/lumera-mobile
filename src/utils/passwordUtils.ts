export function calculatePasswordSecureLevel(password: string): number {
  if (!password) return 0;

  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  return score;
}

export function getStrengthLabelAndColor(passwordSecureLevel: number): {
  label: string;
  color: string;
} {
  switch (passwordSecureLevel) {
    case 0:
      return { label: '', color: 'rgba(255,255,255,0.4)' };
    case 1:
      return { label: 'Contraseña muy débil', color: '#a13d2d' };
    case 2:
      return { label: 'Contraseña regular', color: '#F3C83A' };
    case 3:
      return { label: 'Contraseña segura', color: '#7CB842' };
    case 4:
    default:
      return { label: 'Contraseña muy segura', color: '#398426' };
  }
}
