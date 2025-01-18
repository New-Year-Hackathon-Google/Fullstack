'use client';

import axios from 'axios';
import { Icon } from '@iconify/react';

// Axios 인스턴스 생성 및 Interceptor 설정
const apiClient = axios.create({
  baseURL: 'http://backya.duckdns.org:8080', // 백엔드의 base URL
  withCredentials: true, // 쿠키가 필요하면 설정
});

// Response Interceptor 설정
apiClient.interceptors.response.use(
  (response) => {
    // Authorization 헤더에서 토큰 가져오기
    const authHeader = response.headers['authorization'];
    if (authHeader && authHeader.startsWith('BEARER ')) {
      const token = authHeader.split(' ')[1]; // BEARER 제거 후 토큰만 추출
      localStorage.setItem('jwt', token); // 로컬 스토리지에 저장
      console.log('JWT Token saved:', token);
    }
    return response; // 응답 반환
  },
  (error) => {
    // 에러 처리
    console.error('Error in response:', error);
    return Promise.reject(error);
  },
);

// React 컴포넌트
const GoogleLogin = () => {
  const handleLogin = async () => {
    try {
      // Google OAuth2 URL로 요청
      const response = await apiClient.get('/oauth2/authorization/google');
      console.log('Login response:', response.data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className='bottom-8 mb-10 flex w-64 items-center justify-center rounded-lg bg-slate-100 py-3 font-semibold text-black transition duration-200 hover:bg-emerald-300'
    >
      <span className='flex items-center'>
        <Icon icon='flat-color-icons:google' className='mr-2 h-6 w-6' />
        Google로 로그인
      </span>
    </button>
  );
};

export default GoogleLogin;
