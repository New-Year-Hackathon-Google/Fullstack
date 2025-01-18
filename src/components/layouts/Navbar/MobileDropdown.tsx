'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

interface NavItem {
  title: string;
  href: string;
}

const navItems = [
  { title: '홈', href: '/' },
  { title: '소개', href: '/about' },
  { title: '서비스', href: '/guardian' },
];

export default function MobileDropdown() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', closeMenu);
    } else {
      document.removeEventListener('mousedown', closeMenu);
    }

    return () => {
      document.removeEventListener('mousedown', closeMenu);
    };
  }, [isOpen]);

  return (
    <div className='relative' ref={dropdownRef}>
      {/* 메뉴 토글 버튼 */}
      <div className='flex items-center md:hidden'>
        <button
          onClick={toggleMenu}
          className='inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500'
        >
          {isOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
        </button>
      </div>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className='absolute right-0 z-50 mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
          <div className='py-1'>
            {navItems.map((item, index) => (
              <div key={item.title}>
                <Link
                  href={item.href}
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                >
                  {item.title}
                </Link>
                {/* 마지막 아이템을 제외하고 구분선 추가 */}
                {index < navItems.length - 1 && (
                  <hr className='border-t border-gray-200' />
                )}
              </div>
            ))}
          </div>
          <Link
            href='/login'
            className='flex justify-center bg-blue-400 py-2 font-semibold text-white duration-200 hover:bg-blue-500'
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
}
