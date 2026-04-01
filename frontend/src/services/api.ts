import axios from 'axios';

// Force redeploy - fix image URLs

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
  console.log('getImageUrl input:', imageUrl);
  
  // If it's a Cloudinary URL, return as-is
  if (imageUrl.includes('cloudinary.com')) {
    console.log('Returning Cloudinary URL');
    return imageUrl;
  }
  // If it's an old localhost URL, convert to use proper backend URL
  if (imageUrl.includes('localhost')) {
    console.log('Converting localhost URL');
    const filename = imageUrl.split('/').pop();
    if (filename) {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
      const result = `${baseUrl.replace('/api', '')}/images/${filename}`;
      console.log('Converted to:', result);
      return result;
    }
  }
  // If it's already a full URL (other https), return as-is
  if (imageUrl.startsWith('http')) {
    console.log('Returning existing HTTP URL');
    return imageUrl;
  }
  // Fallback for old local images (just filename like "food_2.jpg")
  console.log('Using fallback for filename');
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
  const result = `${baseUrl.replace('/api', '')}/images/${imageUrl}`;
  console.log('Fallback result:', result);
  return result;
};
