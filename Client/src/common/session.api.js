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

export const addAccountToSessionAPI = async (sessionId, accountData) => {
  const response = await api.post(`/${sessionId}/accounts`, accountData);
  return response.data;
};

export const updateAccountAPI = async (accountId, accountData) => {
  const response = await api.patch(`/accounts/${accountId}`, accountData);
  return response.data;
};

export const deleteAccountAPI = async (accountId) => {
  const response = await api.delete(`/accounts/${accountId}`);
  return response.data;
};
