import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthProvider';
import AuthView from '../views/AuthView/AuthView';
import HomeView from '../views/HomeView/HomeView';
import AnimalsView from '../views/AnimalsView/AnimalsView';

const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();

const DarkNavigationTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#d9ab55',
    background: '#111214',
    card: '#16171a',
    text: '#ffffff',
    border: '#202227',
    notification: '#ff3b30',
  },
};

function AuthNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        contentStyle: { backgroundColor: '#111214' },
      }}
    >
      <AuthStack.Screen name="Auth" component={AuthView} />
    </AuthStack.Navigator>
  );
}

function AppNavigatorStack() {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#111214' },
      }}
    >
      <AppStack.Screen name="Home" component={HomeView} />
      <AppStack.Screen name="Animals" component={AnimalsView} />
    </AppStack.Navigator>
  );
}

function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#d9ab55" />
    </View>
  );
}

export default function AppNavigator() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer theme={DarkNavigationTheme}>
      {session ? <AppNavigatorStack /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111214',
  },
});
