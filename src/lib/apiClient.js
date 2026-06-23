import axios from 'axios';
import { Platform } from 'react-native';
import { supabase } from './supabase';

function resolveApiBaseUrl() {
  const url = process.env.EXPO_PUBLIC_API_URL || 'https://api.lumera.mx/api/v1';

  // Android emulator cannot reach the host via 127.0.0.1; 10.0.2.2 is the host loopback.
  if (Platform.OS === 'android') {
    return url.replace(/\/\/127\.0\.0\.1\b/g, '//10.0.2.2').replace(/\/\/localhost\b/g, '//10.0.2.2');
  }

  return url;
}

export const apiClient = axios.create({
  baseURL: resolveApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to inject the Supabase JWT token dynamically
apiClient.interceptors.request.use(async (config) => {
  const { data } = await supabase.auth.getSession();
  const token = data?.session?.access_token;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
