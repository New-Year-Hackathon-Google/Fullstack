import React from 'react';
import {
  Activity,
  Heart,
  TrendingUp,
  Thermometer,
  User,
  Calendar,
  Home,
  Droplets,
  UserRound,
} from 'lucide-react';

type StatusType = '안정적' | '주의' | '위험';

export default function PatientDashboard() {
  const patientInfo = {
    name: '김영희',
    dateOfBirth: 670327,
    roomNumber: '203',
    admissionDate: '2024-01-15',
    bloodType: 'A+',
    primaryDoctor: '이상혁',
  };

  const vitalSigns = {
    heartRate: '78 bpm',
    bloodPressure: '120/80 mmHg',
    temperature: '36.5°C',
    oxygenLevel: '98%',
    lastChecked: '15분 전',
  };

  const aiAnalysis = {
    currentStatus: '안정적' as StatusType,
    riskLevel: '낮음',
    predictions: [
      '혈압이 최근 1주일간 안정적으로 유지되고 있습니다.',
      '수면 패턴이 개선되고 있어 긍정적입니다.',
      '가벼운 운동을 시작해볼 것을 권장합니다.',
    ],
    recommendations: [
      '규칙적인 산책 시간 확보',
      '수분 섭취량 증가',
      '사회적 교류 활동 참여',
    ],
  };

  const StatusBadge = ({ status }: { status: StatusType }) => {
    const colors: Record<StatusType, string> = {
      안정적: 'bg-green-100 text-green-800',
      주의: 'bg-yellow-100 text-yellow-800',
      위험: 'bg-red-100 text-red-800',
    };

    return (
      <span
        className={`rounded-full px-3 py-1 text-sm font-medium ${colors[status]}`}
      >
        {status}
      </span>
    );
  };

  const VitalSignCard = ({
    icon: Icon,
    title,
    value,
  }: {
    icon: React.ElementType;
    title: string;
    value: string;
  }) => (
    <div className='rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-4 transition-all hover:shadow-md'>
      <div className='mb-2 flex items-center gap-2 text-gray-600'>
        <Icon className='h-5 w-5 text-blue-500' />
        <span className='font-medium'>{title}</span>
      </div>
      <p className='text-xl font-bold text-gray-900'>{value}</p>
    </div>
  );

  const infoIcons = {
    name: User,
    dateOfBirth: UserRound,
    roomNumber: Home,
    admissionDate: Calendar,
    bloodType: Droplets,
    primaryDoctor: UserRound,
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8'>
      <div className='mx-auto max-w-7xl'>
        <h1 className='mb-8 text-3xl font-bold text-gray-900'>
          환자 모니터링 대시보드
        </h1>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {/* 환자 정보 카드 */}
          <div className='overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl'>
            <div className='border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white p-4'>
              <h2 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
                <User className='h-5 w-5 text-blue-500' />
                <span>환자 정보</span>
              </h2>
            </div>
            <div className='p-6'>
              <dl className='space-y-3'>
                {Object.entries(patientInfo).map(([key, value]) => {
                  const Icon = infoIcons[key as keyof typeof infoIcons];
                  return (
                    <div
                      key={key}
                      className='flex items-center justify-between border-b border-gray-100 pb-2 last:border-0'
                    >
                      <dt className='flex items-center gap-2 font-medium text-gray-600'>
                        <Icon className='h-4 w-4 text-blue-400' />
                        {key === 'name'
                          ? '이름'
                          : key === 'dateOfBirth'
                            ? '생년원일'
                            : key === 'roomNumber'
                              ? '호실'
                              : key === 'admissionDate'
                                ? '입원일'
                                : key === 'bloodType'
                                  ? '혈액형'
                                  : '담당 간호사'}
                      </dt>
                      <dd className='font-semibold text-gray-900'>{value}</dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </div>

          {/* 현재 상태 카드 */}
          <div className='overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl'>
            <div className='border-b border-gray-200 bg-gradient-to-r from-green-50 to-white p-4'>
              <h2 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
                <Activity className='h-5 w-5 text-green-500' />
                <span>현재 상태</span>
              </h2>
            </div>
            <div className='p-6'>
              <div className='grid grid-cols-2 gap-4'>
                <VitalSignCard
                  icon={Heart}
                  title='심박수'
                  value={vitalSigns.heartRate}
                />
                <VitalSignCard
                  icon={Activity}
                  title='혈압'
                  value={vitalSigns.bloodPressure}
                />
                <VitalSignCard
                  icon={Thermometer}
                  title='체온'
                  value={vitalSigns.temperature}
                />
                <VitalSignCard
                  icon={Droplets}
                  title='산소포화도'
                  value={vitalSigns.oxygenLevel}
                />
              </div>
              <p className='mt-6 text-right text-sm text-gray-500'>
                마지막 측정: {vitalSigns.lastChecked}
              </p>
            </div>
          </div>
        </div>

        {/* AI 분석 카드 */}
        <div className='mt-6 overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl'>
          <div className='border-b border-gray-200 bg-gradient-to-r from-purple-50 to-white p-4'>
            <h2 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
              <TrendingUp className='h-5 w-5 text-purple-500' />
              <span>AI 분석 결과</span>
            </h2>
          </div>
          <div className='grid gap-6 p-6 md:grid-cols-3'>
            <div>
              <h3 className='mb-3 font-medium text-gray-700'>현재 상태</h3>
              <StatusBadge status={aiAnalysis.currentStatus} />
            </div>

            <div>
              <h3 className='mb-3 font-medium text-gray-700'>예측 분석</h3>
              <ul className='space-y-2'>
                {aiAnalysis.predictions.map((prediction, index) => (
                  <li
                    key={index}
                    className='flex items-start text-sm text-gray-600'
                  >
                    <span className='mr-2 text-purple-400'>•</span>
                    <span>{prediction}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className='mb-3 font-medium text-gray-700'>권장 사항</h3>
              <ul className='space-y-2'>
                {aiAnalysis.recommendations.map((recommendation, index) => (
                  <li
                    key={index}
                    className='flex items-start text-sm text-gray-600'
                  >
                    <span className='mr-2 text-purple-400'>•</span>
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
