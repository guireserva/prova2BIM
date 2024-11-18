import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, TouchableOpacity, ImageBackground, View, TextInput, Image, Alert } from 'react-native';
import { supabase } from '../services/supabase';
import { useNavigation } from '@react-navigation/native';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleSignUp = async () => {
    setLoading(true);

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      setLoading(false);
      return;
    }

    // Verifica se todos os campos foram preenchidos
    if (!email || !password || !nome) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      setLoading(false);
      return;
    }

    try {
      // Envia os dados para o Supabase
      const { data, error } = await supabase
        .from('alunos')
        .insert([
          {
            nome,
            email,
            senha: password,
          },
        ]);

      if (error) {
        Alert.alert('Erro', 'Erro ao registrar na tabela de alunos.');
        setLoading(false);
        return;
      }

      Alert.alert('Sucesso', 'Dados registrados com sucesso!');
      navigation.navigate('Login');
      setLoading(false);
    } catch (error) {
      console.error('Erro inesperado:', error);
      Alert.alert('Erro', 'Ocorreu um erro inesperado. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={require('../assets/fundo.png')} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.loginText}>Criar Conta</Text>

          <Image style={styles.logo} source={require('../assets/logo2.png')} />

          <TextInput
            style={styles.input}
            onChangeText={setNome}
            value={nome}
            placeholder="Nome"
            placeholderTextColor="#999"
          />

          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            keyboardType="email-address"
            placeholderTextColor="#999"
          />

          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Senha"
            secureTextEntry={true}
            placeholderTextColor="#999"
          />

          <TextInput
            style={styles.input}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            placeholder="Confirme sua senha"
            secureTextEntry={true}
            placeholderTextColor="#999"
          />

          <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Criando...' : 'Criar Conta'}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '90%',
    maxWidth: 350,
    padding: 20,
    backgroundColor: '#a9bbcf',
    borderRadius: 10,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#063970',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    marginVertical: 10,
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#fff',
  },
  button: {
    height: 40,
    width: '100%',
    marginVertical: 10,
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#063970',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
