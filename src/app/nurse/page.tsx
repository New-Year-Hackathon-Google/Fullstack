'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Patient {
  id: number;
  name: string;
  dateOfBirth: string;
  roomNumber: number;
  entryDate: string;
  bloodType: string;
  nurseName: string;
  weight: number;
  height: number;
}

const NurseDashboard = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      const response = await axios.get('/api/patients', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log('환자 리스트 가져오기 성공!!!', response.data);

      if (response.data.success && Array.isArray(response.data.data)) {
        setPatients(response.data.data);
        console.log('환자 리스트:', response.data.data);
      } else {
        console.error('응답 데이터 형식이 잘못되었습니다:', response.data);
      }
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6'>
      <h1 className='mb-6 text-3xl font-bold text-blue-800'>간호사 대시보드</h1>
      <div className='rounded-lg bg-white p-6 shadow-lg'>
        <h2 className='mb-4 text-xl font-semibold text-blue-700'>
          환자 리스트
        </h2>
        <table className='w-full table-auto border-collapse overflow-hidden rounded-lg shadow-sm'>
          <thead>
            <tr className='bg-blue-200 text-blue-800'>
              <th className='p-3 text-left'>ID</th>
              <th className='p-3 text-left'>이름</th>
              <th className='p-3 text-left'>생년월일</th>
              <th className='p-3 text-left'>병실 번호</th>
              <th className='p-3 text-left'>입원 날짜</th>
              <th className='p-3 text-left'>혈액형</th>
              <th className='p-3 text-left'>담당 간호사</th>
              <th className='p-3 text-left'>몸무게(kg)</th>
              <th className='p-3 text-left'>키(cm)</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr
                key={patient.id}
                className={`${
                  index % 2 === 0 ? 'bg-blue-50' : 'bg-white'
                } transition-colors hover:bg-blue-100`}
              >
                <td className='border-b border-gray-200 p-3 text-center'>
                  {patient.id}
                </td>
                <td className='border-b border-gray-200 p-3 text-center'>
                  {patient.name}
                </td>
                <td className='border-b border-gray-200 p-3 text-center'>
                  {patient.dateOfBirth}
                </td>
                <td className='border-b border-gray-200 p-3 text-center'>
                  {patient.roomNumber}
                </td>
                <td className='border-b border-gray-200 p-3 text-center'>
                  {patient.entryDate}
                </td>
                <td className='border-b border-gray-200 p-3 text-center'>
                  {patient.bloodType}
                </td>
                <td className='border-b border-gray-200 p-3 text-center'>
                  {patient.nurseName}
                </td>
                <td className='border-b border-gray-200 p-3 text-center'>
                  {patient.weight}
                </td>
                <td className='border-b border-gray-200 p-3 text-center'>
                  {patient.height}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NurseDashboard;
