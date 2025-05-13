import React, { Component } from 'react';
import { StyleSheet, View, Modal, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import EnterModal from './Entrada.js';
import ResultModal from './Resultado.js';

export default class App extends Component {
  state = {
    visibleModal: false,
    step: 1,
    alcool: '',
    gasolina: '',
    resultText: '',
    historico: [],
  };

  componentDidMount() {
    this.carregarHistorico();
  }

  entrar = () => this.setState({ visibleModal: true, step: 2 });
  sair = () => this.setState({ visibleModal: false, step: 1, alcool: '', gasolina: '', resultText: '' });

  carregarHistorico = async () => {
    try {
      const historico = await AsyncStorage.getItem('@historico_calculos');
      if (historico) this.setState({ historico: JSON.parse(historico) });
    } catch (e) {
      console.log('Erro ao carregar histórico:', e);
    }
  };

  atualizarHistorico = async (novoCalculo) => {
    try {
      const novoHistorico = [novoCalculo, ...this.state.historico.slice(0, 4)];
      await AsyncStorage.setItem('@historico_calculos', JSON.stringify(novoHistorico));
      this.setState({ historico: novoHistorico });
    } catch (e) {
      console.log('Erro ao salvar histórico:', e);
    }
  };

  limparHistorico = async () => {
    try {
      await AsyncStorage.removeItem('@historico_calculos');
      this.setState({ historico: [] });
    } catch (e) {
      console.log('Erro ao limpar histórico:', e);
    }
  };

  calcular = async (alcool, gasolina) => {
    const data = new Date().toLocaleString();
    const a = parseFloat(alcool.replace(',', '.'));
    const g = parseFloat(gasolina.replace(',', '.'));
    const result = a / g;
    const texto = result < 0.7 ? 'Álcool' : 'Gasolina';
    const resultadoFinal = `${result.toFixed(2)} - ${texto}`;

    const novoCalculo = {
      data,
      alcool,
      gasolina,
      resultado: resultadoFinal
    };

    await this.atualizarHistorico(novoCalculo);
    this.setState({ step: 3, resultText: resultadoFinal });
  };

  render() {
    const { visibleModal, step, resultText, historico } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.whiteContainer}>
          <Text style={styles.titulo}>Gasolina x Álcool</Text>
          <Text style={styles.textoExplicativo}>
            Está em dúvida sobre que combustível usar pra reabastecer seu carro? Qual compensa?
          </Text>
          <Text style={styles.textoExplicativo}>
            Aqui, basta inserir os preços locais de onde você quer abastecer e iremos calcular qual o mais vantajoso pra você!
          </Text>
          <Text style={styles.textoExplicativo}>
            Calcule já!
          </Text>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={this.entrar}
          >
            <Text style={styles.buttonText}>Calcular Agora</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={visibleModal} animationType="slide" transparent>
          <View style={styles.container}>
            {step === 2 && (
              <EnterModal
                onCalculate={this.calcular}
                onCancel={this.sair}
              />
            )}
            {step === 3 && (
              <ResultModal
                resultText={resultText}
                historico={historico}
                onExit={this.sair}
                onLimparHistorico={this.limparHistorico}
              />
            )}
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.83)',
    backgroundImage: `linear-gradient(45deg, 
      hsl(105 67.6% 71%), 
      hsl(135 67.6% 71%), 
      hsl(165 67.6% 71%), 
      hsl(285 67.6% 71%), 
      hsl(345 67.6% 71%))`,
  },
  whiteContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 25,
    margin: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  textoExplicativo: {
    fontSize: 16,
    color: '#666',
    textAlign: 'justify',
    lineHeight: 22,
    marginBottom: 25,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'hsl(165 67.6% 71%)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});