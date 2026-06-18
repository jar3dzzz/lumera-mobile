import React from 'react';
import { StatusBar } from 'expo-status-bar';

import AuthProvider from './src/context/AuthProvider';
import { LoaderProvider } from './src/context/LoaderContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <LoaderProvider>
      <AuthProvider>
        <StatusBar style="light" />
        <AppNavigator />
      </AuthProvider>
    </LoaderProvider>
  );
}
