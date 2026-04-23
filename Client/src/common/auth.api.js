import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: '/api/auth',
  withCredentials: true, // Important for sending/receiving cookies (JWT)
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerAPI = async (userData) => {
  const response = await api.post('/register', userData);
  return response.data;
};

export const loginAPI = async (credentials) => {
  const response = await api.post('/login', credentials);
  return response.data;
};

export const logoutAPI = async () => {
  const response = await api.post('/logout');
  return response.data;
};
