import React from 'react';
import DateList from '../components/dateList';
import { GetHistory } from '@/app/api/detailList/route';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';

interface DateListProps {
  createdAt: string;
  status: string;
}

function List() {
  const pathname = usePathname();
  const patientId = Number(pathname.split('/').pop());
  const router = useRouter();

  const handleClick = () => {
    router.push(`/patient/${patientId}`);
  };

  const { data: history } = useQuery({
    queryKey: [patientId],
    queryFn: () => GetHistory(patientId),
  });

  console.log('history data: ', history);

  return (
    <div className='relative'>
      <button
        onClick={handleClick}
        className='absolute right-4 top-4 h-10 rounded-lg bg-emerald-400 px-4 font-semibold text-white shadow-lg'
      >
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
