import axios from 'axios';

// For Vercel deployment, API is at the same domain
const API_URL = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

// Public APIs
export const getMachines = () => api.get('/machines');
export const getMachineBySlug = (slug) => api.get(`/machines/${slug}`);
export const getMachinesByCategory = (category) => api.get(`/machines/category/${category}`);

// Admin APIs
export const adminLogin = (credentials) => api.post('/admin/login', credentials);

// Get token from localStorage
const getToken = () => {
  return localStorage.getItem('adminToken');
};

// Admin authenticated requests
export const getMachinesAdmin = () => {
  const token = getToken();
  return api.get('/admin/machines', {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const createMachine = (data) => {
  const token = getToken();
  return api.post('/admin/machines', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const updateMachine = (id, data) => {
  const token = getToken();
  return api.put(`/admin/machines/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const deleteMachine = (id) => {
  const token = getToken();
  return api.delete(`/admin/machines/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const uploadImage = (formData) => {
  const token = getToken();
  return api.post('/admin/upload', formData, {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
};

export default api;

