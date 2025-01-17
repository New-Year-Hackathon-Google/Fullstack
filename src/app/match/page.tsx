'use client';

import Link from 'next/link';

export default function MatchPage() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md rounded-lg bg-white p-8 text-center shadow-md'>
        <h1 className='mb-6 text-2xl font-bold text-gray-800'>
          Select Your Path
        </h1>
        <p className='mb-8 text-gray-600'>
          Choose the role that best describes you to proceed:
        </p>
        <div className='space-y-4'>
          <Link
            href='/match/farmer'
            className='block w-full rounded-lg bg-green-500 py-3 text-lg font-semibold text-white transition hover:bg-green-600'
          >
            Farmer
          </Link>
          <Link
            href='/match/youth'
            className='block w-full rounded-lg bg-blue-500 py-3 text-lg font-semibold text-white transition hover:bg-blue-600'
          >
            Youth
          </Link>
        </div>
      </div>
    </div>
  );
}
