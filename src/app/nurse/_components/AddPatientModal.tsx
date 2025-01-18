'use client';

import { useState } from 'react';
import axios from 'axios';

interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPatientAdded: () => void;
}

const AddPatientModal = ({
  isOpen,
  onClose,
  onPatientAdded,
}: AddPatientModalProps) => {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/patientList-mongodb', {
        name,
        dateOfBirth,
        roomNumber,
        status,
      });
      console.log('New patient added:', response.data);
      onPatientAdded();
      onClose();
    } catch (err) {
      console.error('Error adding patient:', err);
      setError('환자 정보를 추가하는 데 실패했습니다.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='rounded-lg bg-white p-6 shadow-lg'>
        <h2 className='mb-4 text-lg font-bold'>새로운 환자 추가</h2>
        {error && <p className='mb-4 text-red-500'>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label className='block text-sm font-medium'>이름</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full rounded border p-2'
              required
            />
          </div>
          <div className='mb-3'>
            <label className='block text-sm font-medium'>생년월일</label>
            <input
              type='date'
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className='w-full rounded border p-2'
              required
            />
          </div>
          <div className='mb-3'>
            <label className='block text-sm font-medium'>병실 번호</label>
            <input
              type='text'
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              className='w-full rounded border p-2'
              required
            />
          </div>
          <div className='mb-3'>
            <label className='block text-sm font-medium'>상태</label>
            <input
              type='text'
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className='w-full rounded border p-2'
              required
            />
          </div>
          <div className='flex justify-end'>
            <button
              type='button'
              onClick={onClose}
              className='mr-3 rounded bg-gray-200 px-4 py-2'
            >
              취소
            </button>
            <button
              type='submit'
              className='rounded bg-blue-500 px-4 py-2 text-white'
            >
              추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatientModal;
