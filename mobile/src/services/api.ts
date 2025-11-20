import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define a URL base.
// IMPORTANTE: Para Android Emulator use 'http://10.0.2.2:3000'
// Para iOS Simulator use 'http://localhost:3000'
// Para dispositivo físico na mesma rede, use o IP da sua máquina (ex: 'http://192.168.1.5:3000')
// Aqui estamos usando uma lógica simples para tentar detectar ou deixar configurável via variável se possível,
// mas hardcoded para desenvolvimento local é comum inicialmente.

// Alterar conforme necessário para o seu ambiente de teste
const API_URL = 'http://10.0.2.2:3000';

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('user_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
