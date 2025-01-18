import GoogleAuthButton from '@/app/login/_components/GoogleAuthButton';
import Image from 'next/image';

export default function SplashPage() {
  return (
    <div
      className='relative flex h-[calc(100vh-4rem)] flex-col items-center justify-center bg-cover bg-center bg-no-repeat text-center'
      style={{ backgroundImage: "url('/splashImage.webp')" }} // 배경 이미지 설정
    >
      <Image
        src='/logo.png' // 로고 이미지 경로
        alt='Silver Bridge Logo'
        width={80} // 로고 너비
        height={80} // 로고 높이
        className='mb-4' // 아래 여백
      />

      <h1 className='text-3xl font-bold text-emerald-500 sm:text-4xl'>
        Silver Bridge
      </h1>

      <div className='absolute bottom-20'>
        <GoogleAuthButton />
      </div>
    </div>
  );
}
