import React from 'react';
import DateList from '../components/dateList';
import { GetHistory } from '@/app/api/detailList/route';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

const DateLists = [
  { date: '2024-01-16', status: '양호' },
  { date: '2021-12-12', status: '나쁨' },
];

interface DateListProps {
  createdAt: string;
  status: string;
}

function List() {
  const pathname = usePathname(); // 현재 URL 경로 가져오기
  const patientId = Number(pathname.split('/').pop());

  const {
    data: history,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => GetHistory(patientId),
    queryKey: ['history', patientId],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }

  return (
    <div className='relative'>
      <button className='absolute right-4 top-4 h-10 rounded-lg bg-emerald-400 px-4 font-semibold text-white shadow-lg'>
        현재 상태 추가
      </button>
      <div className='flex min-h-screen flex-col gap-4 p-4 pt-20'>
        {history.map((content: DateListProps, index: number) => (
          <DateList
            date={content.createdAt}
            status={content.status}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default List;
