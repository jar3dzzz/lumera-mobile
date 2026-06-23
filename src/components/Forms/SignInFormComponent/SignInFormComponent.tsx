import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { loginFormStyles } from '../LoginFormComponent/loginFormStyles';
import { Auth } from '../../../interfaces/AuthInterfaces';
import { theme } from '../../../styles/theme';

interface RegisterFormComponentProps {
  onSubmit: (data: Auth.SignInInterface) => Promise<void> | void;
  onToggleForm: () => void;
  navigation?: any;
}

export default function RegisterFormComponent({ onSubmit, onToggleForm }: RegisterFormComponentProps) {
  const [firstName, setFirstName] = useState('');
  const [paternalLastName, setPaternalLastName] = useState('');
  const [maternalLastName, setMaternalLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Errors state
  const [firstNameError, setFirstNameError] = useState('');
  const [paternalLastNameError, setPaternalLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    let hasError = false;

    // Basic Validation
    if (!firstName.trim()) {
      setFirstNameError('El nombre es requerido');
      hasError = true;
    } else {
      setFirstNameError('');
    }

    if (!paternalLastName.trim()) {
      setPaternalLastNameError('El apellido paterno es requerido');
      hasError = true;
    } else {
      setPaternalLastNameError('');
    }

    if (!email.trim()) {
      setEmailError('El correo electrónico es requerido');
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Formato de correo electrónico inválido');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (!phone.trim()) {
      setPhoneError('El teléfono es requerido');
      hasError = true;
    } else if (phone.trim().length < 10) {
      setPhoneError('El teléfono debe tener al menos 10 dígitos');
      hasError = true;
    } else {
      setPhoneError('');
    }

    if (hasError) return;

    setLoading(true);
    try {
      const data: Auth.SignInInterface = {
        first_name: firstName.trim(),
        paternal_last_name: paternalLastName.trim(),
        maternal_last_name: maternalLastName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        display_name: `${firstName.trim()} ${paternalLastName.trim()}`.trim(),
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      await onSubmit(data);
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Error durante el registro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={loginFormStyles.container}>
      {/* First Name Input */}
      <View style={loginFormStyles.inputGroup}>
        <Text style={loginFormStyles.inputLabel}>Nombre(s)</Text>
        <View style={[loginFormStyles.inputWrapper, firstNameError ? loginFormStyles.inputWrapperError : null]}>
          <Ionicons
            name="person-outline"
            size={20}
            color={firstNameError ? theme.colors.error : 'rgba(255, 255, 255, 0.6)'}
            style={loginFormStyles.inputIcon}
          />
          <TextInput
            style={loginFormStyles.inputText}
            placeholder="Ej. Juan"
            placeholderTextColor="rgba(255, 255, 255, 0.4)"
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
              setFirstNameError('');
            }}
          />
          {firstNameError ? (
            <Ionicons name="warning-outline" size={24} color="#e6a08f" />
          ) : null}
        </View>
        {firstNameError ? (
          <Text style={loginFormStyles.errorText}>{firstNameError}</Text>
        ) : null}
      </View>

      {/* Paternal Last Name Input */}
      <View style={loginFormStyles.inputGroup}>
        <Text style={loginFormStyles.inputLabel}>Apellido Paterno</Text>
        <View style={[loginFormStyles.inputWrapper, paternalLastNameError ? loginFormStyles.inputWrapperError : null]}>
          <Ionicons
            name="person-outline"
            size={20}
            color={paternalLastNameError ? theme.colors.error : 'rgba(255, 255, 255, 0.6)'}
            style={loginFormStyles.inputIcon}
          />
          <TextInput
            style={loginFormStyles.inputText}
            placeholder="Ej. Pérez"
            placeholderTextColor="rgba(255, 255, 255, 0.4)"
            value={paternalLastName}
            onChangeText={(text) => {
              setPaternalLastName(text);
              setPaternalLastNameError('');
            }}
          />
          {paternalLastNameError ? (
            <Ionicons name="warning-outline" size={24} color="#e6a08f" />
          ) : null}
        </View>
        {paternalLastNameError ? (
          <Text style={loginFormStyles.errorText}>{paternalLastNameError}</Text>
        ) : null}
      </View>

      {/* Maternal Last Name Input */}
      <View style={loginFormStyles.inputGroup}>
        <Text style={loginFormStyles.inputLabel}>Apellido Materno (Opcional)</Text>
        <View style={loginFormStyles.inputWrapper}>
          <Ionicons
            name="person-outline"
            size={20}
            color="rgba(255, 255, 255, 0.6)"
            style={loginFormStyles.inputIcon}
          />
          <TextInput
            style={loginFormStyles.inputText}
            placeholder="Ej. Rodríguez"
            placeholderTextColor="rgba(255, 255, 255, 0.4)"
            value={maternalLastName}
            onChangeText={setMaternalLastName}
          />
        </View>
      </View>

      {/* Email Input */}
      <View style={loginFormStyles.inputGroup}>
        <Text style={loginFormStyles.inputLabel}>Correo Electrónico</Text>
        <View style={[loginFormStyles.inputWrapper, emailError ? loginFormStyles.inputWrapperError : null]}>
          <Ionicons
            name="mail-outline"
            size={20}
            color={emailError ? theme.colors.error : 'rgba(255, 255, 255, 0.6)'}
            style={loginFormStyles.inputIcon}
          />
          <TextInput
            style={loginFormStyles.inputText}
            placeholder="Ej. juan.perez@correo.com"
            placeholderTextColor="rgba(255, 255, 255, 0.4)"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError('');
            }}
          />
          {emailError ? (
            <Ionicons name="warning-outline" size={24} color="#e6a08f" />
          ) : null}
        </View>
        {emailError ? (
          <Text style={loginFormStyles.errorText}>{emailError}</Text>
        ) : null}
      </View>

      {/* Phone Input */}
      <View style={loginFormStyles.inputGroup}>
        <Text style={loginFormStyles.inputLabel}>Número de Teléfono</Text>
        <View style={[loginFormStyles.inputWrapper, phoneError ? loginFormStyles.inputWrapperError : null]}>
          <Ionicons
            name="call-outline"
            size={20}
            color={phoneError ? theme.colors.error : 'rgba(255, 255, 255, 0.6)'}
            style={loginFormStyles.inputIcon}
          />
          <TextInput
            style={loginFormStyles.inputText}
            placeholder="Ej. +52 55 1234 5678"
            placeholderTextColor="rgba(255, 255, 255, 0.4)"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
              setPhoneError('');
            }}
          />
          {phoneError ? (
            <Ionicons name="warning-outline" size={24} color="#e6a08f" />
          ) : null}
        </View>
        {phoneError ? (
          <Text style={loginFormStyles.errorText}>{phoneError}</Text>
        ) : null}
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[loginFormStyles.submitButton, loading && { opacity: 0.7 }]}
        onPress={handleRegister}
        activeOpacity={0.8}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <>
            <Text style={loginFormStyles.submitButtonText}>Registrarse</Text>
            <Ionicons
              name="arrow-forward"
              size={20}
              color="#ffffff"
              style={loginFormStyles.buttonArrow}
            />
          </>
        )}
      </TouchableOpacity>

      {/* Toggle View Link */}
      <TouchableOpacity onPress={onToggleForm} activeOpacity={0.7}>
        <Text style={loginFormStyles.footerLinkText}>
          ¿Ya tienes cuenta? <Text style={loginFormStyles.footerLinkBold}>Inicia sesión aquí</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
