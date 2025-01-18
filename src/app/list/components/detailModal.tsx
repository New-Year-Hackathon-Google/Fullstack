import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  Activity,
  Heart,
  Thermometer,
  Droplets,
  Droplet,
  Pill,
  ClipboardCheck,
  CheckCheck,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { GetHistory } from '@/app/api/detailList/route';

const historyEx = {
  heartRate: '78',
  bloodHighPressure: '120',
  bloodLowPressure: '78',
  temperature: '36.5',
  oxygenLevel: '98',
  bloodSugar: '100',
  drugHistory: '두통약, 소화제',
  notes: '배부름을 호소하심',
  status: '양호',
};

const DetailModal = () => {
  const pathname = usePathname();
  const patientId = Number(pathname.split('/').pop());

  const { data: history } = useQuery({
    queryKey: [patientId],
    queryFn: () => GetHistory(patientId),
  });

  const VitalSignCard = ({
    icon: Icon,
    title,
    value,
  }: {
    icon: React.ElementType;
    title: string;
    value: string | number;
  }) => {
    const getUnit = (title: string) => {
      if (title === '심박수') return ' bpm';
      if (title === '혈압') return ' mmHg';
      if (title === '체온') return ' °C';
      if (title === '산소포화도') return ' %';
      if (title === '혈당') return ' mg/dL';
      return '';
    };

    return (
      <div className='rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-4 transition-all hover:shadow-md'>
        <div className='mb-2 flex items-center gap-2 text-gray-600'>
          <Icon className='h-5 w-5 text-blue-500' />
          <span className='font-medium'>{title}</span>
        </div>
        <p className='text-xl font-bold text-gray-900'>
          {value}
          {getUnit(title)}
        </p>
      </div>
    );
  };

  return (
    <div className='overflow-hidden rounded-sm bg-white p-4 shadow-md'>
      <div className='grid grid-cols-2 gap-4'>
        <VitalSignCard
          icon={CheckCheck}
          title='건강 상태'
          value={history.status}
        />
        <VitalSignCard icon={Heart} title='심박수' value={history.heartRate} />
        <VitalSignCard
          icon={Activity}
          title='혈압'
          value={history.bloodHighPressure / history.bloodLowPressure}
        />
        <VitalSignCard
          icon={Thermometer}
          title='체온'
          value={history.temperature}
        />
        <VitalSignCard
          icon={Droplets}
          title='산소포화도'
          value={history.oxygenLevel}
        />
        <VitalSignCard icon={Droplet} title='혈당' value={history.bloodSugar} />
      </div>
      <div className='mt-4 grid gap-4'>
        <VitalSignCard
          icon={Pill}
          title='복용약'
          value={history.drugHistory || ''}
        />
        <VitalSignCard
          icon={ClipboardCheck}
          title='특이사항'
          value={history.notes || ''}
        />
      </div>
    </div>
  );
};

export default DetailModal;
