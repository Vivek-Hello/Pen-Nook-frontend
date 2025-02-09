// utils/axiosConfig.js
import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true // Crucial for cookies
});

export default axiosConfig;