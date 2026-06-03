import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';

export default function LoginView({ navigation }) {
  const { width, height } = useWindowDimensions();
  const isWideScreen = width > 768;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const TiltedLogo = ({ size = 80, fontSize = 48, tilt = '-8deg' }) => (
    <View style={[styles.tiltedCard, { width: size, height: size, transform: [{ rotate: tilt }] }]}>
      <Text style={[styles.tiltedCardText, { fontSize }]}>A</Text>
    </View>
  );

  const handleLoginPress = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa tu correo y contraseña.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      Alert.alert('Error al iniciar sesión', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={[styles.mainWrapper, isWideScreen ? styles.rowDirection : styles.columnDirection]}>
        
        <ScrollView
          contentContainerStyle={[
            styles.formScrollContent,
            isWideScreen ? { justifyContent: 'center' } : { justifyContent: 'flex-start', paddingTop: 40 }
          ]}
          style={[styles.leftSide, isWideScreen ? { width: '45%', flex: 45 } : { width: '100%', flex: 1 }]}
        >
          {!isWideScreen && (
            <View style={styles.mobileHeader}>
              <View style={styles.smallLogoBox}>
                <Text style={styles.smallLogoText}>A</Text>
              </View>
              <Text style={styles.mobileHeaderBrand}>ATLAS</Text>
            </View>
          )}

          {isWideScreen && (
            <View style={styles.desktopHeader}>
              <View style={styles.smallLogoBox}>
                <Text style={styles.smallLogoText}>A</Text>
              </View>
              <Text style={styles.desktopHeaderBrand}>ATLAS</Text>
            </View>
          )}

          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>Bienvenido</Text>
            <Text style={styles.welcomeSubtitle}>Inicia sesión en tu cuenta para continuar</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>CORREO ELECTRÓNICO</Text>
              <TextInput
                style={styles.textInput}
                placeholder="tu@ejemplo.com"
                placeholderTextColor="#5a5e66"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.passwordLabelRow}>
                <Text style={styles.inputLabel}>CONTRASEÑA</Text>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={styles.forgotPasswordLink}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.passwordInputWrapper}>
                <TextInput
                  style={[styles.textInput, { paddingRight: 45 }]}
                  placeholder="••••••••"
                  placeholderTextColor="#5a5e66"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  style={styles.eyeIconWrapper}
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={20}
                    color="#5a5e66"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.submitButton, loading && { opacity: 0.7 }]}
              onPress={handleLoginPress}
              activeOpacity={0.8}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#111214" />
              ) : (
                <Text style={styles.submitButtonText}>Iniciar Sesión</Text>
              )}
            </TouchableOpacity>

            <View style={styles.formFooter}>
              <Text style={styles.footerText}>¿No tienes una cuenta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')} activeOpacity={0.7}>
                <Text style={styles.footerLink}>Regístrate</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {isWideScreen ? (
          <View style={styles.rightSide}>
            <View style={styles.brandShowcaseContent}>
              <TiltedLogo size={110} fontSize={64} tilt="-8deg" />
              <Text style={styles.showcaseTitle}>ATLAS MANAGEMENT</Text>
              <Text style={styles.showcaseSubtitle}>
                La plataforma definitiva para la gestión eficiente y moderna de propiedades agrícolas.
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.mobileVisualFooter}>
            <TiltedLogo size={60} fontSize={32} tilt="-6deg" />
            <Text style={styles.mobileSlogan}>ATLAS MANAGEMENT</Text>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111214',
  },
  mainWrapper: {
    flex: 1,
  },
  rowDirection: {
    flexDirection: 'row',
  },
  columnDirection: {
    flexDirection: 'column',
  },
  leftSide: {
    backgroundColor: '#111214',
    paddingHorizontal: 24,
  },
  formScrollContent: {
    flexGrow: 1,
    maxWidth: 520,
    alignSelf: 'center',
    width: '100%',
    paddingVertical: 32,
  },
  desktopHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 60,
    marginTop: 20,
  },
  mobileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  smallLogoBox: {
    backgroundColor: '#d9ab55',
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    transform: [{ rotate: '-4deg' }],
  },
  smallLogoText: {
    color: '#111214',
    fontWeight: 'bold',
    fontSize: 16,
  },
  desktopHeaderBrand: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  mobileHeaderBrand: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  welcomeSection: {
    marginBottom: 36,
  },
  welcomeTitle: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    color: '#8e929a',
    fontSize: 15,
    lineHeight: 22,
  },
  formContainer: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    color: '#8e929a',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 8,
  },
  passwordLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  forgotPasswordLink: {
    color: '#8e929a',
    fontSize: 11,
    textDecorationLine: 'none',
  },
  textInput: {
    backgroundColor: '#18191c',
    borderWidth: 1,
    borderColor: '#26282d',
    borderRadius: 8,
    color: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    height: 48,
  },
  passwordInputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  eyeIconWrapper: {
    position: 'absolute',
    right: 16,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#d9ab55',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#d9ab55',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  submitButtonText: {
    color: '#111214',
    fontSize: 16,
    fontWeight: 'bold',
  },
  formFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
  },
  footerText: {
    color: '#8e929a',
    fontSize: 14,
  },
  footerLink: {
    color: '#d9ab55',
    fontSize: 14,
    fontWeight: 'bold',
  },
  rightSide: {
    flex: 55,
    backgroundColor: '#16171a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 48,
    borderLeftWidth: 1,
    borderLeftColor: '#202227',
  },
  brandShowcaseContent: {
    alignItems: 'center',
    maxWidth: 450,
  },
  tiltedCard: {
    backgroundColor: '#d9ab55',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
    shadowColor: '#d9ab55',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },
  tiltedCardText: {
    color: '#111214',
    fontWeight: 'bold',
  },
  showcaseTitle: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 16,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  showcaseSubtitle: {
    color: '#a0a5ad',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  mobileVisualFooter: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    backgroundColor: '#141517',
    borderTopWidth: 1,
    borderTopColor: '#202227',
  },
  mobileSlogan: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
    letterSpacing: 1,
  },
});
