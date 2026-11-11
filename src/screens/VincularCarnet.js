import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../styles/theme';
import { createCard } from '../services/api';

export default function VincularCarnet({ navigation }) {
  const [institutionName, setInstitutionName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegisterCard = async () => {
    if (!institutionName || !cardNumber || !role) {
      Alert.alert('Campos incompletos', 'Por favor llena todos los campos para vincular la credencial.');
      return;
    }

    try {
      setLoading(true);

      // Enviamos los datos al backend de FastAPI
      await createCard({
        institution_name: institutionName,
        card_number: cardNumber,
        role: role,
        is_active: true,
      });

      Alert.alert('¡Éxito!', 'Carnet vinculado correctamente a tu billetera.', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(), // Regresa a Inicio (que se actualizará con focus Listener)
        },
      ]);
    } catch (error) {
      const errorMessage = typeof error === 'string' ? error : 'No se pudo vincular el carnet';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vincular Carnet</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Nueva Credencial</Text>
        <Text style={styles.subtitle}>
          Ingresa la información institucional para agregar un carnet a tu billetera digital.
        </Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nombre de la Institución</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Pascual Bravo / SENA / ITM"
            placeholderTextColor={colors.textSecondary}
            value={institutionName}
            onChangeText={setInstitutionName}
          />

          <Text style={styles.label}>Número de Carnet / Código</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: CC-10203040 o EST-998811"
            placeholderTextColor={colors.textSecondary}
            value={cardNumber}
            onChangeText={setCardNumber}
          />

          <Text style={styles.label}>Rol / Ocupación</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Estudiante, Docente, Administrativo"
            placeholderTextColor={colors.textSecondary}
            value={role}
            onChangeText={setRole}
          />

          <TouchableOpacity
            style={[styles.submitButton, loading && { opacity: 0.7 }]}
            onPress={handleRegisterCard}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={styles.submitButtonText}>Vincular Credencial</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 45,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  backButtonText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  title: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 6,
    marginBottom: 24,
  },
  formGroup: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  label: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.textPrimary,
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 15,
  },
});