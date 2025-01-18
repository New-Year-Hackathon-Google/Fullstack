'use client';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';

export default function PatientDetailedPage() {
  const router = useRouter();
  const pathname = usePathname(); // 현재 URL 경로 가져오기
  const patientId = pathname.split('/').pop();

  const [formData, setFormData] = useState({
    patientId: patientId || '',
    heartRate: '',
    bloodPressure: '',
    bloodSugar: '',
    bodyTemperature: '',
    pulse: '',
    oxygenSaturation: '',
    additionalNotes: '',
    medications: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/api/healthRecord-mongodb`, {
        ...formData,
        medications: formData.medications.split(',').map((med) => med.trim()), // 문자열을 배열로 변환
      });
      console.log('Response:', response.data);
      alert('Health record successfully created.');
      router.push('/'); // 성공 후 리디렉션
    } catch (error) {
      console.error('Error creating health record:', error);
      alert('Failed to create health record.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <h1 className='mb-4 text-2xl font-bold text-gray-800'>
        환자 상세 정보 입력
      </h1>
      <form
        onSubmit={handleSubmit}
        className='rounded-lg bg-white p-6 shadow-md'
      >
        {/* Heart Rate */}
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

        {/* Blood Pressure */}
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

        {/* Blood Sugar */}
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

        {/* Body Temperature */}
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
            step='0.1'
            required
          />
        </div>

        {/* Pulse */}
        <div className='mb-4'>
          <label className='block text-sm font-semibold'>Pulse</label>
          <input
            type='number'
            name='pulse'
            value={formData.pulse}
            onChange={handleChange}
            className='w-full rounded border px-3 py-2'
            required
          />
        </div>

        {/* Oxygen Saturation */}
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

        {/* Additional Notes */}
        <div className='mb-4'>
          <label className='block text-sm font-semibold'>
            Additional Notes
          </label>
          <textarea
            name='additionalNotes'
            value={formData.additionalNotes}
            onChange={handleChange}
            className='w-full rounded border px-3 py-2'
          />
        </div>

        {/* Medications */}
        <div className='mb-4'>
          <label className='block text-sm font-semibold'>Medications</label>
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
