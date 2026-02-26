import axios from 'axios';

const AUTH_BASE_URL = 'https://dummyjson.com';
const PRODUCTS_BASE_URL = 'https://fakestoreapi.com';

const authApi = axios.create({
  baseURL: AUTH_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const productsApi = axios.create({
  baseURL: PRODUCTS_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUser = async (username, password) => {
  const response = await authApi.post('/auth/login', {
    username,
    password,
    expiresInMins: 1440,
  });
  return response.data;
};

export const fetchProducts = async () => {
  const response = await productsApi.get('/products');
  return response.data;
};

export default { loginUser, fetchProducts };
