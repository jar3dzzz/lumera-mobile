import { useEffect, useRef, useState } from 'react';
import { Alert, Animated } from 'react-native';
import { LogInInterface } from '../../../interfaces/AuthInterfaces';

// Page index mapping:
// 0 = P1: Phone entry
// 1 = P2: Phone not registered
// 2 = P3: Enter password
// 3 = P4: Verify code (OTP)
// 4 = P5: Create password
// 5 = P6: Help / Support
// 6 = P7: Choose organization

export type LoginPage = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type OrganizationId = 'amanecer' | 'robles' | 'isidro';
export type SupportContactType = 'whatsapp' | 'call' | 'email';

export const PAGE_LABELS: Record<number, string> = {
  0: 'inicio de sesión',
  1: 'número no encontrado',
  2: 'ingresar contraseña',
  3: 'verificar número',
  4: 'crear contraseña',
  5: 'ayuda',
  6: 'elegir organización',
};

export const PHONE_REGEX = new RegExp(
  '^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$'
);

export const OTP_TIMER_SECONDS = 30;

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

export function sanitizeOtpInput(text: string): string {
  return text.replace(/[^0-9]/g, '');
}



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

export function validatePhone(phone: string): { isValid: boolean; error: string } {
  if (!PHONE_REGEX.test(phone)) {
    return { isValid: false, error: 'Ingresa un número de teléfono válido.' };
  }
  return { isValid: true, error: '' };
}

export function getPhoneFlowRoute(sanitizedPhone: string): {
  nextPage: LoginPage;
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

export function getOtpNextPage(isLoginFlow: boolean): LoginPage {
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

export function getSupportContactAlert(type: SupportContactType): {
  title: string;
  message: string;
} {
  switch (type) {
    case 'whatsapp':
      return {
        title: 'WhatsApp Soporte',
        message: 'Abriendo chat de WhatsApp con soporte técnico (+52 55 1234 5678)...',
      };
    case 'call':
      return {
        title: 'Llamar a soporte',
        message: 'Iniciando llamada telefónica al 800-LUMERA-AGRO (Lun-Vie 9:00 - 18:00)...',
      };
    case 'email':
      return {
        title: 'Enviar correo',
        message: 'Abriendo cliente de correo hacia soporte@lumera.mx...',
      };
  }
}

interface UseLoginFormLogicParams {
  onSubmit: (data: LogInInterface) => Promise<void> | void;
}

export function useLoginFormLogic({ onSubmit }: UseLoginFormLogicParams) {
  const [page, setPage] = useState<LoginPage>(0);
  const [pageHistory, setPageHistory] = useState<LoginPage[]>([]);
  const [isResetFlow, setIsResetFlow] = useState(false);

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [timerSeconds, setTimerSeconds] = useState(OTP_TIMER_SECONDS);
  const [passwordSecureLevel, setPasswordSecureLevel] = useState(0);
  const [selectedOrg, setSelectedOrg] = useState<OrganizationId>('amanecer');
  const [isLoginFlow, setIsLoginFlow] = useState(true);

  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const otpInputRef = useRef<any>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (page !== 3) return;

    setTimerSeconds(OTP_TIMER_SECONDS);
    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [page]);

  useEffect(() => {
    setPasswordSecureLevel(calculatePasswordSecureLevel(newPassword));
  }, [newPassword]);

  const resetOtherPagesState = (nextPage: number) => {
    if (nextPage !== 0) {
      setPhoneError('');
    }

    if (nextPage !== 2 && nextPage !== 6) {
      setPassword('');
      setPasswordError('');
      setShowPassword(false);
    }

    if (nextPage !== 3) {
      setOtpCode('');
      setOtpError('');
    }

    if (nextPage !== 4) {
      setNewPassword('');
      setConfirmPassword('');
      setNewPasswordError('');
      setConfirmPasswordError('');
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    }
  };

  const transitionToPage = (nextPage: number, options?: { isBack?: boolean }) => {
    const isForward = !options?.isBack && nextPage > page;

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: isForward ? -20 : 20,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (nextPage === 0) {
        setPageHistory([]);
      } else if (options?.isBack) {
        setPageHistory((prev) => prev.slice(0, -1));
      } else {
        setPageHistory((prev) => [...prev, page]);
      }
      resetOtherPagesState(nextPage);
      setPage(nextPage as LoginPage);
      slideAnim.setValue(isForward ? 20 : -20);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleP1Continue = () => {
    const phoneValidation = validatePhone(phone);
    if (!phoneValidation.isValid) {
      setPhoneError(phoneValidation.error);
      return;
    }
    setPhoneError('');

    const sanitized = sanitizePhoneDigits(phone);
    const route = getPhoneFlowRoute(sanitized);
    setIsLoginFlow(route.isLoginFlow);
    setIsResetFlow(false);
    transitionToPage(route.nextPage);
  };

  const handleP3Submit = async () => {
    const passwordValidation = validateLoginPassword(password);
    if (!passwordValidation.isValid) {
      setPasswordError(passwordValidation.error);
      return;
    }
    setPasswordError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsLoginFlow(true);
      transitionToPage(3);
    }, 800);
  };

  const handleP4Verify = () => {
    const otpValidation = validateOtpCode(otpCode);
    if (!otpValidation.isValid) {
      setOtpError(otpValidation.error);
      return;
    }
    setOtpError('');
    transitionToPage(getOtpNextPage(isLoginFlow));
  };

  const handleNewPasswordChange = (value: string) => {
    setNewPassword(value);
  };

  const handleP5Submit = () => {
    const validation = validateNewPasswordForm(newPassword, confirmPassword);
    setNewPasswordError(validation.newPasswordError);
    setConfirmPasswordError(validation.confirmPasswordError);

    if (!validation.isValid) {
      return;
    }

    const savedPassword = newPassword;

    Alert.alert(
      'Éxito',
      isResetFlow
        ? 'Tu contraseña ha sido restablecida exitosamente.'
        : 'Tu contraseña ha sido creada exitosamente.',
      [
        {
          text: 'OK',
          onPress: () => {
            setPassword(savedPassword);
            setNewPassword('');
            setConfirmPassword('');
            setOtpCode('');
            transitionToPage(6);
          },
        },
      ]
    );
  };

  const handleOrgSubmit = async () => {
    setLoading(true);
    try {
      await onSubmit({ phone, password });
    } finally {
      setLoading(false);
    }
  };

  const handleSupportContact = (type: SupportContactType) => {
    const { title, message } = getSupportContactAlert(type);
    Alert.alert(title, message);
  };

  const handleResendOtp = () => {
    setTimerSeconds(OTP_TIMER_SECONDS);
    Alert.alert('Reenviado', 'Se ha reenviado un nuevo código a tu número.');
  };

  const startInvitationFlow = () => {
    setIsLoginFlow(false);
    setIsResetFlow(false);
    transitionToPage(3);
  };

  const startForgotPasswordFlow = () => {
    setIsLoginFlow(false);
    setIsResetFlow(true);
    transitionToPage(3);
  };

  const clearPhoneError = () => {
    if (phoneError) setPhoneError('');
  };

  const clearPasswordError = () => {
    if (passwordError) setPasswordError('');
  };

  const clearOtpError = () => {
    if (otpError) setOtpError('');
  };

  const clearNewPasswordError = () => {
    if (newPasswordError) setNewPasswordError('');
  };

  const clearConfirmPasswordError = () => {
    if (confirmPasswordError) setConfirmPasswordError('');
  };

  return {
    page,
    pageHistory,
    phone,
    setPhone,
    password,
    setPassword,
    newPassword,
    confirmPassword,
    setConfirmPassword,
    otpCode,
    setOtpCode,
    showPassword,
    setShowPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    loading,
    timerSeconds,
    passwordSecureLevel,
    selectedOrg,
    setSelectedOrg,
    isLoginFlow,
    setIsLoginFlow,
    isResetFlow,
    setIsResetFlow,
    phoneError,
    passwordError,
    otpError,
    newPasswordError,
    confirmPasswordError,
    otpInputRef,
    fadeAnim,
    slideAnim,
    transitionToPage,
    handleP1Continue,
    handleP3Submit,
    handleP4Verify,
    handleNewPasswordChange,
    handleP5Submit,
    handleOrgSubmit,
    handleSupportContact,
    handleResendOtp,
    startInvitationFlow,
    startForgotPasswordFlow,
    clearPhoneError,
    clearPasswordError,
    clearOtpError,
    clearNewPasswordError,
    clearConfirmPasswordError,
  };
}
