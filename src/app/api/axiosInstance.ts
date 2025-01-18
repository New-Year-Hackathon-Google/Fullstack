import axios from 'axios';

const token = '';

export const axiosInstance = axios.create({
  baseURL: 'http://backya.duckdns.org:8080',
  headers: {
    Authorization: `${token}`,
  },
  withCredentials: true,
});

export default axiosInstance;
