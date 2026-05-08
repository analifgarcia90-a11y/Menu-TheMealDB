import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

export default function Lista() {
  const [platillos, setPlatillos] = useState([]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => {
        if (data.meals) {
          const listaPlatillos = data.meals.map((item, index) => ({
            id: index.toString(),
            nombre: item.strMeal,
            imagen: item.strMealThumb,
          }));
          setPlatillos(listaPlatillos);
        }
      })
      .catch((error) => console.error('Error al obtener platillos:', error));
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {platillos.map((platillo) => (
        <View key={platillo.id} style={styles.contenedor1}>
          <Text style={styles.texto}> {platillo.nombre}</Text>
          <Image style={styles.imagen} source={{ uri: platillo.imagen }} />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 10,
  },
  contenedor1: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe4e1', // rosa pastel
    borderRadius: 8,
    marginBottom: 12,
    padding: 15,
    borderWidth: 2,
    borderColor: '#00bcd4', // azul suave neón
    shadowColor: '#ff1493',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  texto: {
    fontSize: 18,
    fontFamily: 'Courier New',
    fontWeight: '600',
    marginBottom: 10,
    color: '#ff1493', // rosa neón
    textShadowColor: '#00ffff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  imagen: {
    width: 180,
    height: 110,
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#00ffff',
  },
});
