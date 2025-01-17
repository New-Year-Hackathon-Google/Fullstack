'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface HealthData {
  bloodPressure: string;
  temperature: number;
  heartRate: number;
  oxygenSaturation: number;
}

interface PatientData {
  name: string;
  dateOfBirth: string;
  status: string;
  healthData: HealthData;
}

const GuardianDashboard = () => {
  const [patientData, setPatientData] = useState<PatientData | null>(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get<PatientData>('/api/patient');
        setPatientData(response.data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatientData();
  }, []);

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <h1 className='mb-4 text-2xl font-bold text-gray-800'>보호자 대시보드</h1>
      {patientData ? (
        <div className='rounded-lg bg-white p-6 shadow-md'>
          <h2 className='mb-3 text-lg font-semibold'>환자 정보</h2>
          <p className='text-gray-700'>
            <strong>이름:</strong> {patientData.name}
          </p>
          <p className='text-gray-700'>
            <strong>생년월일:</strong> {patientData.dateOfBirth}
          </p>
          <p className='text-gray-700'>
            <strong>현재 상태:</strong> {patientData.status}
          </p>
          <div className='mt-4'>
            <h3 className='text-md font-semibold'>최근 건강 데이터</h3>
            <ul className='list-inside list-disc text-gray-700'>
              <li>혈압: {patientData.healthData.bloodPressure}</li>
              <li>체온: {patientData.healthData.temperature}°C</li>
              <li>맥박수: {patientData.healthData.heartRate} BPM</li>
              <li>산소포화도: {patientData.healthData.oxygenSaturation}%</li>
            </ul>
          </div>
        </div>
      ) : (
        <p>환자 데이터를 불러오는 중...</p>
      )}
    </div>
  );
};

export default GuardianDashboard;
