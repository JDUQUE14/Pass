import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, FlatList, Switch, ActivityIndicator, Alert } from 'react-native';
import { colors } from '../styles/theme';
import { getAccessLogs } from '../services/api';

export default function HistorialAjustes({ navigation }) {
  const [requireBiometrics, setRequireBiometrics] = useState(true);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargamos el historial desde el backend al montar la pantalla
  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const data = await getAccessLogs();
      setLogs(data);
    } catch (error) {
      Alert.alert('Error', typeof error === 'string' ? error : 'No se pudo cargar el historial de accesos');
    } finally {
      setLoading(false);
    }
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
      
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={logs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            // Formateamos la fecha y hora proveniente del timestamp de la BD
            const fechaFormateada = item.timestamp 
              ? new Date(item.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })
              : 'Fecha desconocida';

            return (
              <View style={styles.logCard}>
                <View style={{ flex: 1, paddingRight: 10 }}>
                  <Text style={styles.logTitle}>{item.location || 'Acceso Institucional'}</Text>
                  
                  {/* Mostramos el número de carnet asociado */}
                  <Text style={styles.logSubText}>
                    Carnet: {item.card?.card_number || 'N/A'} ({item.card?.institution_name || ''})
                  </Text>
                  
                  <Text style={styles.logDate}>{fechaFormateada}</Text>
                </View>
                
                <Text style={item.status === 'Exitoso' ? styles.statusOk : styles.statusFail}>
                  {item.status || 'Exitoso'}
                </Text>
              </View>
            );
          }}
          ListEmptyComponent={
            <Text style={{ color: colors.textSecondary, textAlign: 'center', marginTop: 20 }}>
              No hay registros de accesos todavía.
            </Text>
          }
        />
      )}

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
  logSubText: { color: colors.primary, fontSize: 12, fontWeight: '500', marginTop: 3 },
  logDate: { color: colors.textSecondary, fontSize: 11, marginTop: 4 },
  statusOk: { color: colors.primary, fontWeight: 'bold', fontSize: 12 },
  statusFail: { color: colors.danger, fontWeight: 'bold', fontSize: 12 },
  logoutButton: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.danger, borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginVertical: 20 },
  logoutText: { color: colors.danger, fontWeight: 'bold', fontSize: 14 },
  backButton: { paddingVertical: 8, paddingRight: 12, zIndex: 10 },
});