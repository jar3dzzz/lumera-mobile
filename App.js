import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';

import AuthProvider from './src/context/AuthProvider';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const [fontsLoaded] = useFonts({
    'HankenGrotesk-Regular': require('./assets/fonts/Hanken_Grotesk/static/HankenGrotesk-Regular.ttf'),
    'HankenGrotesk-Medium': require('./assets/fonts/Hanken_Grotesk/static/HankenGrotesk-Medium.ttf'),
    'HankenGrotesk-SemiBold': require('./assets/fonts/Hanken_Grotesk/static/HankenGrotesk-SemiBold.ttf'),
    'HankenGrotesk-Bold': require('./assets/fonts/Hanken_Grotesk/static/HankenGrotesk-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <StatusBar style="light" />
      <AppNavigator />
    </AuthProvider>
  );
}
