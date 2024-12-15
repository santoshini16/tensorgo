import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3000",
    // withCredentials: true,
});

export const googleAuth = (code) => api.get(`/auth/google?code=${code}`);

export const register = async (userData) => {
  try {
    const response = await api.post(`/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error during registration API call:', error.response?.data || error.message);
    throw error; 
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post(`/auth/login`, credentials);
    return response.data; 
  } catch (error) {
    console.error('Error during login API call:', error.response?.data || error.message);
    throw error; 
  }
};