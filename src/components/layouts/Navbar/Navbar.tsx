'use client';

import Link from 'next/link';
import MobileDropdown from './MobileDropdown';
import { useEffect, useState } from 'react';

const navItems = [
  { title: '홈', href: '/' },
  { title: '소개', href: '/about' },
  { title: '서비스', href: '/guardian' },
];

const Navbar = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    // localStorage에서 사용자 정보 가져오기
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // 사용자 정보를 상태에 저장
    }
  }, []);

  const handleLogout = () => {
    // localStorage에서 사용자 정보 제거
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <nav className='w-full bg-white px-4 shadow-md'>
      <div className='flex h-16 items-center justify-between'>
        <div className=''>
          <Link
            href='/'
            className='hidden text-xl font-bold text-emerald-500 sm:block'
          >
            Silver Bridge
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className='hidden flex-1 items-center justify-center space-x-8 md:flex'>
          {navItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className='rounded-md px-3 text-lg font-bold text-gray-600 hover:text-gray-900'
            >
              {item.title}
            </Link>
          ))}
        </div>
        <MobileDropdown />

        <div className='hidden items-center md:flex'>
          {user ? (
            <div className='flex items-center space-x-4'>
              <span className='text-gray-800'>안녕하세요, {user.name}님</span>
              <button
                onClick={handleLogout}
                className='rounded-xl bg-red-400 p-3 font-semibold text-white duration-200 hover:scale-110 hover:bg-red-500'
              >
                로그아웃
              </button>
            </div>
          ) : (
            <Link
              href='/login'
              className='rounded-xl bg-blue-400 p-3 font-semibold text-white duration-200 hover:scale-110 hover:bg-blue-500'
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
