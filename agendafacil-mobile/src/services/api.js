import axios from "axios";

// Cria uma instância do axios com configuração base
const api = axios.create({

  // URL do seu backend Spring Boot
  baseURL: "http://192.168.0.155:8080",
  
  // Timeout evita travar requisições infinitas
  timeout: 10000,
});