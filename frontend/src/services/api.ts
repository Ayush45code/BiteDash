import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const foodAPI = {
  listFood: async () => {
    const response = await api.get('/food/list');
    return response.data;
  },
};

export const orderAPI = {
  createOrder: async (orderData: any) => {
    const response = await api.post('/order/create', orderData);
    return response.data;
  },
};

export const userAPI = {
  register: async (userData: any) => {
    const response = await api.post('/user/register', userData);
    return response.data;
  },
  login: async (userData: any) => {
    const response = await api.post('/user/login', userData);
    return response.data;
  },
};

export const getImageUrl = (imageUrl: string) => {
  // If it's already a full URL (Cloudinary), return as-is
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  // Fallback for old local images
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
  return `${baseUrl.replace('/api', '')}/images/${imageUrl}`;
};
