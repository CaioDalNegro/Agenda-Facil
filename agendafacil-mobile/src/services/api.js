import axios from "axios";

// Cria uma instância do axios com URL base do backend
const api = axios.create({
  baseURL: "http://192.168.0.187:8080", // IP da sua máquina (backend Spring Boot)
  timeout: 10000, // evita travar requisições infinitas
});

// Exportação padrão correta
export default api;