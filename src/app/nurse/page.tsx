'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import AddPatientModal from './_components/AddPatientModal';

interface Patient {
  _id: string;
  name: string;
  dateOfBirth: string;
  roomNumber: number;
  status: string;
}

const NurseDashboard = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get<Patient[]>('/api/patientList-mongodb');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <h1 className='mb-4 text-2xl font-bold text-gray-800'>간호사 대시보드</h1>
      <div className='mb-4 flex justify-end'>
        <button
          onClick={() => setIsModalOpen(true)}
          className='rounded bg-blue-500 px-4 py-2 text-white'
        >
          새로운 환자 추가
        </button>
      </div>
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
              <tr key={patient._id} className='border-b'>
                <td className='p-2 text-center'>{patient.name}</td>
                <td className='p-2 text-center'>{patient.dateOfBirth}</td>
                <td className='p-2 text-center'>{patient.roomNumber}</td>
                <td className='p-2 text-center'>{patient.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddPatientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPatientAdded={fetchPatients}
      />
    </div>
  );
};

export default NurseDashboard;
