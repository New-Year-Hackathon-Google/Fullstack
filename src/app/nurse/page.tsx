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

      // response.data.data에서 배열만 추출
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
    <div className='min-h-screen bg-gray-100 p-6'>
      <h1 className='mb-4 text-2xl font-bold text-gray-800'>간호사 대시보드</h1>
      <div className='rounded-lg bg-white p-4 shadow-md'>
        <h2 className='mb-3 text-lg font-semibold'>환자 리스트</h2>
        <table className='w-full table-auto'>
          <thead>
            <tr className='bg-gray-200 text-gray-700'>
              <th className='p-2'>ID</th>
              <th className='p-2'>이름</th>
              <th className='p-2'>생년월일</th>
              <th className='p-2'>병실 번호</th>
              <th className='p-2'>입원 날짜</th>
              <th className='p-2'>혈액형</th>
              <th className='p-2'>담당 간호사</th>
              <th className='p-2'>몸무게(kg)</th>
              <th className='p-2'>키(cm)</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className='border-b'>
                <td className='p-2 text-center'>{patient.id}</td>
                <td className='p-2 text-center'>{patient.name}</td>
                <td className='p-2 text-center'>{patient.dateOfBirth}</td>
                <td className='p-2 text-center'>{patient.roomNumber}</td>
                <td className='p-2 text-center'>{patient.entryDate}</td>
                <td className='p-2 text-center'>{patient.bloodType}</td>
                <td className='p-2 text-center'>{patient.nurseName}</td>
                <td className='p-2 text-center'>{patient.weight}</td>
                <td className='p-2 text-center'>{patient.height}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NurseDashboard;
