import Image from 'next/image';
import Link from 'next/link';

export default function GoogleAuthButton() {
  return (
    <Link
      href='https://dev.silver-bridge.kr/oauth2/authorization/google'
      className='flex w-[400px] transform items-center justify-center gap-2 rounded-2xl bg-blue-200 p-2 text-[20px] font-semibold text-white duration-200 hover:scale-110'
    >
      <Image
        src='/GoogleLogo.webp'
        alt='Google-Logo'
        width={40}
        height={40}
        className='flex items-center justify-center rounded-full'
      />
      Google Login
    </Link>
  );
}
