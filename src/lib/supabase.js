import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

// Secure storage adapter for Supabase session persistence
const ExpoSecureStoreAdapter = {
  getItem: (key) => SecureStore.getItemAsync(key),
  setItem: (key, value) => SecureStore.setItemAsync(key, value),
  removeItem: (key) => SecureStore.deleteItemAsync(key),
};

// sera reemplazado despues, solo para el desarrollo
const SUPABASE_URL = 'https://qspwblajqzuijhhxthwz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzcHdibGFqcXp1aWpoaHh0aHd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxMjMxOTksImV4cCI6MjA5MTY5OTE5OX0.DUFptbu0tUBqXRw-6RCGEqts-BhKn6p-l94xRLDkUHc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
