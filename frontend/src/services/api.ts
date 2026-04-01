import axios from 'axios';

const API_BASE_URL = 'https://bitedash-backend-v48h.onrender.com/api';

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
  listOrders: async () => {
    const response = await api.get('/order/list');
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
  // If it's a Cloudinary URL, return as-is
  if (imageUrl.includes('cloudinary.com')) {
    return imageUrl;
  }
  // If it's an old localhost URL, extract filename
  if (imageUrl.includes('localhost')) {
    const filename = imageUrl.split('/').pop();
    if (filename) {
      const baseUrl = 'https://bitedash-backend-v48h.onrender.com';
      return `${baseUrl}/images/${filename}`;
    }
  }
  // If it's already a full URL (other https), return as-is
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  // Fallback for old local images (just filename like "food_2.jpg")
  const baseUrl = 'https://bitedash-backend-v48h.onrender.com';
  return `${baseUrl}/images/${imageUrl}`;
};
