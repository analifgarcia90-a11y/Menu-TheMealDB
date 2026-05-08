import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function PlatilloAzar() {
  const [platillo, setPlatillo] = useState(null);

  const obtenerPlatillo = () => {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then(res => res.json())
      .then(data => {
        if (data.meals && data.meals.length > 0) {
          setPlatillo(data.meals[0]);
        }
      })
      .catch(err => {
        console.error("Error al obtener el platillo:", err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Platillo al Azar </Text>

      {platillo && (
        <>
          <Image
            style={styles.imagen}
            source={{ uri: platillo.strMealThumb }}
          />
          <Text style={styles.nombre}> {platillo.strMeal}</Text>
        </>
      )}

      <TouchableOpacity style={styles.boton} onPress={obtenerPlatillo}>
        <Text style={styles.botonTexto}>GO</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe4e1', // rosa pastel retro
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00bcd4', // azul neón suave
    shadowColor: '#ff1493',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    margin: 10,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'Courier New',
    color: '#ff1493', // rosa neón
    marginBottom: 15,
    textShadowColor: '#00ffff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  nombre: {
    fontSize: 20,
    fontStyle: 'italic',
    fontFamily: 'Courier New',
    color: '#2f4f4f',
    backgroundColor: '#fafad2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ff69b4',
    marginBottom: 10,
    textAlign: 'center',
  },
  imagen: {
    width: 220,
    height: 220,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#00ffff',
    marginBottom: 12,
  },
  boton: {
    backgroundColor: '#ff1493',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00ffff',
    shadowColor: '#00bcd4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    marginTop: 10,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fffaf0',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Courier New',
    textTransform: 'uppercase',
  },
});
