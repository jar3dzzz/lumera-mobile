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

export default function RegisterView({ navigation }) {
  const { width } = useWindowDimensions();
  const isWideScreen = width > 768;

  const [nombre, setNombre] = useState('');
  const [aPaterno, setAPaterno] = useState('');
  const [aMaterno, setAMaterno] = useState('');
  const [genero, setGenero] = useState('');
  const [showGeneroDropdown, setShowGeneroDropdown] = useState(false);
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const TiltedLogo = ({ size = 80, fontSize = 48, tilt = '-8deg' }) => (
    <View style={[styles.tiltedCard, { width: size, height: size, transform: [{ rotate: tilt }] }]}>
      <Text style={[styles.tiltedCardText, { fontSize }]}>A</Text>
    </View>
  );

  const handleRegisterPress = async () => {
    if (!email || !password || !nombre) {
      Alert.alert('Error', 'Por favor completa los campos requeridos.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nombre,
          apellido_paterno: aPaterno,
          apellido_materno: aMaterno,
          genero,
          telefono,
          fecha_nacimiento: fechaNacimiento,
        },
      },
    });
    setLoading(false);
    if (error) {
      Alert.alert('Error al registrarse', error.message);
    } else {
      Alert.alert(
        'Éxito',
        'Cuenta creada. Revisa tu correo para confirmar tu cuenta.',
      );
    }
  };

  const selectGenero = (option) => {
    setGenero(option);
    setShowGeneroDropdown(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={[styles.mainWrapper, isWideScreen ? styles.rowDirection : styles.columnDirection]}>
        
        <ScrollView
          contentContainerStyle={styles.formScrollContent}
          style={[styles.leftSide, isWideScreen ? { width: '45%', flex: 45 } : { width: '100%', flex: 1 }]}
          showsVerticalScrollIndicator={false}
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
            <Text style={styles.welcomeTitle}>Regístrate</Text>
            <Text style={styles.welcomeSubtitle}>Crea una cuenta para comenzar a gestionar tus propiedades</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>NOMBRE(S)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="John"
                placeholderTextColor="#5a5e66"
                value={nombre}
                onChangeText={setNombre}
              />
            </View>

            <View style={styles.rowInputs}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 12 }]}>
                <Text style={styles.inputLabel}>A. PATERNO</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Doe"
                  placeholderTextColor="#5a5e66"
                  value={aPaterno}
                  onChangeText={setAPaterno}
                />
              </View>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.inputLabel}>A. MATERNO</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Smith"
                  placeholderTextColor="#5a5e66"
                  value={aMaterno}
                  onChangeText={setAMaterno}
                />
              </View>
            </View>

            <View style={[styles.inputGroup, { zIndex: 10 }]}>
              <Text style={styles.inputLabel}>GÉNERO</Text>
              <TouchableOpacity
                style={styles.dropdownSelector}
                onPress={() => setShowGeneroDropdown(!showGeneroDropdown)}
                activeOpacity={0.8}
              >
                <Text style={[styles.dropdownValueText, !genero && { color: '#5a5e66' }]}>
                  {genero || 'Selecciona género'}
                </Text>
                <Ionicons
                  name={showGeneroDropdown ? 'chevron-up-outline' : 'chevron-down-outline'}
                  size={18}
                  color="#5a5e66"
                />
              </TouchableOpacity>
              
              {showGeneroDropdown && (
                <View style={styles.dropdownMenu}>
                  {['Masculino', 'Femenino', 'Otro', 'Prefiero no decirlo'].map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={styles.dropdownOption}
                      onPress={() => selectGenero(option)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.dropdownOptionText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>CORREO ELECTRÓNICO</Text>
              <TextInput
                style={styles.textInput}
                placeholder="john@example.com"
                placeholderTextColor="#5a5e66"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>TELÉFONO</Text>
              <View style={styles.phoneInputWrapper}>
                <TouchableOpacity style={styles.countryCodeSelector} activeOpacity={0.8}>
                  <Text style={styles.flagText}>🇲🇽</Text>
                  <Text style={styles.countryCodeText}>+52</Text>
                  <Ionicons name="chevron-down-outline" size={12} color="#8e929a" style={{ marginLeft: 2 }} />
                </TouchableOpacity>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="123 456 7890"
                  placeholderTextColor="#5a5e66"
                  keyboardType="phone-pad"
                  value={telefono}
                  onChangeText={setTelefono}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>FECHA DE NACIMIENTO</Text>
              <TextInput
                style={styles.textInput}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#5a5e66"
                value={fechaNacimiento}
                onChangeText={setFechaNacimiento}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>CONTRASEÑA</Text>
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
              onPress={handleRegisterPress}
              activeOpacity={0.8}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#111214" />
              ) : (
                <Text style={styles.submitButtonText}>Crear Cuenta</Text>
              )}
            </TouchableOpacity>

            <View style={styles.formFooter}>
              <Text style={styles.footerText}>¿Ya tienes una cuenta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')} activeOpacity={0.7}>
                <Text style={styles.footerLink}>Inicia Sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {isWideScreen ? (
          <View style={styles.rightSide}>
            <View style={styles.brandShowcaseContent}>
              <TiltedLogo size={110} fontSize={64} tilt="-8deg" />
              <Text style={styles.showcaseTitle}>ÚNETE A ATLAS</Text>
              <Text style={styles.showcaseSubtitle}>
                La solución premium para la modernización y el control total de operaciones agropecuarias.
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.mobileVisualFooter}>
            <TiltedLogo size={60} fontSize={32} tilt="-6deg" />
            <Text style={styles.mobileSlogan}>ÚNETE A ATLAS</Text>
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
    marginBottom: 40,
    marginTop: 10,
  },
  mobileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
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
    marginBottom: 28,
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
    marginBottom: 20,
    position: 'relative',
  },
  inputLabel: {
    color: '#8e929a',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 8,
  },
  rowInputs: {
    flexDirection: 'row',
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
    width: '100%',
  },
  dropdownSelector: {
    backgroundColor: '#18191c',
    borderWidth: 1,
    borderColor: '#26282d',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownValueText: {
    color: '#ffffff',
    fontSize: 15,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 76,
    left: 0,
    right: 0,
    backgroundColor: '#1c1d22',
    borderColor: '#2c2e33',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    zIndex: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  dropdownOption: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#26282d',
  },
  dropdownOptionText: {
    color: '#ffffff',
    fontSize: 15,
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    height: 48,
    backgroundColor: '#18191c',
    borderWidth: 1,
    borderColor: '#26282d',
    borderRadius: 8,
    overflow: 'hidden',
  },
  countryCodeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: '#26282d',
    backgroundColor: '#1f2024',
  },
  flagText: {
    fontSize: 16,
    marginRight: 4,
  },
  countryCodeText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  phoneInput: {
    flex: 1,
    color: '#ffffff',
    paddingHorizontal: 16,
    fontSize: 15,
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
    marginTop: 16,
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
    marginBottom: 20,
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
