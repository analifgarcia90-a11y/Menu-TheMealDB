import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Inicio from './components/Inicio';
import Azar from './components/Azar';
import Consulta from './components/Consulta';
import Listas from './components/Listas';
import Categorias from './components/Categorias';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Inicio" component={Inicio} />
        <Tab.Screen name="Aleatorio" component={Azar} />
        <Tab.Screen name="Consulta" component={Consulta} />
        <Tab.Screen name="Listas" component={Listas} />
        <Tab.Screen name="Categorias" component={Categorias} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
