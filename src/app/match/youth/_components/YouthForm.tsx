'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useYouthStore from '@/store/youthStore';

export default function YouthForm() {
  const { setYouthData } = useYouthStore();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    skills: '',
    location: '',
    availability: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Set data to Zustand store
    setYouthData(formData);

    // Redirect to match result page
    router.push('/match');
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-lg rounded-lg bg-white p-8 shadow-md'
      >
        <h2 className='mb-6 text-2xl font-bold text-gray-800'>
          Register as a Youth
        </h2>
        <div className='mb-4'>
          <label className='mb-1 block text-sm font-medium text-gray-700'>
            Name
          </label>
          <input
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='w-full rounded border-gray-300 p-2 text-gray-900 focus:border-green-500 focus:ring-green-500'
            placeholder='Enter your name'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='mb-1 block text-sm font-medium text-gray-700'>
            Skills
          </label>
          <textarea
            name='skills'
            value={formData.skills}
            onChange={handleChange}
            className='w-full rounded border-gray-300 p-2 text-gray-900 focus:border-green-500 focus:ring-green-500'
            placeholder='Enter your skills (e.g., harvesting, packaging)'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='mb-1 block text-sm font-medium text-gray-700'>
            Location
          </label>
          <input
            name='location'
            value={formData.location}
            onChange={handleChange}
            className='w-full rounded border-gray-300 p-2 text-gray-900 focus:border-green-500 focus:ring-green-500'
            placeholder='Enter your location'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='mb-1 block text-sm font-medium text-gray-700'>
            Availability
          </label>
          <input
            name='availability'
            value={formData.availability}
            onChange={handleChange}
            className='w-full rounded border-gray-300 p-2 text-gray-900 focus:border-green-500 focus:ring-green-500'
            placeholder='Enter your availability (e.g., weekends, 3 weeks)'
            required
          />
        </div>
        <button
          type='submit'
          className='w-full rounded bg-green-500 p-3 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
        >
          Submit
        </button>
      </form>
    </div>
  );
}
