import React, { useState } from 'react';
import {
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
import { supabase } from '../../lib/supabase';
import styles from './LoginView.styles';

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


