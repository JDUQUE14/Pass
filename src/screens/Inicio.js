import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '../styles/theme';

export default function Inicio({ navigation }) {
  const carnets = [
    {
      id: '1',
      institucion: 'PASCUAL BRAVO',
      nombre: 'Usuario Activo',
      rol: 'Estudiante',
      estado: 'Activo',
      codigo: 'CC-10203040',
    },
    {
      id: '2',
      institucion: 'BIBLIOTECA CENTRAL',
      nombre: 'Usuario Activo',
      rol: 'Lector Frecuente',
      estado: 'Activo',
      codigo: 'BIB-998822',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brandTitle}>PASS</Text>
          <Text style={styles.subtitle}>Billetera de Credenciales</Text>
        </View>
        <TouchableOpacity 
          style={styles.profileBadge}
          onPress={() => navigation.navigate('HistorialAjustes')}
        >
          <Text style={styles.profileBadgeText}>A</Text>
        </TouchableOpacity>
      </View>

      {/* Backend Connection Status */}
      <View style={styles.statusBanner}>
        <View style={styles.statusDot} />
        <Text style={styles.statusText}>Backend Python FastAPI: Conectado</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Tus Carnets Digitales</Text>

        {carnets.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => navigation.navigate('DetalleNFC', { carnet: item })}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardInst}>{item.institucion}</Text>
              <View style={styles.badgeActive}>
                <Text style={styles.badgeText}>{item.estado}</Text>
              </View>
            </View>
            <Text style={styles.cardName}>{item.nombre}</Text>
            <Text style={styles.cardRole}>{item.rol} • {item.codigo}</Text>
            <Text style={styles.cardAction}>Toca para transmitir NFC →</Text>
          </TouchableOpacity>
        ))}

        {/* Botonera */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('VincularCarnet')}
        >
          <Text style={styles.addButtonText}>+ Vincular Nuevo Carnet</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingTop: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 },
  brandTitle: { fontSize: 28, fontWeight: 'bold', color: colors.primary, letterSpacing: 2 },
  subtitle: { fontSize: 12, color: colors.textSecondary },
  profileBadge: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
  profileBadgeText: { color: colors.primary, fontWeight: 'bold' },
  statusBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, marginHorizontal: 20, marginVertical: 16, padding: 10, borderRadius: 8, borderWidth: 1, borderColor: colors.surfaceBorder },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary, marginRight: 8 },
  statusText: { color: colors.textSecondary, fontSize: 12 },
  content: { paddingHorizontal: 20, paddingBottom: 20 },
  sectionTitle: { color: colors.textPrimary, fontSize: 16, fontWeight: 'bold', marginBottom: 16 },
  card: { backgroundColor: colors.surface, borderRadius: 16, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: colors.surfaceBorder },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  cardInst: { color: colors.primary, fontWeight: 'bold', fontSize: 12, letterSpacing: 1 },
  badgeActive: { backgroundColor: '#052e2b', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: colors.primary },
  badgeText: { color: colors.primary, fontSize: 10, fontWeight: 'bold' },
  cardName: { color: colors.textPrimary, fontSize: 20, fontWeight: 'bold' },
  cardRole: { color: colors.textSecondary, fontSize: 13, marginTop: 4 },
  cardAction: { color: colors.primary, fontSize: 12, fontWeight: '600', marginTop: 16, textAlign: 'right' },
  addButton: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.primary, borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 8 },
  addButtonText: { color: colors.primary, fontWeight: 'bold', fontSize: 14 },
});