'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  roomNumber: string;
  status: string;
}

const NurseDashboard: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get<Patient[]>('/api/patients');
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <h1 className='mb-4 text-2xl font-bold text-gray-800'>간호사 대시보드</h1>
      <div className='rounded-lg bg-white p-4 shadow-md'>
        <h2 className='mb-3 text-lg font-semibold'>환자 리스트</h2>
        <table className='w-full table-auto'>
          <thead>
            <tr className='bg-gray-200 text-gray-700'>
              <th className='p-2'>이름</th>
              <th className='p-2'>생년월일</th>
              <th className='p-2'>병실 번호</th>
              <th className='p-2'>상태</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className='border-b'>
                <td className='p-2'>{patient.name}</td>
                <td className='p-2'>{patient.dateOfBirth}</td>
                <td className='p-2'>{patient.roomNumber}</td>
                <td className='p-2'>{patient.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NurseDashboard;
