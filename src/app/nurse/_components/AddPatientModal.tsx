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
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    height: 0,
    weight: 0,
    roomNumber: 0,
    bloodType: '',
    nurseName: '',
    entryDate: new Date().toISOString().split('T')[0], // 기본값: 오늘 날짜
  });
  const [error, setError] = useState('');

  // 입력값 변경 핸들러
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'height' || name === 'weight' || name === 'roomNumber'
          ? Number(value)
          : value,
    }));
  };

  // 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      setError('인증 토큰이 없습니다. 다시 로그인 해주세요.');
      return;
    }

    try {
      // 서버 요구 사항에 맞는 데이터 매핑
      const requestData = {
        ...formData,
        bloodType: formData.bloodType
          .replace('+', '_plus')
          .replace('-', '_minus'), // 혈액형 매핑
      };

      const response = await axios.post('/api/patients', requestData, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // accessToken 추가
        },
      });

      console.log('New patient added:', response.data);
      onPatientAdded(); // 부모 컴포넌트에서 데이터 갱신
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
              name='name'
              value={formData.name}
              onChange={handleChange}
              className='w-full rounded border p-2'
              required
            />
          </div>
          <div className='mb-3'>
            <label className='block text-sm font-medium'>생년월일</label>
            <input
              type='date'
              name='dateOfBirth'
              value={formData.dateOfBirth}
              onChange={handleChange}
              className='w-full rounded border p-2'
              required
            />
          </div>
          <div className='mb-3'>
            <label className='block text-sm font-medium'>입원 날짜</label>
            <input
              type='date'
              name='entryDate'
              value={formData.entryDate}
              onChange={handleChange}
              className='w-full rounded border p-2'
              required
            />
          </div>
          <div className='mb-3'>
            <label className='block text-sm font-medium'>키 (cm)</label>
            <input
              type='number'
              name='height'
              value={formData.height}
              onChange={handleChange}
              className='w-full rounded border p-2'
              required
            />
          </div>
          <div className='mb-3'>
            <label className='block text-sm font-medium'>몸무게 (kg)</label>
            <input
              type='number'
              name='weight'
              value={formData.weight}
              onChange={handleChange}
              className='w-full rounded border p-2'
              required
            />
          </div>
          <div className='mb-3'>
            <label className='block text-sm font-medium'>병실 번호</label>
            <input
              type='number'
              name='roomNumber'
              value={formData.roomNumber}
              onChange={handleChange}
              className='w-full rounded border p-2'
              required
            />
          </div>
          <div className='mb-3'>
            <label className='block text-sm font-medium'>혈액형</label>
            <select
              name='bloodType'
              value={formData.bloodType}
              onChange={handleChange}
              className='w-full rounded border p-2'
              required
            >
              <option value='' disabled>
                혈액형 선택
              </option>
              <option value='A+'>A+</option>
              <option value='A-'>A-</option>
              <option value='B+'>B+</option>
              <option value='B-'>B-</option>
              <option value='AB+'>AB+</option>
              <option value='AB-'>AB-</option>
              <option value='O+'>O+</option>
              <option value='O-'>O-</option>
            </select>
          </div>
          <div className='mb-3'>
            <label className='block text-sm font-medium'>담당 간호사</label>
            <input
              type='text'
              name='nurseName'
              value={formData.nurseName}
              onChange={handleChange}
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
