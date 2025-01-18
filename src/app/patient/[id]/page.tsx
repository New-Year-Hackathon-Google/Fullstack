'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';

export default function PatientDetailedPage() {
  const router = useRouter();
  const pathname = usePathname(); // 현재 URL 경로 가져오기
  const patientId = pathname.split('/').pop();

  const [formData, setFormData] = useState({
    patientId: patientId,
    height: '',
    weight: '',
    heartRate: '',
    bloodPressure: '',
    bloodSugar: '',
    bodyTemperature: '',
    pulse: '',
    oxygenSaturation: '',
    additionalNotes: '',
    medications: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId) {
      alert('Patient ID is missing in the URL.');
      return;
    }

    try {
      const response = await axios.post(`/api/healthRecord-mongodb`, {
        ...formData,
        medications: formData.medications.split(',').map((med) => med.trim()), // 문자열을 배열로 변환
      });
      console.log('Response:', response.data);
      alert('Health record successfully created.');
      router.push('/'); // 성공 후 리디렉션 (원하는 경로로 변경 가능)
    } catch (error) {
      console.error('Error creating health record:', error);
      alert('Failed to create health record.');
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <h1 className='mb-4 text-2xl font-bold text-gray-800'>
        환자 상세 정보 입력
      </h1>
      <form
        onSubmit={handleSubmit}
        className='rounded-lg bg-white p-6 shadow-md'
      >
        <div className='mb-4'>
          <label className='block text-sm font-semibold'>Height (cm)</label>
          <input
            type='number'
            name='height'
            value={formData.height}
            onChange={handleChange}
            className='w-full rounded border px-3 py-2'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-semibold'>Weight (kg)</label>
          <input
            type='number'
            name='weight'
            value={formData.weight}
            onChange={handleChange}
            className='w-full rounded border px-3 py-2'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-semibold'>
            Heart Rate (bpm)
          </label>
          <input
            type='number'
            name='heartRate'
            value={formData.heartRate}
            onChange={handleChange}
            className='w-full rounded border px-3 py-2'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-semibold'>Blood Pressure</label>
          <input
            type='text'
            name='bloodPressure'
            value={formData.bloodPressure}
            onChange={handleChange}
            className='w-full rounded border px-3 py-2'
            placeholder='e.g., 120/80'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-semibold'>
            Blood Sugar (mg/dL)
          </label>
          <input
            type='number'
            name='bloodSugar'
            value={formData.bloodSugar}
            onChange={handleChange}
            className='w-full rounded border px-3 py-2'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-semibold'>
            Body Temperature (°C)
          </label>
          <input
            type='number'
            name='bodyTemperature'
            value={formData.bodyTemperature}
            onChange={handleChange}
            className='w-full rounded border px-3 py-2'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-semibold'>Pulse (bpm)</label>
          <input
            type='number'
            name='pulse'
            value={formData.pulse}
            onChange={handleChange}
            className='w-full rounded border px-3 py-2'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-semibold'>
            Oxygen Saturation (%)
          </label>
          <input
            type='number'
            name='oxygenSaturation'
            value={formData.oxygenSaturation}
            onChange={handleChange}
            className='w-full rounded border px-3 py-2'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-semibold'>
            Additional Notes
          </label>
          <textarea
            name='additionalNotes'
            value={formData.additionalNotes}
            onChange={handleChange}
            className='w-full rounded border px-3 py-2'
            placeholder='Enter additional notes (e.g., 식사 상태, 수면 상태)'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-semibold'>
            Medications (comma-separated)
          </label>
          <input
            type='text'
            name='medications'
            value={formData.medications}
            onChange={handleChange}
            className='w-full rounded border px-3 py-2'
            placeholder='e.g., Aspirin, Vitamin D'
          />
        </div>
        <button
          type='submit'
          className='rounded bg-blue-500 px-4 py-2 text-white'
        >
          Save Health Record
        </button>
      </form>
    </div>
  );
}
