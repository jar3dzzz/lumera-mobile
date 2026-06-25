import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRancho } from '../../../context/RanchoContext';
import { Core } from '../../../interfaces/CoreInterfaces';

interface AnimalCreateFormComponentProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function AnimalCreateFormComponent({
  onSuccess,
  onCancel,
}: AnimalCreateFormComponentProps) {
  const { selectedOrgId, selectedProductionUnitId, setAnimals } = useRancho();

  // Form states
  const [nombre, setNombre] = useState<string>('');
  const [edad, setEdad] = useState<string>('');
  const [fechaNacimiento, setFechaNacimiento] = useState<string>('');
  const [animalType, setAnimalType] = useState<string>('VACA');
  const [customType, setCustomType] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [arete, setArete] = useState<string>('');
  const [pierna1, setPierna1] = useState<string>('');
  const [pieran2, setPieran2] = useState<string>('');
  const [serie1, setSerie1] = useState<string>('');
  const [serie2, setSerie2] = useState<string>('');

  // UI states
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const finalType = animalType === 'OTRO' ? (customType.trim() || 'VACA') : animalType;

      const newAnimal: Core.Animal = {
        id: Math.floor(Math.random() * 1000000),
        nombre: nombre.trim() || 'Sin nombre',
        edad: edad.trim() ? parseInt(edad) : 0,
        fechaNacimiento: fechaNacimiento.trim() || new Date().toISOString().split('T')[0],
        animalType: finalType,
        Color: color.trim() || 'No especificado',
        Pierna1: pierna1.trim() || 'No especificado',
        Pieran2: pieran2.trim() || 'No especificado',
        Serie1: serie1.trim() || 'No especificado',
        Serie2: serie2.trim() || 'No especificado',
        Arete: arete.trim() || 'No especificado',
        created_by: 'mock-user-id',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Pushing the mock animal into current context list
      setAnimals((prev) => [...prev, newAnimal]);

      Alert.alert('Éxito', 'El animal ha sido registrado correctamente.');
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Ocurrió un error al registrar el animal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Text style={styles.title}>Registrar Nuevo Animal</Text>
        <Text style={styles.subtitle}>Complete los datos del animal para registrarlo en la unidad productiva.</Text>
      </View>

      {/* Name Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Nombre (Opcional)</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="text-outline" size={20} color="rgba(255,255,255,0.4)" style={styles.inputIcon} />
          <TextInput
            style={styles.inputText}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Ej. Tilín"
            placeholderTextColor="rgba(255,255,255,0.3)"
          />
        </View>
      </View>

      {/* Row for Edad and Fecha de Nacimiento */}
      <View style={styles.inputRowContainer}>
        <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
          <Text style={styles.inputLabel}>Edad (Opcional)</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="time-outline" size={18} color="rgba(255,255,255,0.4)" style={styles.inputIcon} />
            <TextInput
              style={styles.inputText}
              value={edad}
              onChangeText={setEdad}
              placeholder="Ej. 2"
              placeholderTextColor="rgba(255,255,255,0.3)"
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
          <Text style={styles.inputLabel}>Fecha Nacimiento (Opcional)</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="calendar-outline" size={18} color="rgba(255,255,255,0.4)" style={styles.inputIcon} />
            <TextInput
              style={styles.inputText}
              value={fechaNacimiento}
              onChangeText={setFechaNacimiento}
              placeholder="AAAA-MM-DD"
              placeholderTextColor="rgba(255,255,255,0.3)"
            />
          </View>
        </View>
      </View>

      {/* Animal Type Selector */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Tipo de Animal (Opcional)</Text>
        <View style={styles.typeSelectorRow}>
          {['VACA', 'BECERRO', 'TORO', 'OTRO'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeButton,
                animalType === type && styles.typeButtonActive,
              ]}
              onPress={() => setAnimalType(type)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.typeButtonText,
                animalType === type && styles.typeButtonTextActive
              ]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Custom Type Input */}
      {animalType === 'OTRO' && (
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Especificar Tipo (Opcional)</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="create-outline" size={20} color="rgba(255,255,255,0.4)" style={styles.inputIcon} />
            <TextInput
              style={styles.inputText}
              value={customType}
              onChangeText={setCustomType}
              placeholder="Ej. Vaquilla, Novillo, etc."
              placeholderTextColor="rgba(255,255,255,0.3)"
            />
          </View>
        </View>
      )}

      {/* Arete Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Arete (Opcional)</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="pricetag-outline" size={20} color="rgba(255,255,255,0.4)" style={styles.inputIcon} />
          <TextInput
            style={styles.inputText}
            value={arete}
            onChangeText={setArete}
            placeholder="Ej. TAG-MX-123"
            placeholderTextColor="rgba(255,255,255,0.3)"
            autoCapitalize="characters"
          />
        </View>
      </View>

      {/* Color Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Color (Opcional)</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="color-palette-outline" size={20} color="rgba(255,255,255,0.4)" style={styles.inputIcon} />
          <TextInput
            style={styles.inputText}
            value={color}
            onChangeText={setColor}
            placeholder="Ej. Negro con blanco"
            placeholderTextColor="rgba(255,255,255,0.3)"
          />
        </View>
      </View>

      {/* Row for Pierna1 and Pierna2 */}
      <View style={styles.inputRowContainer}>
        <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
          <Text style={styles.inputLabel}>Pierna 1 (Opcional)</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="sparkles-outline" size={18} color="rgba(255,255,255,0.4)" style={styles.inputIcon} />
            <TextInput
              style={styles.inputText}
              value={pierna1}
              onChangeText={setPierna1}
              placeholder="Ej. Hierro A"
              placeholderTextColor="rgba(255,255,255,0.3)"
            />
          </View>
        </View>

        <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
          <Text style={styles.inputLabel}>Pierna 2 (Opcional)</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="sparkles-outline" size={18} color="rgba(255,255,255,0.4)" style={styles.inputIcon} />
            <TextInput
              style={styles.inputText}
              value={pieran2}
              onChangeText={setPieran2}
              placeholder="Ej. Hierro B"
              placeholderTextColor="rgba(255,255,255,0.3)"
            />
          </View>
        </View>
      </View>

      {/* Row for Serie1 and Serie2 */}
      <View style={styles.inputRowContainer}>
        <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
          <Text style={styles.inputLabel}>Serie 1 (Opcional)</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="barcode-outline" size={18} color="rgba(255,255,255,0.4)" style={styles.inputIcon} />
            <TextInput
              style={styles.inputText}
              value={serie1}
              onChangeText={setSerie1}
              placeholder="Ej. 12345"
              placeholderTextColor="rgba(255,255,255,0.3)"
            />
          </View>
        </View>

        <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
          <Text style={styles.inputLabel}>Serie 2 (Opcional)</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="barcode-outline" size={18} color="rgba(255,255,255,0.4)" style={styles.inputIcon} />
            <TextInput
              style={styles.inputText}
              value={serie2}
              onChangeText={setSerie2}
              placeholder="Ej. 67890"
              placeholderTextColor="rgba(255,255,255,0.3)"
            />
          </View>
        </View>
      </View>

      {/* Form Buttons */}
      <View style={styles.buttonRow}>
        {onCancel && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onCancel}
            disabled={loading}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.submitButton, onCancel ? { flex: 1, marginLeft: 12 } : { width: '100%' }]}
          onPress={handleSubmit}
          disabled={loading}
          activeOpacity={0.7}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#111214" />
          ) : (
            <>
              <Text style={styles.submitButtonText}>Registrar</Text>
              <Ionicons name="checkmark-sharp" size={18} color="#111214" style={{ marginLeft: 6 }} />
            </>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 13,
    lineHeight: 18,
  },
  inputGroup: {
    marginBottom: 18,
  },
  inputLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  inputText: {
    flex: 1,
    color: '#ffffff',
    fontSize: 15,
    height: '100%',
  },
  typeSelectorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  typeButton: {
    flex: 1,
    height: 46,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    marginHorizontal: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: 'rgba(217, 171, 85, 0.15)',
    borderColor: '#d9ab55',
  },
  typeButtonText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    fontWeight: '600',
  },
  typeButtonTextActive: {
    color: '#d9ab55',
    fontWeight: 'bold',
  },
  inputRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  cancelButton: {
    paddingHorizontal: 24,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 15,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#d9ab55',
    borderRadius: 12,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#111214',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
