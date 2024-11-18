import React from 'react';
import { Text, SafeAreaView, StyleSheet, ImageBackground } from 'react-native';

export default function MainPage() {
  return (
    <ImageBackground source={require('../assets/fundo.png')} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.container}>
        <Text style={styles.successMessage}>Login realizado com sucesso</Text>
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
  successMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});
