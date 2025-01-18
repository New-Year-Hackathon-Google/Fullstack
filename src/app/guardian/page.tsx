'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Loader,
  AlertCircle,
  HeartPulse,
  User,
  Calendar,
  Home,
  Droplet,
  Thermometer,
  CheckCircle,
  Clipboard,
} from 'lucide-react';

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
  const [aiAnalysis, setAiAnalysis] = useState<{
    currentCondition: string;
    potentialIllnesses: string;
    recommendations: string;
    additionalInfo: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataAndAnalyze = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const accessToken = localStorage.getItem('accessToken');
        const memberId = user?.id;

        if (!memberId) {
          throw new Error('사용자 ID를 찾을 수 없습니다.');
        }

        const patientResponse = await axios.post('/api/patients', {
          memberId,
          accessToken,
        });
        const patientData = patientResponse.data;
        setPatient(patientData);

        const healthResponse = await axios.post('/api/healthStatus', {
          patientId: patientData.id,
          accessToken,
        });
        setHealthRecord(healthResponse.data);

        const prompt = `
          Patient Data:
          - Name: ${patientData.name}
          - Age: ${new Date().getFullYear() - new Date(patientData.dateOfBirth).getFullYear()} years
          - Height: ${patientData.height} cm
          - Weight: ${patientData.weight} kg
          - Blood Pressure: ${healthResponse.data.bloodHighPressure} / ${healthResponse.data.bloodLowPressure} mmHg
          - Blood Sugar: ${healthResponse.data.bloodSugar} mg/dL
          - Oxygen Level: ${healthResponse.data.bloodOxygen}%
          - Pulse: ${healthResponse.data.pulse}
          - Temperature: ${healthResponse.data.temperature} °C
        `;

        const aiResponse = await axios.post('/api/gemini', { prompt });
        const aiData = aiResponse.data.response.split('\n\n');

        setAiAnalysis({
          currentCondition: aiData[0] || '',
          potentialIllnesses: aiData[1] || '',
          recommendations: aiData[2] || '',
          additionalInfo: aiData[3] || '',
        });
      } catch (err: any) {
        setError(err.message || '데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchDataAndAnalyze();
  }, []);

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200'>
        <Loader className='animate-spin text-indigo-500' size={48} />
        <p className='ml-4 text-xl font-semibold text-indigo-500'>로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-red-100 to-red-200'>
        <AlertCircle className='text-red-500' size={48} />
        <p className='ml-4 text-xl font-semibold text-red-500'>{error}</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8'>
      <h1 className='mb-8 text-center text-4xl font-bold text-indigo-800 transition-colors hover:text-purple-600'>
        환자 대시보드
      </h1>

      {patient && (
        <div className='mb-8 rounded-lg border-4 border-indigo-200 bg-white shadow-lg'>
          <div className='mb-4 flex items-center rounded bg-gradient-to-r from-indigo-300 to-white p-4 text-2xl font-semibold'>
            <User className='mr-2' />
            <h2 className='text-indigo-800'>환자 정보</h2>
          </div>

          <div className='grid grid-cols-2 gap-4 p-5'>
            <p className='flex items-center text-gray-700'>
              <User className='mr-2 text-indigo-500' />
              <span className='font-bold text-indigo-800'>이름:</span>{' '}
              {patient.name}
            </p>
            <p className='flex items-center text-gray-700'>
              <Calendar className='mr-2 text-indigo-500' />
              <span className='font-bold text-indigo-800'>생년월일:</span>{' '}
              {patient.dateOfBirth}
            </p>
            <p className='flex items-center text-gray-700'>
              <Home className='mr-2 text-indigo-500' />
              <span className='font-bold text-indigo-800'>방 번호:</span>{' '}
              {patient.roomNumber}
            </p>
            <p className='flex items-center text-gray-700'>
              <Droplet className='mr-2 text-indigo-500' />
              <span className='font-bold text-indigo-800'>혈액형:</span>{' '}
              {patient.bloodType}
            </p>
            <p className='flex items-center text-gray-700'>
              <Thermometer className='mr-2 text-indigo-500' />
              <span className='font-bold text-indigo-800'>키:</span>{' '}
              {patient.height} cm
            </p>
            <p className='flex items-center text-gray-700'>
              <CheckCircle className='mr-2 text-indigo-500' />
              <span className='font-bold text-indigo-800'>몸무게:</span>{' '}
              {patient.weight} kg
            </p>
            <p className='flex items-center text-gray-700'>
              <Clipboard className='mr-2 text-indigo-500' />
              <span className='font-bold text-indigo-800'>
                담당 간호사:
              </span>{' '}
              {patient.nurseName}
            </p>
          </div>
        </div>
      )}

      {healthRecord && (
        <div className='mb-8 rounded-lg border-4 border-green-200 bg-white shadow-lg'>
          <div className='mb-4 flex items-center rounded bg-gradient-to-r from-green-300 to-white p-4 text-2xl font-semibold'>
            <HeartPulse className='mr-2' />
            <h2 className='text-green-800'>건강 상태</h2>
          </div>
          <div className='grid grid-cols-2 gap-4 p-5'>
            <p className='flex items-center text-gray-700'>
              <HeartPulse className='mr-2 text-green-500' />
              <span className='font-bold text-green-800'>맥박:</span>{' '}
              {healthRecord.pulse}
            </p>
            <p className='flex items-center text-gray-700'>
              <Droplet className='mr-2 text-green-500' />
              <span className='font-bold text-green-800'>혈당:</span>{' '}
              {healthRecord.bloodSugar}
            </p>
            <p className='flex items-center text-gray-700'>
              <Thermometer className='mr-2 text-green-500' />
              <span className='font-bold text-green-800'>혈압:</span>{' '}
              {healthRecord.bloodHighPressure} / {healthRecord.bloodLowPressure}
            </p>
            <p className='flex items-center text-gray-700'>
              <Thermometer className='mr-2 text-green-500' />
              <span className='font-bold text-green-800'>체온:</span>{' '}
              {healthRecord.temperature} °C
            </p>
            <p className='flex items-center text-gray-700'>
              <HeartPulse className='mr-2 text-green-500' />
              <span className='font-bold text-green-800'>산소포화도:</span>{' '}
              {healthRecord.bloodOxygen}%
            </p>
            <p className='flex items-center text-gray-700'>
              <Clipboard className='mr-2 text-green-500' />
              <span className='font-bold text-green-800'>복용 약물:</span>{' '}
              {healthRecord.drugHistory}
            </p>
            <p className='flex items-center text-gray-700'>
              <AlertCircle className='mr-2 text-green-500' />
              <span className='font-bold text-green-800'>추가 메모:</span>{' '}
              {healthRecord.notes}
            </p>
            <p className='flex items-center text-gray-700'>
              <CheckCircle className='mr-2 text-green-500' />
              <span className='font-bold text-green-800'>상태:</span>{' '}
              {healthRecord.status}
            </p>
          </div>
        </div>
      )}

      {aiAnalysis && (
        <div className='rounded-lg border-4 border-purple-200 bg-white shadow-lg'>
          <div className='mb-4 flex items-center rounded bg-gradient-to-r from-purple-300 to-white p-4 text-2xl font-semibold'>
            <Clipboard className='mr-2' />
            <h2 className='text-purple-800'>AI 분석 결과</h2>
          </div>
          <div className='p-5'>
            <div className='mb-4'>
              <h3 className='flex items-center text-xl font-semibold text-purple-800'>
                <User className='mr-2 text-purple-500' /> 현재 환자 상태
              </h3>
              <p className='text-gray-700'>{aiAnalysis.currentCondition}</p>
            </div>
            <div className='mb-4'>
              <h3 className='flex items-center text-xl font-semibold text-purple-800'>
                <AlertCircle className='mr-2 text-purple-500' /> 예상되는 질병
              </h3>
              <p className='text-gray-700'>{aiAnalysis.potentialIllnesses}</p>
            </div>
            <div className='mb-4'>
              <h3 className='flex items-center text-xl font-semibold text-purple-800'>
                <CheckCircle className='mr-2 text-purple-500' /> 개선 방법
              </h3>
              <p className='text-gray-700'>{aiAnalysis.recommendations}</p>
            </div>
            <div>
              <h3 className='flex items-center text-xl font-semibold text-purple-800'>
                <Clipboard className='mr-2 text-purple-500' /> 추가 정보
              </h3>
              <p className='text-gray-700'>{aiAnalysis.additionalInfo}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
