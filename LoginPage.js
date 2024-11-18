import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View, ImageBackground, Image } from 'react-native';
import UVv_Campus from '../assets/fundo.png';
import UVv_Logo from '../assets/logo2.png';
import { supabase } from '../services/supabase'; // Importando o supabase

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Estado para armazenar mensagem de erro

  // Função para o login
  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('alunos')
        .select('*')
        .eq('email', email)
        .eq('senha', password);

      if (error) {
        setErrorMessage('Ocorreu um erro ao verificar suas credenciais.');
        return;
      }

      if (data && data.length > 0) {
        navigation.navigate('Main');
      } else {
        setErrorMessage('Email ou senha inválidos. Por favor, verifique suas credenciais.');
      }
    } catch (error) {
      setErrorMessage('Ocorreu um erro inesperado. Tente novamente.');
    }
  };

  return (
    <ImageBackground style={styles.background} source={UVv_Campus} resizeMode="cover">
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <Image style={styles.logo} source={UVv_Logo} />
          <Text style={styles.title}>Bem-vindo</Text>

          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Senha"
            secureTextEntry={true}
          />

          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={() => navigation.navigate('ForgetPassword')}
          >
            <Text style={styles.buttonText}>Esqueci a Senha</Text>
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
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#063970',
  },
  input: {
    height: 40,
    width: '100%',
    marginVertical: 10,
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#fff', // Campo de entrada com fundo branco
    borderWidth: 1, // Adicionando borda
    borderColor: '#063970', // Cor da borda
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
  buttonSecondary: {
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
  errorText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
});
