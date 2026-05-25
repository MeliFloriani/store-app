import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  // La cookie httpOnly viaja automáticamente; store-app no arma cabeceras de autorización manuales.
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})
