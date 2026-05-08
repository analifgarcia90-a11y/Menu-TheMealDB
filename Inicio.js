import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function Home() {
  return (
    <View style={styles.contenedor1}>
      <Image
         source={require('../assets/meal.png')}
        style={styles.imagen}
      />
      <Text style={styles.texto}>The Meal DB</Text>
      <Text style={styles.texto2}>Autor: Anali Garcia</Text>
      <Text style={styles.texto2}>Grupo: 6P</Text>
      <Text style={styles.texto2}>Esta app te permite explorar todos los platillos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor1: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe4e1', 
    marginBottom: 10,
    padding: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#00bcd4', 
    shadowColor: '#ff1493',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  texto: {
    fontSize: 22,
    fontFamily: 'Courier New',
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ff1493', // rosa neón
    textShadowColor: '#00ffff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  texto2: {
    fontSize: 18,
    fontFamily: 'Courier New',
    color: '#2f4f4f',
    backgroundColor: '#fafad2',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ff69b4',
    marginBottom: 5,
  },
  imagen: {
    width: 200,
    height: 120,
    marginBottom: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#00ffff',
  },
});
