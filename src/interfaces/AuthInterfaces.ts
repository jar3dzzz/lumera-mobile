export namespace Auth {
    export type ProfileStatus = 'active' | 'inactive' | 'banned' | 'pending';

    export interface SignInInterface {
        email: string;
        display_name: string;
        first_name: string;
        paternal_last_name: string;
        maternal_last_name: string;
        phone: string;
        status: ProfileStatus;
        created_at: string;
        updated_at: string;
    }

    export interface LogInInterface {
        phone: string | null;
        password?: string | null;
    }

    export interface PasswordLogInResponseInterface {
        phone: string;
        password: string;
    }

    export interface CheckPhoneRequest {
        phone: string;
    }

    export interface CheckPhoneResponse {
        state: string;
        nextAction: string;
        phone: string;
        maskedPhone: string;
        devVerificationCode: string;
        expiresAt: string;
    }
    export interface ApiErrorResponse {
        error: {
            code: string;
            message: string;
            details: {
                field?: string | null;
                reason: string;
            }[];
            correlation_id: string;
        };
    }

    /** @deprecated Use ApiErrorResponse */
    export type CheckPhoneResponseError = ApiErrorResponse;

    export interface UserSummary {
        id: string;
        phone: string;
        phoneVerified: boolean;
        passwordConfigured: boolean;
        status: 'pending' | 'phone_verified' | 'active' | 'blocked';
    }

    export interface LoginRequest {
        phone: string;
        password: string;
    }

    export interface LoginResponse {
        accessToken: string;
        tokenType: 'bearer';
        expiresAt: string;
        user: UserSummary;
    }

    export interface VerifyCodeRequest {
        phone: string;
        code: string;
    }

    export interface VerifyCodeResponse {
        phoneVerified: boolean;
        passwordRequired: boolean;
        nextAction: 'set_password';
    }

    export interface SetPasswordRequest {
        phone: string;
        code: string;
        password: string;
    }

    export interface SetPasswordResponse {
        user: UserSummary;
        nextAction: 'login';
    }

    export interface RegisterRequest {
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        password?: string;
    }

    export interface RegisterResponse {
        message: string;
        otp_ttl_seconds: number;
    }

    export interface SendOtpRequest {
        phone: string;
        reason: 'register' | 'forgot_password' | 'invitation' | string;
    }

    export interface SendOtpResponse {
        success: boolean;
        otp_ttl_seconds: number;
    }

    export interface VerifyOtpRequest {
        phone: string;
        code: string;
        reason: 'register' | 'forgot_password' | 'invitation' | string;
    }

    export interface VerifyOtpResponse {
        verified: boolean;
        temp_token?: string;
    }

    export interface ResetPasswordRequest {
        phone: string;
        temp_token: string;
        new_password: string;
    }

    export interface ResetPasswordResponse {
        success: boolean;
        message: string;
    }
}