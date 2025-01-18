'use client';

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://backya.duckdns.org:8080', // 백엔드 URL
  withCredentials: true, // 쿠키 포함
});

// Interceptor 설정
apiClient.interceptors.response.use(
  (response) => {
    const authHeader = response.headers['authorization'];
    if (authHeader && authHeader.startsWith('BEARER ')) {
      const token = authHeader.split(' ')[1];
      localStorage.setItem('jwt', token);
      console.log('JWT Token saved:', token);
    }
    return response;
  },
  (error) => {
    console.error('Error in response:', error);
    return Promise.reject(error);
  },
);

const GoogleLogin = () => {
  const handleLogin = async () => {
    try {
      const response = await apiClient.get('/oauth2/authorization/google');
      console.log('Login response:', response.data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className='rounded-3xl bg-blue-400 p-3 font-bold text-white duration-200 hover:scale-110'
    >
      Login with Google
    </button>
  );
};

export default GoogleLogin;
