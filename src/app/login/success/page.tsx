'use client';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    async function handleAuth() {
      try {
        const accessToken = searchParams.get('accessToken');

        if (!accessToken) {
          console.error('accessToken not found');
          router.replace('/login');
          return;
        }

        console.log('토큰 테스트@@@@@@@@@', accessToken);

        localStorage.setItem('accessToken', accessToken);

        const res = await axios.get(
          'http://backya.duckdns.org:8080/api/v1/member/me',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        localStorage.setItem('user', JSON.stringify(res.data));
      } catch (error) {
        console.error('Auth error:', error);
        router.replace('/login');
      }
    }

    handleAuth();
  }, [router, searchParams]);

  return (
    <div className='flex h-screen items-center justify-center'>
      <p className='text-xl'>로그인 중...</p>
    </div>
  );
}
