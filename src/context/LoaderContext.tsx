import React, { createContext, useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View, Modal, Text } from 'react-native';

// Singleton event emitter for non-React files like services
class LoaderEmitter {
  private listeners: ((isLoading: boolean) => void)[] = [];
  private loadingCount = 0;

  show() {
    this.loadingCount++;
    this.notify();
  }

  hide() {
    this.loadingCount = Math.max(0, this.loadingCount - 1);
    this.notify();
  }

  subscribe(listener: (isLoading: boolean) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    const isLoading = this.loadingCount > 0;
    this.listeners.forEach((l) => l(isLoading));
  }
}

export const globalLoader = new LoaderEmitter();

export async function withLoader<T>(fn: () => Promise<T>): Promise<T> {
  globalLoader.show();
  try {
    return await fn();
  } finally {
    globalLoader.hide();
  }
}

interface LoaderContextType {
  appLoading: boolean;
  setAppLoading: (loading: boolean) => void;
}

const LoaderContext = React.createContext<LoaderContextType>({
  appLoading: false,
  setAppLoading: () => {},
});

export const useLoader = () => React.useContext(LoaderContext);

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appLoading, setAppLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = globalLoader.subscribe(setAppLoading);
    return unsubscribe;
  }, []);

  const handleSetAppLoading = (loading: boolean) => {
    if (loading) {
      globalLoader.show();
    } else {
      globalLoader.hide();
    }
  };

  return (
    <LoaderContext.Provider value={{ appLoading, setAppLoading: handleSetAppLoading }}>
      {children}
      {appLoading && (
        <Modal transparent animationType="fade">
          <View style={styles.overlay}>
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#ffffff" />
              <Text style={styles.loaderText}>Cargando...</Text>
            </View>
          </View>
        </Modal>
      )}
    </LoaderContext.Provider>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  loaderContainer: {
    padding: 24,
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderText: {
    marginTop: 12,
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  }
});
