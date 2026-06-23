import { apiClient } from '../../lib/apiClient';
import { Auth } from '../../interfaces/AuthInterfaces';
import { AxiosResponse } from 'axios';  
import { withLoader } from '../../context/LoaderContext';

// Helper to simulate network delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Helper to create a mocked AxiosResponse
const createMockResponse = <T>(data: T): AxiosResponse<T> => ({
  data,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {} as any,
});

// Helper to create a mocked standard_error
const createMockError = (code: string, message: string, details: any[] = []) => {
  return Promise.reject({
    message: 'Request failed with status code 400',
    response: {
      data: {
        error: {
          code,
          message,
          details,
          correlation_id: 'corr_mock_' + Math.random().toString(36).substring(7)
        }
      }
    }
  });
};

export const authService = {
  checkPhoneExistence: (phone: string): Promise<AxiosResponse<Auth.CheckPhoneResponse>> =>
    withLoader(async () => {
      // unavailable db temporarily
      await delay(800);
      const isRegistered = phone === '+529931745618';
      
      return createMockResponse({
        state: isRegistered ? 'registered' : 'not_found', 
        nextAction: isRegistered ? 'enter_password' : 'verify_code', 
        phone: phone,
        maskedPhone: '***' + phone.slice(-4),
        devVerificationCode: '123456',
        expiresAt: new Date(Date.now() + 10 * 60000).toISOString(),
      });
    }),

  verifyCode: (phone: string, code: string): Promise<AxiosResponse<Auth.VerifyCodeResponse>> =>
    withLoader(async () => {
      // unavailable db temporarily
      await delay(800);
      if (code !== '123456') {
        return createMockError('VALIDATION_ERROR', 'Validation failed.', [
          { field: 'code', reason: 'Must be valid OTP code.' }
        ]);
      }

      return createMockResponse({
        phoneVerified: true,
        passwordRequired: true,
        nextAction: 'set_password'
      });
    }),

  setPassword: (phone: string, code: string, password: string): Promise<AxiosResponse<Auth.SetPasswordResponse>> =>
    withLoader(async () => {
      await delay(800);
      return createMockResponse({
        user: {
          id: 'mock-user-id',
          phone,
          phoneVerified: true,
          passwordConfigured: true,
          status: 'active'
        },
        nextAction: 'login'
      });
    }),

  passwordLogin: (phone: string, password: string): Promise<AxiosResponse<Auth.LoginResponse>> =>
    withLoader(async () => {
      // unavailable db temporarily
      await delay(800);
      if (password !== 'Contrasena2006.') {
        return createMockError('INVALID_CREDENTIALS', 'Contraseña incorrecta (MOCK).', []);
      }

      return createMockResponse({
        accessToken: 'mock-access-token',
        tokenType: 'bearer',
        expiresAt: new Date(Date.now() + 12 * 3600000).toISOString(),
        user: {
          id: 'mock-user-id',
          phone,
          phoneVerified: true,
          passwordConfigured: true,
          status: 'active'
        }
      });
    }),

  signIn: (email: string, display_name: string, first_name: string, paternal_last_name_string: string, maternal_last_name: string, phone: string, status: Auth.ProfileStatus): Promise<AxiosResponse<Auth.SignInInterface>> =>
    withLoader(async () => {
      await delay(800);
      return createMockResponse({
        email,
        display_name,
        first_name,
        paternal_last_name: paternal_last_name_string,
        maternal_last_name,
        phone,
        status,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    }),

  register: (data: Auth.RegisterRequest): Promise<AxiosResponse<Auth.RegisterResponse>> =>
    withLoader(async () => {
      await delay(800);
      return createMockResponse({
        message: 'Registrado correctamente (MOCK)',
        otp_ttl_seconds: 60
      });
    }),

  sendOtp: (data: Auth.SendOtpRequest): Promise<AxiosResponse<Auth.SendOtpResponse>> =>
    withLoader(async () => {
      await delay(800);
      return createMockResponse({
        success: true,
        otp_ttl_seconds: 60
      });
    }),

  verifyOtp: (data: Auth.VerifyOtpRequest): Promise<AxiosResponse<Auth.VerifyOtpResponse>> =>
    withLoader(async () => {
      await delay(800);
      return createMockResponse({
        verified: data.code === '123456',
        temp_token: 'mock-temp-token'
      });
    }),

  resetPassword: (data: Auth.ResetPasswordRequest): Promise<AxiosResponse<Auth.ResetPasswordResponse>> =>
    withLoader(async () => {
      await delay(800);
      return createMockResponse({
        success: true,
        message: 'Password reset successfully (MOCK)'
      });
    })
};
