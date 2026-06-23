export function sanitizeOtpInput(text: string): string {
  return text.replace(/[^0-9]/g, '');
}

export function validateLoginPassword(password: string): { isValid: boolean; error: string } {
  if (!password) {
    return { isValid: false, error: 'Por favor ingresa tu contraseña.' };
  }
  return { isValid: true, error: '' };
}

export function validateOtpCode(otpCode: string): { isValid: boolean; error: string } {
  if (otpCode.length !== 6) {
    return { isValid: false, error: 'Ingresa el código de 6 dígitos.' };
  }
  return { isValid: true, error: '' };
}

export function getOtpNextPage(isLoginFlow: boolean): number {
  return isLoginFlow ? 6 : 4;
}

export function validateNewPasswordForm(
  newPassword: string,
  confirmPassword: string
): {
  isValid: boolean;
  newPasswordError: string;
  confirmPasswordError: string;
} {
  const isNewPasswordInvalid =
    newPassword.length < 8 || !/[A-Z]/.test(newPassword) || !/[0-9]/.test(newPassword);
  const isConfirmPasswordInvalid = newPassword !== confirmPassword;

  return {
    isValid: !isNewPasswordInvalid && !isConfirmPasswordInvalid,
    newPasswordError: isNewPasswordInvalid
      ? 'Mínimo 8 caracteres, una mayúscula y un número.'
      : '',
    confirmPasswordError: isConfirmPasswordInvalid ? 'Las contraseñas no coinciden.' : '',
  };
}
