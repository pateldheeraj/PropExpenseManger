import axios from 'axios';

const api = axios.create({
  baseURL: '/api/sessions',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createSessionAPI = async (sessionData) => {
  const response = await api.post('/', sessionData);
  return response.data;
};

export const getSessionsAPI = async () => {
  const response = await api.get('/');
  return response.data;
};

export const getSessionByIdAPI = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};
