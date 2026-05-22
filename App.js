import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import LoginView from './src/views/LoginView';
import RegisterView from './src/views/RegisterView';
import HomeView from './src/views/HomeView';

export default function App() {
  // Navigation State: 'login' | 'register' | 'home'
  const [currentView, setCurrentView] = useState('login');

  const handleLoginSuccess = () => {
    setCurrentView('home');
  };

  const handleRegisterSuccess = () => {
    setCurrentView('home');
  };

  const handleLogout = () => {
    setCurrentView('login');
  };

  const navigateToRegister = () => {
    setCurrentView('register');
  };

  const navigateToLogin = () => {
    setCurrentView('login');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {currentView === 'login' && (
        <LoginView
          onLogin={handleLoginSuccess}
          onNavigateToRegister={navigateToRegister}
        />
      )}

      {currentView === 'register' && (
        <RegisterView
          onRegister={handleRegisterSuccess}
          onNavigateToLogin={navigateToLogin}
        />
      )}

      {currentView === 'home' && (
        <HomeView
          onLogout={handleLogout}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111214',
  },
});
