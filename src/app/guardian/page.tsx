'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader, AlertCircle, Heart, User, Activity } from 'lucide-react';

type StatusType = '안정적' | '주의' | '위험';

interface HealthRecord {
  pulse: number;
  bloodSugar: number;
  bloodHighPressure: number;
  bloodLowPressure: number;
  temperature: number;
  bloodOxygen: number;
  drugHistory: string;
  notes: string;
  status: string;
}

interface Patient {
  id: number;
  name: string;
  dateOfBirth: string;
  height: number;
  weight: number;
  roomNumber: number;
  bloodType: string;
  nurseName: string;
}

export default function PatientDashboard() {
  const [healthRecord, setHealthRecord] = useState<HealthRecord | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [aiResponse, setAiResponse] = useState<string | null>('분석 중...');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataAndAnalyze = async () => {
      try {
        const patientId = '1'; // 예시 ID, 실제 사용 시 동적으로 설정
        const [patientResponse, healthResponse] = await Promise.all([
          axios.get(`/api/patients/${patientId}`),
          axios.get(`/api/healthStatus/${patientId}`),
        ]);

        setPatient(patientResponse.data);
        setHealthRecord(healthResponse.data);

        // AI 분석 요청
        const prompt = `
          환자의 건강 데이터를 바탕으로 상태를 분석해주세요:
          - 심박수: ${healthResponse.data.pulse} bpm
          - 혈압: ${healthResponse.data.bloodHighPressure}/${healthResponse.data.bloodLowPressure} mmHg
          - 혈당: ${healthResponse.data.bloodSugar} mg/dL
          - 체온: ${healthResponse.data.temperature}°C
          - 산소포화도: ${healthResponse.data.bloodOxygen}%
          - 약물 복용 이력: ${healthResponse.data.drugHistory}
          - 추가 메모: ${healthResponse.data.notes}
        `;
        const aiResponse = await axios.post('/api/gemini', { prompt });
        setAiResponse(aiResponse.data.response);
      } catch (err) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchDataAndAnalyze();
  }, []);

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100'>
        <Loader className='animate-spin text-blue-500' size={48} />
        <p className='ml-4 text-xl font-semibold text-blue-500'>로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100'>
        <AlertCircle className='text-red-500' size={48} />
        <p className='ml-4 text-xl font-semibold text-red-500'>{error}</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8'>
      <h1 className='mb-8 text-center text-3xl font-bold text-gray-800'>
        환자 대시보드
      </h1>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        {/* 건강 데이터 카드 */}
        <div className='rounded-lg bg-white p-6 shadow'>
          <h2 className='mb-4 flex items-center text-lg font-bold text-gray-800'>
            <Heart className='mr-2 text-red-500' size={20} />
            건강 기록
          </h2>
          <p>맥박: {healthRecord?.pulse} bpm</p>
          <p>
            혈압: {healthRecord?.bloodHighPressure}/
            {healthRecord?.bloodLowPressure} mmHg
          </p>
          <p>혈당: {healthRecord?.bloodSugar} mg/dL</p>
          <p>체온: {healthRecord?.temperature}°C</p>
          <p>산소포화도: {healthRecord?.bloodOxygen}%</p>
          <p>복용 약물: {healthRecord?.drugHistory}</p>
          <p>추가 메모: {healthRecord?.notes}</p>
          <p>상태: {healthRecord?.status}</p>
        </div>

        {/* 환자 정보 카드 */}
        <div className='rounded-lg bg-white p-6 shadow'>
          <h2 className='mb-4 flex items-center text-lg font-bold text-gray-800'>
            <User className='mr-2 text-blue-500' size={20} />
            환자 정보
          </h2>
          <p>이름: {patient?.name}</p>
          <p>생년월일: {patient?.dateOfBirth}</p>
          <p>키: {patient?.height} cm</p>
          <p>몸무게: {patient?.weight} kg</p>
          <p>방 번호: {patient?.roomNumber}</p>
          <p>혈액형: {patient?.bloodType}</p>
          <p>담당 간호사: {patient?.nurseName}</p>
        </div>
      </div>

      {/* AI 분석 결과 */}
      <div className='mt-8 rounded-lg bg-white p-6 shadow'>
        <h2 className='mb-4 flex items-center text-lg font-bold text-gray-800'>
          <Activity className='mr-2 text-green-500' size={20} />
          AI 분석 결과
        </h2>
        <p className='whitespace-pre-wrap text-gray-700'>{aiResponse}</p>
      </div>
    </div>
  );
}
