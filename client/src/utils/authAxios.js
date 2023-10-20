import axios from 'axios';
import Cookies from 'js-cookie';

//get current token from cookies
const getToken = () => Cookies.get('token');

// Create an Axios instance with a request interceptor
const authAxios = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_SERVER,
});

// Add Authorization token to header before each request
authAxios.interceptors.request.use(
  (config) => {
    // Get the current token from cookies and set it in the Authorization header
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default authAxios;
