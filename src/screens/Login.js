import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../styles/theme';
import { loginUser } from '../services/api';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasBiometricsSaved, setHasBiometricsSaved] = useState(false);

  // Al cargar la pantalla, verificamos si hay una sesión previa o credenciales guardadas
  useEffect(() => {
    checkSavedCredentials();
  }, []);

  const checkSavedCredentials = async () => {
    try {
      const savedEmail = await AsyncStorage.getItem('user_email');
      const savedToken = await AsyncStorage.getItem('user_token');
      
      if (savedEmail && savedToken) {
        setHasBiometricsSaved(true);
        // Opcional: Podríamos lanzar la biometría automáticamente al abrir la app
        // handleBiometricLogin();
      }
    } catch (error) {
      console.log('Error leyendo credenciales guardadas:', error);
    }
  };

  // Función de Login tradicional (Correo y Contraseña)
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Campos vacíos', 'Por favor ingresa tu correo y contraseña.');
      return;
    }

    try {
      setLoading(true);
      const data = await loginUser(email, password);
      
      if (data && data.access_token) {
        // Guardamos el token y el correo para futuras autenticaciones biométricas
        await AsyncStorage.setItem('user_token', data.access_token);
        await AsyncStorage.setItem('user_email', email);

        navigation.replace('Inicio');
      } else {
        Alert.alert('Error', 'Credenciales inválidas.');
      }
    } catch (error) {
      console.log('Error en login:', error);
      Alert.alert('Error de conexión', 'No se pudo conectar con el servidor backend.');
    } finally {
      setLoading(false);
    }
  };

  // Función de Inicio de Sesión por Biometría (Huella / FaceID)
  const handleBiometricLogin = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        Alert.alert('Aviso', 'Este dispositivo no tiene configurada biometría.');
        return;
      }

      const authResult = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Inicia sesión con tu huella o rostro',
        fallbackLabel: 'Usar contraseña',
        cancelLabel: 'Cancelar',
      });

      if (authResult.success) {
        // Verificamos si tenemos un token guardado previamente en el dispositivo
        const savedToken = await AsyncStorage.getItem('user_token');
        
        if (savedToken) {
          // Si el token existe, entramos directamente a la app
          navigation.replace('Inicio');
        } else {
          Alert.alert(
            'Primera vez',
            'Por favor inicia sesión con tu correo y contraseña al menos una vez para registrar el perfil biométrico.'
          );
        }
      } else {
        Alert.alert('Autenticación cancelada', 'No se pudo verificar tu identidad.');
      }
    } catch (error) {
      console.log('Error en biometría de login:', error);
      Alert.alert('Error', 'Ocurrió un error al procesar la biometría.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      <View style={styles.headerContainer}>
        <Text style={styles.title}>Pass Digital</Text>
        <Text style={styles.subtitle}>Wallet Institucional Segura</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor={colors.textSecondary}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor={colors.textSecondary}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.background} />
          ) : (
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
          )}
        </TouchableOpacity>

        {/* Botón de acceso rápido por Biometría */}
        <TouchableOpacity
          style={styles.biometricButton}
          onPress={handleBiometricLogin}
        >
          <Text style={styles.biometricButtonText}>🛡️ Ingresar con Biometría</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          Seguridad cifrada respaldada por FastAPI & JWT
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 50,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: colors.surface,
    color: colors.textPrimary,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    marginBottom: 14,
  },
  loginButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 6,
  },
  loginButtonText: {
    color: colors.background,
    fontWeight: 'bold',
    fontSize: 15,
  },
  biometricButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  biometricButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  footerContainer: {
    alignItems: 'center',
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 11,
    textAlign: 'center',
  },
});