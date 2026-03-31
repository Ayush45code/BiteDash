import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const foodAPI = {
  addFood: async (formData: FormData) => {
    const response = await api.post('/food/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  listFood: async () => {
    const response = await api.get('/food/list');
    return response.data;
  },

  removeFood: async (id: string) => {
    const response = await api.post('/food/remove', { id });
    return response.data;
  },
};

export const orderAPI = {
  listOrders: async () => {
    const response = await api.get('/order/list');
    return response.data;
  },

  updateOrderStatus: async (orderId: string, status: string) => {
    const response = await api.post('/order/update-status', { orderId, status });
    return response.data;
  },

  deleteOrder: async (orderId: string) => {
    const response = await api.post('/order/delete', { orderId });
    return response.data;
  },
};

export const getImageUrl = (imageName: string) => {
  return `http://localhost:3000/images/${imageName}`;
};
