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

        localStorage.setItem('accessToken', accessToken);

        const res = await axios.get('/api/authInfo', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        localStorage.setItem('user', JSON.stringify(res.data));

        router.replace('/');
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
