'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import AddPatientModal from './_components/AddPatientModal';
import Link from 'next/link';

interface Patient {
  patientId: string;
  name: string;
  height: string;
  weight: string;
  dateOfBirth: string;
  roomNumber: number;
  bloodType: string;
  status: string;
  nurseName: string;
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
      console.log('get 성공!! 환자 리스트들', response.data);
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
              <th className='p-2'>환자 ID</th>
              <th className='p-2'>이름</th>
              <th className='p-2'>생년월일</th>
              <th className='p-2'>키(cm)</th>
              <th className='p-2'>몸무게(kg)</th>
              <th className='p-2'>병실 번호</th>
              <th className='p-2'>혈액형</th>
              <th className='p-2'>상태</th>
              <th className='p-2'>담당 간호사</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={patient.patientId || index} className='border-b'>
                <td className='p-2 text-center'>
                  <Link href={`/patient/${patient.patientId}`}>
                    <div className='text-blue-500 hover:underline'>
                      {patient.patientId}
                    </div>
                  </Link>
                </td>
                <td className='p-2 text-center'>{patient.name}</td>
                <td className='p-2 text-center'>{patient.dateOfBirth}</td>
                <td className='p-2 text-center'>{patient.height}</td>
                <td className='p-2 text-center'>{patient.weight}</td>
                <td className='p-2 text-center'>{patient.roomNumber}</td>
                <td className='p-2 text-center'>{patient.bloodType}</td>
                <td className='p-2 text-center'>{patient.status}</td>
                <td className='p-2 text-center'>{patient.nurseName}</td>
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
