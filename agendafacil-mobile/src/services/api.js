import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Cria uma instância do axios com URL base do backend
const api = axios.create({
  baseURL: "http://192.168.0.187:8080", // IP da sua máquina (backend Spring Boot)
  timeout: 10000, // evita travar requisições infinitas
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("@token");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      console.warn("API request denied (403):", error.config?.url);
    }
    return Promise.reject(error);
  }
);

// Exportação padrão correta
export default api;