import { Icon } from '@iconify/react';
import Link from 'next/link';

export default function GoogleAuthButton() {
  return (
    <Link
      href='http://backya.duckdns.org:8080/oauth2/authorization/google'
      className='bottom-8 mb-10 flex w-64 items-center justify-center rounded-lg bg-slate-100 py-3 font-semibold text-black transition duration-200 hover:bg-emerald-300'
    >
      <span className='flex items-center'>
        <Icon icon='flat-color-icons:google' className='mr-2 h-6 w-6' />
        Google로 로그인
      </span>
    </Link>
  );
}
