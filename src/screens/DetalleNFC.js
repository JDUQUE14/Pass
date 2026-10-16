import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Animated } from 'react-native';
import { colors } from '../styles/theme';

export default function DetalleNFC({ route, navigation }) {
  const carnet = route.params?.carnet || {
    institucion: 'PASCUAL BRAVO',
    nombre: 'Usuario Activo',
    rol: 'Estudiante',
    codigo: 'CC-10203040',
  };

  const [transmitting, setTransmitting] = useState(false);
  const [resultStatus, setResultStatus] = useState(null); // 'success' | 'denied' | null

  const handleStartHCE = () => {
    setTransmitting(true);
    setResultStatus(null);

    // Simulación de respuesta HCE desde lector físico
    setTimeout(() => {
      setTransmitting(false);
      setResultStatus('success');
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

{/* Header */}
<View style={styles.header}>
  <TouchableOpacity 
    onPress={() => navigation.navigate('Inicio')}
    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
    style={styles.backButton}
  >
    <Text style={styles.backText}>← Volver</Text>
  </TouchableOpacity>
  <Text style={styles.headerTitle}>Emisión NFC</Text>
  <View style={{ width: 60 }} />
</View>
      {/* Informacion Superior del Carnet */}
      <View style={styles.cardDetails}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>ID</Text>
        </View>
        <Text style={styles.instText}>{carnet.institucion}</Text>
        <Text style={styles.nameText}>{carnet.nombre}</Text>
        <Text style={styles.roleText}>{carnet.rol} • {carnet.codigo}</Text>
        <Text style={styles.qrPlaceholder}>[ Código QR Respaldo ]</Text>
      </View>

      {/* Área Inferior - Emulación NFC HCE */}
      <View style={styles.nfcArea}>
        {resultStatus === 'success' && (
          <View style={styles.bannerSuccess}>
            <Text style={styles.bannerText}>✓ ACCESO PERMITIDO</Text>
          </View>
        )}

        {resultStatus === 'denied' && (
          <View style={styles.bannerDenied}>
            <Text style={styles.bannerText}>✕ ACCESO DENEGADO</Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.nfcButton, transmitting && styles.nfcButtonActive]}
          onPress={handleStartHCE}
          disabled={transmitting}
        >
          <Text style={styles.nfcButtonText}>
            {transmitting ? 'Transmitiendo token...' : 'Aproximar al Lector (NFC)'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.nfcHint}>
          {transmitting
            ? 'Acerca la parte trasera de tu teléfono al sensor.'
            : 'Presiona el botón para activar Host Card Emulation (HCE).'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingTop: 40, paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  backText: { color: colors.primary, fontSize: 15, fontWeight: 'bold' },
  headerTitle: { color: colors.textPrimary, fontSize: 16, fontWeight: 'bold' },
  cardDetails: { backgroundColor: colors.surface, borderRadius: 16, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: colors.surfaceBorder },
  avatar: { width: 70, height: 70, borderRadius: 35, backgroundColor: colors.background, borderWidth: 2, borderColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  avatarText: { color: colors.primary, fontWeight: 'bold', fontSize: 20 },
  instText: { color: colors.primary, fontSize: 12, fontWeight: 'bold', letterSpacing: 1.5 },
  nameText: { color: colors.textPrimary, fontSize: 22, fontWeight: 'bold', marginTop: 4 },
  roleText: { color: colors.textSecondary, fontSize: 13, marginTop: 2 },
  qrPlaceholder: { color: colors.textSecondary, fontSize: 11, marginTop: 16, fontStyle: 'italic' },
  nfcArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  bannerSuccess: { backgroundColor: '#059669', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, marginBottom: 20 },
  bannerDenied: { backgroundColor: colors.danger, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, marginBottom: 20 },
  bannerText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 },
  nfcButton: { backgroundColor: colors.primary, width: '100%', paddingVertical: 18, borderRadius: 14, alignItems: 'center' },
  nfcButtonActive: { backgroundColor: '#00C8BC' },
  nfcButtonText: { color: '#000000', fontWeight: 'bold', fontSize: 16 },
  nfcHint: { color: colors.textSecondary, fontSize: 12, marginTop: 12, textAlign: 'center' },
  backButton: {
    paddingVertical: 8,
  paddingRight: 12,
  zIndex: 10,
},
});