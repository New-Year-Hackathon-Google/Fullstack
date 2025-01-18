'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Activity,
  Heart,
  Thermometer,
  Droplets,
  User,
  Calendar,
  Home,
  AlertCircle,
  CheckCircle,
  Loader,
} from 'lucide-react';

type StatusType = '안정적' | '주의' | '위험';

interface HealthRecord {
  heartRate: number;
  bloodPressure: string;
  bloodSugar: number;
  bodyTemperature: number;
  pulse: number;
  oxygenSaturation: number;
  additionalNotes: string;
  medications: string[];
}

interface Patient {
  patientId: string;
  name: string;
  dateOfBirth: string;
  height: string;
  weight: string;
  roomNumber: string;
  bloodType: string;
  status: StatusType;
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
        const patientResponse = await axios.post('/api/patientInfo-mongodb', {
          patientId: '20250118-610119',
        });

        const healthResponse = await axios.post('/api/patientHealth-mongodb', {
          patientId: '20250118-610119',
        });

        const patientData = patientResponse.data;
        const healthData = healthResponse.data;

        setPatient(patientData);
        setHealthRecord(healthData);

        const prompt = `
          환자의 건강 데이터를 바탕으로 상태를 분석해주세요:
          - 심박수: ${healthData.heartRate} bpm
          - 혈압: ${healthData.bloodPressure}
          - 혈당: ${healthData.bloodSugar} mg/dL
          - 체온: ${healthData.bodyTemperature}°C
          - 맥박: ${healthData.pulse}
          - 산소포화도: ${healthData.oxygenSaturation}%
          - 키: ${patientData.height} cm
          - 몸무게: ${patientData.weight} kg
          - 방 번호: ${patientData.roomNumber}
          - 혈액형: ${patientData.bloodType}
          - 현재 상태: ${patientData.status}
          - 담당 간호사: ${patientData.nurseName}
          - 복용 약물: ${
            healthData.medications.length > 0
              ? healthData.medications.join(', ')
              : '복용 약물 없음'
          }

          1. 현재 환자의 건강 상태를 알려주세요.
          2. 환자가 가질 수 있는 예상 병명을 제안하세요. 없으면 건강함이라고 표현해주세요.
          3. 개선을 위한 조언과 방법을 제공하세요.
          4. 추가로 알려주어야 할 사항이 있으면 말씀해주세요.
        `;

        const aiResponse = await axios.post('/api/gemini', { prompt });
        setAiResponse(aiResponse.data.response);
      } catch (error) {
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
          <p>심박수: {healthRecord?.heartRate} bpm</p>
          <p>혈압: {healthRecord?.bloodPressure}</p>
          <p>혈당: {healthRecord?.bloodSugar} mg/dL</p>
          <p>체온: {healthRecord?.bodyTemperature}°C</p>
          <p>맥박: {healthRecord?.pulse}</p>
          <p>산소포화도: {healthRecord?.oxygenSaturation}%</p>
          <p>추가 메모: {healthRecord?.additionalNotes}</p>
          <p>
            복용 약물:{' '}
            {healthRecord?.medications.length
              ? healthRecord.medications.join(', ')
              : '복용 약물 없음'}
          </p>
        </div>

        {/* 환자 정보 카드 */}
        <div className='rounded-lg bg-white p-6 shadow'>
          <h2 className='mb-4 flex items-center text-lg font-bold text-gray-800'>
            <User className='mr-2 text-blue-500' size={20} />
            환자 정보
          </h2>
          <p>환자 ID: {patient?.patientId}</p>
          <p>이름: {patient?.name}</p>
          <p>생년월일: {patient?.dateOfBirth}</p>
          <p>키: {patient?.height} cm</p>
          <p>몸무게: {patient?.weight} kg</p>
          <p>방 번호: {patient?.roomNumber}</p>
          <p>혈액형: {patient?.bloodType}</p>
          <p>현재 상태: {patient?.status}</p>
          <p>담당 간호사: {patient?.nurseName}</p>
        </div>
      </div>

      {/* AI 분석 결과 */}
      <div className='mt-8 rounded-lg bg-white p-6 shadow'>
        <h2 className='mb-4 flex items-center text-lg font-bold text-gray-800'>
          <Activity className='mr-2 text-green-500' size={20} />
          AI 분석 결과
        </h2>
        {aiResponse ? (
          <p className='whitespace-pre-wrap text-gray-700'>
            {aiResponse.replace(/\*\*/g, '')}
          </p>
        ) : (
          <p className='text-gray-500'>분석 결과를 가져오는 중입니다...</p>
        )}
      </div>
    </div>
  );
}
