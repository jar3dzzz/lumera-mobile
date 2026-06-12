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
