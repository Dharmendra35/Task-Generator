import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const register = async (name, email, password, confirmPassword) => {
  const response = await api.post('/auth/register', { name, email, password, confirmPassword });
  return response.data;
};

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Spec endpoints
export const generateSpec = async (formData) => {
  const response = await api.post('/spec/generate', formData);
  return response.data;
};

export const getRecentSpecs = async () => {
  const response = await api.get('/spec/recent');
  return response.data;
};

export const updateSpec = async (id, updates) => {
  const response = await api.put(`/spec/${id}`, updates);
  return response.data;
};

export const deleteSpec = async (id) => {
  const response = await api.delete(`/spec/${id}`);
  return response.data;
};
