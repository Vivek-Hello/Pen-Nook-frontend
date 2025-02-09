// utils/axiosConfig.js
import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true // Crucial for cookies
});

export default axiosConfig;