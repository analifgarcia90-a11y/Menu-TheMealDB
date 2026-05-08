import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';

export default function Categorias() {
  const [categoriaTexto, setCategoriaTexto] = useState('');
  const [categoriaFiltrada, setCategoriaFiltrada] = useState('');
  const [platillos, setPlatillos] = useState([]);
  const [noResultados, setNoResultados] = useState(false);

  const manejarBusqueda = async () => {
    if (!categoriaTexto.trim()) return;

    setCategoriaFiltrada(categoriaTexto);
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoriaTexto}`);
      const data = await res.json();

      if (!data.meals || data.meals.length === 0) {
        setPlatillos([]);
        setNoResultados(true);
        return;
      }

      const platillosFiltrados = data.meals.map((platillo, index) => ({
        id: index.toString(),
        nombre: platillo.strMeal,
        imagen: platillo.strMealThumb,
      }));

      setPlatillos(platillosFiltrados);
      setNoResultados(false);
    } catch (error) {
      console.error('Error al buscar platillos por categoría:', error);
      setPlatillos([]);
      setNoResultados(true);
    }
  };

  return (
    <ScrollView>
      <View style={styles.contenedor2}>
        <Text style={styles.texto}>Consulta la Categoría de los Platillo</Text>
        <TextInput
          style={styles.input}
          placeholder="..."
          placeholderTextColor="#e5be7f"
          onChangeText={setCategoriaTexto}
          value={categoriaTexto}
        />
        <TouchableOpacity style={styles.boton} onPress={manejarBusqueda}>
          <Text style={styles.botonTexto}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {categoriaFiltrada !== '' && (
        <>
          {noResultados ? (
            <View style={styles.contenedor1}>
              <Text>{'\n'}</Text>
              <Text>Sin resultados</Text>
            </View>
          ) : (
            platillos.map((platillo) => (
              <View key={platillo.id} style={styles.contenedor1}>
                <Text>{'\n'}</Text>
                <Image style={styles.imagen} source={{ uri: platillo.imagen }} />
                <Text style={styles.texto2}> {platillo.nombre} </Text>
              </View>
            ))
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor1: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe4e1', // rosa pastel retro
    marginBottom: 10,
    padding: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#00bcd4', // azul neón suave
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
  },
  imagen: {
    width: 200,
    height: 120,
    marginBottom: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#00ffff',
  },
  contenedor2: {
    backgroundColor: '#fff8dc',
    padding: 15,
    borderBottomWidth: 4,
    borderBottomColor: '#ff69b4',
  },
  input: {
    height: 45,
    borderColor: '#00bcd4',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#ff69b4',
    fontFamily: 'Courier New',
    fontSize: 14,
    backgroundColor: '#fff0f5',
    marginBottom: 12,
  },
  boton: {
    backgroundColor: '#ff1493',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#00ffff',
    alignItems: 'center',
    shadowColor: '#00bcd4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  botonTexto: {
    color: '#fffaf0',
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'Courier New',
    textTransform: 'uppercase',
  },
});
