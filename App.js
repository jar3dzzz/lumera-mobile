import React from 'react';
import { StatusBar } from 'expo-status-bar';

import AuthProvider from './src/context/AuthProvider';
import { LoaderProvider } from './src/context/LoaderContext';
import { RanchoProvider } from './src/context/RanchoContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <LoaderProvider>
      <AuthProvider>
        <RanchoProvider>
          <StatusBar style="light" />
          <AppNavigator />
        </RanchoProvider>
      </AuthProvider>
    </LoaderProvider>
  );
}
