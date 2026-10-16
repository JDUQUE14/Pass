import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { colors } from '../styles/theme';

export default function VincularCarnet({ navigation }) {
  const [code, setCode] = useState('');

  const handleLink = () => {
    // POST /api/v1/carnets/link al backend
    navigation.goBack();
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
  <Text style={styles.headerTitle}>Vincular Carnet</Text>
  <View style={{ width: 60 }} />
</View>

      <View style={styles.content}>
        <Text style={styles.label}>Código Único de Enrolamiento</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: PASS-9920-X12"
          placeholderTextColor={colors.textSecondary}
          value={code}
          onChangeText={setCode}
          autoCapitalize="characters"
        />

        <TouchableOpacity style={styles.qrButton}>
          <Text style={styles.qrButtonText}>📷 Escanear Código QR Institucional</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={handleLink}>
          <Text style={styles.submitButtonText}>Vincular Carnet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingTop: 40, paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  backText: { color: colors.primary, fontSize: 15, fontWeight: 'bold' },
  headerTitle: { color: colors.textPrimary, fontSize: 16, fontWeight: 'bold' },
  content: { flex: 1 },
  label: { color: colors.textPrimary, fontSize: 13, fontWeight: '600', marginBottom: 8 },
  input: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.surfaceBorder, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, color: colors.textPrimary, fontSize: 14, marginBottom: 20 },
  qrButton: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.primary, borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginBottom: 20 },
  qrButtonText: { color: colors.primary, fontWeight: 'bold', fontSize: 14 },
  submitButton: { backgroundColor: colors.primary, borderRadius: 12, paddingVertical: 16, alignItems: 'center' },
  submitButtonText: { color: '#000000', fontWeight: 'bold', fontSize: 15 },
  backButton: {
  paddingVertical: 8,
  paddingRight: 12,
  zIndex: 10,
},
});