'use client';

import GoogleLogin from '@/app/login/_components/GoogleAuthButton';
import Image from 'next/image';

export default function SplashPage() {
  return (
    <div
      className='relative flex min-h-screen flex-col items-center justify-center bg-cover bg-center bg-no-repeat text-center'
      style={{ backgroundImage: "url('/splashImage.png')" }}
    >
      <Image
        src='/logo.png'
        alt='Silver Bridge Logo'
        width={80}
        height={80}
        className='mb-4'
      />

      <h1 className='text-3xl font-bold text-emerald-500 sm:text-4xl'>
        Silver Bridge
      </h1>

      <div className='absolute bottom-20'>
        <GoogleLogin />
      </div>
    </div>
  );
}
