'use client';
import { Icon } from '@iconify/react';

export default function SplashPage() {
  const link = `https://accounts.google.com/o/oauth2/v2/auth?client_id=526903298668-in7ec446ogrb9ji9u5vendfcb433dp5d.apps.googleusercontent.com&redirect_uri=http://localhost:3000/oauth/callback/google&response_type=code&scope=email profile`;
  const loginHandler = () => {
    window.location.href = link;
  };

  return (
    <div
      className='relative flex min-h-screen flex-col items-center justify-center bg-cover bg-center bg-no-repeat text-center'
      style={{ backgroundImage: "url('/splashImage.png')" }}
    >
      <div className='w-80 rounded-lg bg-white/80 p-8 text-center'>
        <h1 className='animate-fade-in-up mb-3 text-4xl font-bold text-emerald-500 sm:text-6xl'>
          Silver Bridge
        </h1>
      </div>
      <button
        onClick={loginHandler}
        className='bottom-8 mb-10 flex w-64 items-center justify-center rounded-lg bg-slate-100 py-3 font-semibold text-black transition duration-200 hover:bg-emerald-300'
      >
        <span className='flex items-center'>
          <Icon icon='flat-color-icons:google' className='mr-2 h-6 w-6' />
          Google로 로그인
        </span>
      </button>
    </div>
  );
}
