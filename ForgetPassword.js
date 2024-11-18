import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View, ImageBackground, Image } from 'react-native';
import fundo from '../assets/fundo.png';
import UVv_Logo from '../assets/logo2.png';
import { supabase } from '../services/supabase';
import { useNavigation } from '@react-navigation/native';

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');

  const navigation = useNavigation();

  const handleForgetPassword = async () => {
    try {
      const { data, error } = await supabase
        .from('Alunos')
        .select('email')
        .eq('email', email)
        .single();

      if (error || !data) {
        setMessage('Email não encontrado. Verifique o e-mail digitado.');
        setMessageColor('red');
        return;
      }

      setMessage('Uma mensagem de recuperação foi enviada para o seu e-mail.');
      setMessageColor('green');
    } catch (error) {
      console.error('Erro inesperado:', error);
      setMessage('Ocorreu um erro. Tente novamente.');
      setMessageColor('red');
    }
  };

  return (
    <ImageBackground source={fundo} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Redefinir Senha</Text>

          <Image style={styles.logo} source={UVv_Logo} />

          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
          />

          {message ? (
            <Text style={[styles.message, { color: messageColor }]}>
              {message}
            </Text>
          ) : null}

          <TouchableOpacity style={styles.button} onPress={handleForgetPassword}>
            <Text style={styles.buttonText}>Enviar e-mail de redefinição</Text>
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
  title: {
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
    backgroundColor: '#a9bbcf',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
});
