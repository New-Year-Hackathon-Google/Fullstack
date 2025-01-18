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
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [status, setStatus] = useState('');
  const [nurseName, setNurseName] = useState('');
  const [error, setError] = useState('');

  const generatePatientId = (birthDate: string) => {
    const currentDate = new Date();
    const formattedDate = currentDate
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, ''); // 현재 날짜를 YYYYMMDD 형식으로 변환
    const birthDigits = birthDate.replace(/-/g, '').slice(2, 8); // 주민번호 앞자리처럼 생년월일에서 YYMMDD 추출
    return `${formattedDate}-${birthDigits}`; // 조합: YYYYMMDD-YYMMDD
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const patientId = generatePatientId(dateOfBirth); // patientId 생성

      const response = await axios.post('/api/patientList-mongodb', {
        patientId,
        name,
        dateOfBirth,
        height,
        weight,
        roomNumber,
        bloodType,
        status,
        nurseName,
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
            <label className='block text-sm font-medium'>키 (cm)</label>
            <input
              type='text'
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className='w-full rounded border p-2'
              required
            />
          </div>
          <div className='mb-3'>
            <label className='block text-sm font-medium'>몸무게 (kg)</label>
            <input
              type='text'
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
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
            <label className='block text-sm font-medium'>혈액형</label>
            <select
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value)}
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
            <label className='block text-sm font-medium'>상태</label>
            <input
              type='text'
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className='w-full rounded border p-2'
              required
            />
          </div>
          <div className='mb-3'>
            <label className='block text-sm font-medium'>담당 간호사</label>
            <input
              type='text'
              value={nurseName}
              onChange={(e) => setNurseName(e.target.value)}
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
