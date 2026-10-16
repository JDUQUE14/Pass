import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { colors } from '../styles/theme';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // POST /api/v1/login backend Python
    navigation.replace('Inicio');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      <View style={styles.headerContainer}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoBadgeText}>P</Text>
        </View>
        <Text style={styles.brandTitle}>PASS</Text>
        <Text style={styles.subtitle}>Billetera de Credenciales NFC</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Correo Institucional / Usuario</Text>
        <TextInput
          style={styles.input}
          placeholder="usuario@institucion.edu.co"
          placeholderTextColor={colors.textSecondary}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          placeholderTextColor={colors.textSecondary}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.biometricButton} onPress={handleLogin}>
          <Text style={styles.biometricText}>Ingresar con Biometría (Huella / Face ID)</Text>
        </TouchableOpacity>

        <View style={styles.linksContainer}>
          <TouchableOpacity>
            <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('VincularCarnet')}>
            <Text style={styles.linkText}>Registrar credencial inicial</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 36,
  },
  logoBadge: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoBadgeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
  },
  brandTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.primary,
    letterSpacing: 3,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  formContainer: {
    width: '100%',
  },
  label: {
    color: colors.textPrimary,
    fontSize: 13,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: colors.textPrimary,
    fontSize: 14,
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 15,
  },
  biometricButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  biometricText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  linksContainer: {
    marginTop: 24,
    alignItems: 'center',
    gap: 12,
  },
  linkText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
});