import Link from 'next/link';
import MobileDropdown from './MobileDropdown';

const navItems = [
  { title: '홈', href: '/' },
  { title: '소개', href: '/about' },
  { title: '프로그램', href: '/program' },
  { title: '매칭 서비스', href: '/match' },
];

const Navbar = () => {
  return (
    <nav className='w-full bg-white px-4 shadow-md'>
      <div className='flex h-16 items-center justify-between'>
        <div className=''>
          <Link href='/' className='text-xl font-bold text-gray-800'>
            Logo
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className='hidden flex-1 items-center justify-center space-x-8 md:flex'>
          {navItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className='rounded-md px-3 font-bold text-gray-600 hover:text-gray-900'
            >
              {item.title}
            </Link>
          ))}
        </div>
        <MobileDropdown />

        <div className='hidden items-center md:flex'>
          <Link
            href='/login'
            className='rounded-xl bg-blue-400 p-3 font-semibold text-white duration-200 hover:scale-110'
          >
            로그인
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
