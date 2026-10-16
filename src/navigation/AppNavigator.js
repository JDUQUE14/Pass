import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Inicio from '../screens/Inicio';
import DetalleNFC from '../screens/DetalleNFC';
import VincularCarnet from '../screens/VincularCarnet';
import HistorialAjustes from '../screens/HistorialAjustes';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Inicio" component={Inicio} />
      <Stack.Screen name="DetalleNFC" component={DetalleNFC} />
      <Stack.Screen name="VincularCarnet" component={VincularCarnet} />
      <Stack.Screen name="HistorialAjustes" component={HistorialAjustes} />
    </Stack.Navigator>
  );
}