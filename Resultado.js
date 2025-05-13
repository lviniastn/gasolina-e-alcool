import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const ResultModal = ({ resultText, historico, onExit, onLimparHistorico }) => {
  return (
    <View style={styles.glassContainer}>
      <Text style={styles.title}>É melhor usar:</Text>
      <Text style={styles.resultText}>{resultText}</Text>

      <Text style={styles.subtitle}>Últimos cálculos:</Text>
      
      <ScrollView style={styles.historicoContainer}>
        {historico.map((item, index) => (
          <View key={index} style={styles.historicoItem}>
            <Text style={styles.historicoData}>{item.data}</Text>
            <Text style={styles.historicoText}>Álcool: R$ {item.alcool}</Text>
            <Text style={styles.historicoText}>Gasolina: R$ {item.gasolina}</Text>
            <Text style={styles.historicoResultado}>{item.resultado}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.buttonGroup}>
        <TouchableOpacity 
          style={[styles.button, styles.exitButton]}
          onPress={onExit}
        >
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.limparButton]}
          onPress={onLimparHistorico}
        >
          <Text style={[styles.buttonText, styles.limparText]}>Limpar Histórico</Text>
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
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  resultText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 28,
    color: '#444',
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  historicoContainer: {
    maxHeight: 200,
    width: '100%',
    marginBottom: 15,
  },
  historicoItem: {
    backgroundColor: 'rgb(245, 233, 255)',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgb(201, 160, 235)',
  },
  historicoData: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  historicoText: {
    fontSize: 14,
    color: '#444',
  },
  historicoResultado: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'hsl(285 67.6% 71%)',
    marginTop: 4,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 25,
    borderWidth: 2,
    alignItems: 'center',
    flex: 1,
  },
  exitButton: {
    borderColor: '#fff',
    backgroundColor: 'hsl(105 67.6% 71%)',
  },
  limparButton: {
    borderColor: '#fff',
    backgroundColor: 'hsl(345 67.6% 71%)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  limparText: {
    color: '#fff',
  },
});

export default ResultModal;