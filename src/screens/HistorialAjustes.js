import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, FlatList, Switch } from 'react-native';
import { colors } from '../styles/theme';

export default function HistorialAjustes({ navigation }) {
  const [requireBiometrics, setRequireBiometrics] = useState(true);

  const logs = [
    { id: '1', puerta: 'Torniquete Principal - Bloque 1', fecha: 'Hoy, 08:15 AM', estado: 'Exitoso' },
    { id: '2', puerta: 'Laboratorio de Redes', fecha: 'Ayer, 02:30 PM', estado: 'Exitoso' },
    { id: '3', puerta: 'Biblioteca - Acceso VIP', fecha: '12 Sep, 10:10 AM', estado: 'Fallido' },
  ];

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
  <Text style={styles.headerTitle}>Historial y Ajustes</Text>
  <View style={{ width: 60 }} />
</View>

      <Text style={styles.sectionTitle}>Seguridad</Text>
      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Exigir biometría para transmitir NFC</Text>
        <Switch
          value={requireBiometrics}
          onValueChange={setRequireBiometrics}
          thumbColor={requireBiometrics ? colors.primary : colors.textSecondary}
        />
      </View>

      <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Historial de Accesos</Text>
      <FlatList
        data={logs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.logCard}>
            <View>
              <Text style={styles.logTitle}>{item.puerta}</Text>
              <Text style={styles.logDate}>{item.fecha}</Text>
            </View>
            <Text style={item.estado === 'Exitoso' ? styles.statusOk : styles.statusFail}>
              {item.estado}
            </Text>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.replace('Login')}
      >
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingTop: 40, paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  backText: { color: colors.primary, fontSize: 15, fontWeight: 'bold' },
  headerTitle: { color: colors.textPrimary, fontSize: 16, fontWeight: 'bold' },
  sectionTitle: { color: colors.textPrimary, fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.surface, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: colors.surfaceBorder },
  settingText: { color: colors.textPrimary, fontSize: 13, flex: 1, paddingRight: 10 },
  logCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.surface, padding: 16, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: colors.surfaceBorder },
  logTitle: { color: colors.textPrimary, fontSize: 14, fontWeight: '600' },
  logDate: { color: colors.textSecondary, fontSize: 12, marginTop: 2 },
  statusOk: { color: colors.primary, fontWeight: 'bold', fontSize: 12 },
  statusFail: { color: colors.danger, fontWeight: 'bold', fontSize: 12 },
  logoutButton: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.danger, borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginVertical: 20 },
  logoutText: { color: colors.danger, fontWeight: 'bold', fontSize: 14 },
  backButton: {
  paddingVertical: 8,
  paddingRight: 12,
  zIndex: 10,
},
});