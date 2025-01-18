'use client';

import { useState } from 'react';
import DetailModal from './detailModal';
import Image from 'next/image';

interface DateListProps {
  date: string;
  status: string;
}

export default function DateList({ date, status }: DateListProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = () => {
    setModalOpen((prev) => !prev);
  };

  const statusClass = (() => {
    if (status === '위험') return 'bg-red-600';
    if (status === '주의') return 'bg-orange-500';
    if (status === '양호') return 'bg-yellow-400';
    if (status === '좋음') return 'bg-green-500';
  })();

  return (
    <div>
      <div
        onClick={handleChange}
        className='flex items-center justify-between rounded-lg border-2 border-emerald-400 p-4 shadow-md'
      >
        <div className={`h-4 w-4 rounded-full ${statusClass} mr-4`} />

        <div className='flex-1 text-left text-sm font-medium text-gray-600'>
          {date}
        </div>

        <Image
          src='/chevDown.png'
          alt='down arrow'
          width={16}
          height={16}
          className='ml-4'
        />
      </div>
      {modalOpen && <DetailModal />}
    </div>
  );
}
