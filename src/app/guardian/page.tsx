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
  const [patient, setPatient] = useState<Patient | null>(null);
  const [healthRecord, setHealthRecord] = useState<HealthRecord | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Patient 정보 가져오기
        const patientResponse = await axios.post('/api/patientInfo-mongodb', {
          id: '678ba02f0ce52b02ae7589ad',
        });

        // HealthRecord 정보 가져오기
        const healthResponse = await axios.post('/api/patientHealth-mongodb', {
          id: '678ba02f0ce52b02ae7589ad',
        });

        setPatient(patientResponse.data);
        setHealthRecord(healthResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!patient || !healthRecord) {
    return <div>Loading...</div>;
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8'>
      <h1 className='mb-8 text-3xl font-bold'>환자 대시보드</h1>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        {/* 환자 정보 카드 */}
        <div className='rounded-lg bg-white p-6 shadow'>
          <h2 className='mb-4 text-lg font-bold'>환자 정보</h2>
          <p>이름: {patient.name}</p>
          <p>생년월일: {patient.dateOfBirth}</p>
          <p>키: {patient.height}</p>
          <p>몸무게: {patient.weight}</p>
          <p>혈액형: {patient.bloodType}</p>
          <p>상태: {patient.status}</p>
          <p>담당 간호사: {patient.nurseName}</p>
        </div>

        {/* 건강 기록 카드 */}
        <div className='rounded-lg bg-white p-6 shadow'>
          <h2 className='mb-4 text-lg font-bold'>건강 기록</h2>
          <p>심박수: {healthRecord.heartRate} bpm</p>
          <p>혈압: {healthRecord.bloodPressure}</p>
          <p>혈당: {healthRecord.bloodSugar} mg/dL</p>
          <p>체온: {healthRecord.bodyTemperature}°C</p>
          <p>맥박: {healthRecord.pulse}</p>
          <p>산소포화도: {healthRecord.oxygenSaturation}%</p>
          <p>추가 메모: {healthRecord.additionalNotes}</p>
          <p>복용 약물: {healthRecord.medications.join(', ')}</p>
        </div>
      </div>
    </div>
  );
}
