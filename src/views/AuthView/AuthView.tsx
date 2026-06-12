import React, { useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ImageBackground,
  Image,
  Alert,
  useWindowDimensions,
} from 'react-native';
import styles from './LoginView.styles';
import LoginFormComponent from '../../components/Forms/LoginFormComponent/LoginFormComponent';
import SignInFormComponent from '../../components/Forms/SignInFormComponent/SignInFormComponent';
import { LogInInterface, SignInInterface } from '../../interfaces/AuthInterfaces';
import imageBackground from '../../../assets/backgrounds/login-background.png';
import lumeraLogo from '../../../assets/logo/logo-completo-blanco.png'
export default function AuthView({ navigation }: any) {
  const { height } = useWindowDimensions();
  const [isLogin, setIsLogin] = useState(true);

  const handleLoginSubmit = async (data: LogInInterface) => {
    console.log('Placeholder Login:', data);
    Alert.alert(
      'Inicio de Sesión (Demo)',
      `Teléfono: ${data.phone}\nContraseña: ${data.password ? '••••••••' : 'No provista'}`
    );
  };

  const handleRegisterSubmit = async (data: SignInInterface) => {
    console.log('Placeholder Register:', data);
    Alert.alert(
      'Registro (Demo)',
      `Nombre: ${data.first_name}\nCorreo: ${data.email}\nTeléfono: ${data.phone}`
    );
  };

  return (
    <ImageBackground
      source={imageBackground}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              <View style={{ flex: 1, minHeight: height, width: '100%', maxWidth: 520, justifyContent: 'flex-start' }}>
                <View style={{ height: height * 0.25, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingHorizontal: 100 }}>
                  <Image
                    source={lumeraLogo}
                    style={styles.logoImage}
                    resizeMode="contain"
                  />
                </View>

                <View style={{ flex: 1, paddingHorizontal: 24, paddingBottom: 40 }}>
                  <Text style={styles.sloganText}>
                    Tu rancho siempre a la vista:{"\n"}seguro, claro y conectado.
                  </Text>

                  {/* Glassmorphism Card */}
                  <View style={styles.card}>
                    {isLogin ? (
                      <LoginFormComponent
                        onSubmit={handleLoginSubmit}
                        onToggleForm={() => setIsLogin(false)}
                      />
                    ) : (
                      <>
                        <Text style={styles.cardTitle}>Regístrate</Text>
                        <Text style={styles.cardSubtitle}>
                          Crea una cuenta para comenzar a gestionar tus propiedades
                        </Text>
                        <SignInFormComponent
                          onSubmit={handleRegisterSubmit}
                          onToggleForm={() => setIsLogin(true)} navigation={undefined} />
                      </>
                    )}
                  </View>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}
