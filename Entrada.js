import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const EnterModal = ({ onCalculate, onCancel }) => {
  const [valorAlcool, setAlcool] = useState('');
  const [valorGasolina, setGasolina] = useState('');

  return (
    <View style={styles.glassContainer}>
      <Text style={styles.title}>Informe os preços!</Text>

      <TextInput
        style={styles.input}
        placeholder="Preço do Álcool"
        placeholderTextColor="#666"
        keyboardType="numeric"
        value={valorAlcool}
        onChangeText={setAlcool}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço da Gasolina"
        placeholderTextColor="#666"
        keyboardType="numeric"
        value={valorGasolina}
        onChangeText={setGasolina}
      />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.calculateButton]}
          onPress={() => onCalculate(valorAlcool, valorGasolina)}
        >
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.cancelButton]}
          onPress={onCancel}
        >
          <Text style={[styles.buttonText, styles.cancelText]}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  glassContainer: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.83)',
    borderRadius: 20,
    padding: 25,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
  },
  title: {
    fontSize: 22,
    marginBottom: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.46)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'hsl(285 67.6% 71%)',
    fontSize: 16,
    color: '#333',
  },
  buttonsContainer: {
    marginTop: 15,
    gap: 12,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 25,
    borderWidth: 2,
    alignItems: 'center',
  },
calculateButton: {
    borderColor: '#fff',
    backgroundColor: 'hsl(165 67.6% 71%)',
  },
  cancelButton: {
    borderColor: '#fff',
    backgroundColor: 'hsl(345 67.6% 71%)',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  cancelText: {
    color: '#fff',
  },
});

export default EnterModal;