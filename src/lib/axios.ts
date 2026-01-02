import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // VITE_API_URL=http://localhost:4000/api
});

// Antes de cada request se ejecuta para ver si esta autenticado 
api.interceptors.request.use((config) => {
  // obtenemos el token que esta guardado en localstorage
  const token = localStorage.getItem("AUTH_TOKEN");
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
});

export default api;
