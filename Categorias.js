import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

export default function CategoriaFilterLista() {
  const [platillos, setPlatillos] = useState([]);
  const [categoria, setCategoria] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!categoria) return;

    setLoading(true);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.meals) {
          const platillosFiltrados = data.meals.map((platillo, index) => ({
            id: index.toString(),
            nombre: platillo.strMeal,
            imagen: platillo.strMealThumb,
          }));
          setPlatillos(platillosFiltrados);
        } else {
          setPlatillos([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener platillos:', error);
        setLoading(false);
      });
  }, [categoria]);

  return (
    <View style={styles.contenedor2}>
      <View style={{ flex: 1, padding: 10 }}>
        <View style={styles.botones}>
          <TouchableOpacity
            style={styles.boton}
            onPress={() => setCategoria('Dessert')}
          >
            <Text style={styles.botonTexto}>Dessert</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.boton}
            onPress={() => setCategoria('Chicken')}
          >
            <Text style={styles.botonTexto}>Chicken</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#ff1493" />
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {platillos.map((platillo) => (
              <View key={platillo.id} style={styles.contenedor1}>
                <Text style={styles.texto}> {platillo.nombre}</Text>
                <Image style={styles.imagen} source={{ uri: platillo.imagen }} />
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  boton: {
    backgroundColor: '#ff69b4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#00ffff',
    shadowColor: '#ff1493',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  botonTexto: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Courier New',
    textShadowColor: '#00ffff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  contenedor1: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe4e1', // rosa pastel
    borderRadius: 10,
    marginBottom: 12,
    padding: 15,
    borderWidth: 2,
    borderColor: '#00bcd4',
    shadowColor: '#ff1493',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  contenedor2: {
    backgroundColor: '#fff0f5',
    flex: 1,
  },
  texto: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Courier New',
    marginBottom: 10,
    color: '#ff1493',
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
