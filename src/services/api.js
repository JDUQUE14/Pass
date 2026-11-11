import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// URL base (recuerda cambiar la IP si usas dispositivo físico)
 const API_URL = 'http://10.0.2.2:8000/api/v1';

// 1. Iniciar sesión y guardar el token
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    
    const token = response.data.access_token;
    await AsyncStorage.setItem('user_token', token);
    return response.data;
  } catch (error) {
    // Imprime el error exacto en la consola de React Native para depurar
    console.log("DETALLE DEL ERROR DE API:", error.response || error.message);
    throw error.response?.data?.detail || 'Error al iniciar sesión';
  }
};

// 2. Obtener los carnets del usuario autenticado
export const getUserCards = async () => {
  try {
    // Recuperamos el token guardado
    const token = await AsyncStorage.getItem('user_token');
    
    const response = await axios.get(`${API_URL}/cards`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response.data; // Devuelve la lista de carnets de la BD
  } catch (error) {
    throw error.response?.data?.detail || 'Error al obtener los carnets';
  }
};

// 3. Vincular un nuevo carnet
export const createCard = async (cardData) => {
  try {
    const token = await AsyncStorage.getItem('user_token');
    
    const response = await axios.post(`${API_URL}/cards/link`, cardData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Error al vincular el carnet';
  }
};

// Obtener el historial de accesos del usuario
export const getAccessLogs = async () => {
  try {
    const token = await AsyncStorage.getItem('user_token');
    
    const response = await axios.get(`${API_URL}/access-logs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response.data; // Retorna la lista de registros de acceso
  } catch (error) {
    throw error.response?.data?.detail || 'Error al obtener el historial de accesos';
  }
};

// Registrar un nuevo acceso en el historial
export const createAccessLog = async (logData) => {
  try {
    const token = await AsyncStorage.getItem('user_token');
    
    const response = await axios.post(`${API_URL}/access-logs`, logData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Error al registrar el acceso';
  }
};