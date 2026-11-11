import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { colors } from '../styles/theme';
import { createAccessLog } from '../services/api';

export default function DetalleNFC({ route, navigation }) {
  const { carnet } = route.params || {};
  const [transmitting, setTransmitting] = useState(false);

  // Función que maneja la autenticación biométrica antes del NFC
  const handleStartNFC = async () => {
    try {
      // 1. Verificamos si el dispositivo soporta biometría
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        // Si el emulador o dispositivo no tiene biometría configurada, avisamos pero dejamos continuar para pruebas
        Alert.alert(
          'Aviso Biometría',
          'Este dispositivo no tiene huella/rostro configurado. Se omitirá el paso biométrico para fines de prueba.',
          [{ text: 'Continuar', onPress: executeNfcTransmission }]
        );
        return;
      }

      // 2. Lanzamos el prompt biométrico del sistema (Huella / FaceID)
      const authResult = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Autentícate para transmitir credencial NFC',
        fallbackLabel: 'Usar contraseña',
        cancelLabel: 'Cancelar',
      });

      if (authResult.success) {
        // Si la biometría es exitosa, procedemos con el NFC
        executeNfcTransmission();
      } else {
        Alert.alert('Autenticación fallida', 'No se pudo verificar tu identidad. Transmisión cancelada.');
      }
    } catch (error) {
      console.log('Error en biometría:', error);
      Alert.alert('Error', 'Ocurrió un error al intentar validar la biometría.');
    }
  };

  // Función que simula la transmisión NFC y guarda en el backend
  const executeNfcTransmission = () => {
    setTransmitting(true);

    setTimeout(async () => {
      setTransmitting(false);

      const logData = {
        location: `Torniquete - ${carnet?.institution_name || 'General'}`,
        status: 'Exitoso',
        card_id: carnet?.id,
      };

      try {
        await createAccessLog(logData);
      } catch (error) {
        console.log('No se pudo registrar el acceso en el servidor:', error);
      }

      Alert.alert(
        'Acceso Concedido',
        `Credencial "${carnet?.card_number || 'N/A'}" transmitida con éxito al lector NFC.`,
        [{ text: 'OK' }]
      );
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          style={styles.backButton}
        >
          <Text style={styles.backText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transmisión NFC Segura</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Tarjeta con los datos */}
      <View style={styles.cardContainer}>
        <Text style={styles.institutionName}>
          {carnet?.institution_name || 'Institución no especificada'}
        </Text>
        <Text style={styles.cardRole}>{carnet?.role || 'Estudiante'}</Text>
        <Text style={styles.cardNumber}>Código: {carnet?.card_number || '000000'}</Text>
      </View>

      {/* Área central */}
      <View style={styles.nfcArea}>
        {transmitting ? (
          <View style={styles.transmittingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.nfcStatusText}>Transmitiendo por campo NFC...</Text>
            <Text style={styles.nfcSubText}>Acercando al torniquete de acceso</Text>
          </View>
        ) : (
          <View style={styles.idleContainer}>
            <View style={styles.nfcIconCircle}>
              <Text style={styles.nfcIcon}>🛡️📡</Text>
            </View>
            <Text style={styles.nfcStatusText}>Protegido con Biometría</Text>
            <Text style={styles.nfcSubText}>
              Presiona el botón para validar tu identidad y transmitir.
            </Text>
          </View>
        )}
      </View>

      {/* Botón */}
      <TouchableOpacity
        style={[styles.actionButton, transmitting && styles.actionButtonDisabled]}
        onPress={handleStartNFC}
        disabled={transmitting}
      >
        <Text style={styles.actionButtonText}>
          {transmitting ? 'PROCESANDO...' : 'INICIAR NFC CON BIOMETRÍA'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 40,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    paddingVertical: 8,
    paddingRight: 12,
    zIndex: 10,
  },
  backText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardContainer: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    alignItems: 'center',
  },
  institutionName: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardRole: {
    color: colors.textPrimary,
    fontSize: 14,
    marginBottom: 8,
  },
  cardNumber: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  nfcArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  idleContainer: {
    alignItems: 'center',
  },
  transmittingContainer: {
    alignItems: 'center',
  },
  nfcIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  nfcIcon: {
    fontSize: 32,
  },
  nfcStatusText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    textAlign: 'center',
  },
  nfcSubText: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 6,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  actionButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonDisabled: {
    opacity: 0.6,
  },
  actionButtonText: {
    color: colors.background,
    fontWeight: 'bold',
    fontSize: 16,
  },
});