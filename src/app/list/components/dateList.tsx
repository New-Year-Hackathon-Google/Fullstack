'use client';

import { useState } from 'react';
import DetailModal from './detailModal';

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
    else 'bg-gray-500';
  })();

  return (
    <div>
      <div
        onClick={handleChange}
        className='flex items-center justify-between rounded-lg border-2 border-emerald-400 p-4 shadow-md'
      >
        <div className={`h-4 w-4 rounded-full ${statusClass} mr-4`} />
        <div className='w-24 text-left text-sm font-medium text-gray-500'>
          {date}
        </div>
      </div>
      {modalOpen && <DetailModal />}
    </div>
  );
}
