'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useYouthStore from '@/store/useYouthStore';

export default function YouthForm() {
  const { setYouthData } = useYouthStore();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    skills: '',
    location: '',
    year: '',
    month: '',
    day: '',
    preferredType: '',
    experienceLevel: '',
    contactInfo: '',
    goals: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setYouthData(formData);
    router.push('/match/result');
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-300 via-red-200 to-yellow-300'>
      <form
        onSubmit={handleSubmit}
        className='grid w-[800px] grid-cols-2 gap-6 rounded-2xl bg-white p-10 shadow-lg transition-shadow hover:shadow-xl'
      >
        <h2 className='col-span-2 mb-6 text-center text-3xl font-bold text-pink-600'>
          Register as a Youth
        </h2>
        <div className='flex flex-col'>
          <label className='mb-2 text-sm font-medium text-gray-700'>Name</label>
          <input
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='rounded border-gray-300 p-2 focus:border-pink-500 focus:ring-pink-500'
            placeholder='Enter your name'
            required
          />
        </div>
        <div className='flex flex-col'>
          <label className='mb-2 text-sm font-medium text-gray-700'>
            Skills
          </label>
          <textarea
            name='skills'
            value={formData.skills}
            onChange={handleChange}
            className='rounded border-gray-300 p-2 focus:border-pink-500 focus:ring-pink-500'
            placeholder='Enter your skills (e.g., harvesting, packaging)'
            required
          />
        </div>
        <div className='flex flex-col'>
          <label className='mb-2 text-sm font-medium text-gray-700'>
            Location
          </label>
          <input
            name='location'
            value={formData.location}
            onChange={handleChange}
            className='rounded border-gray-300 p-2 focus:border-pink-500 focus:ring-pink-500'
            placeholder='Enter your location'
            required
          />
        </div>
        <div className='grid grid-cols-3 gap-4'>
          <div>
            <label className='mb-2 text-sm font-medium text-gray-700'>
              Year
            </label>
            <select
              name='year'
              value={formData.year}
              onChange={handleChange}
              className='rounded border-gray-300 p-2 focus:border-pink-500 focus:ring-pink-500'
              required
            >
              <option value=''>Year</option>
              {[2025, 2026, 2027].map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className='mb-2 text-sm font-medium text-gray-700'>
              Month
            </label>
            <select
              name='month'
              value={formData.month}
              onChange={handleChange}
              className='rounded border-gray-300 p-2 focus:border-pink-500 focus:ring-pink-500'
              required
            >
              <option value=''>Month</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className='mb-2 text-sm font-medium text-gray-700'>
              Day
            </label>
            <select
              name='day'
              value={formData.day}
              onChange={handleChange}
              className='rounded border-gray-300 p-2 focus:border-pink-500 focus:ring-pink-500'
              required
            >
              <option value=''>Day</option>
              {[...Array(31)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='col-span-2 flex flex-col'>
          <label className='mb-2 text-sm font-medium text-gray-700'>
            Preferred Type
          </label>
          <select
            name='preferredType'
            value={formData.preferredType}
            onChange={handleChange}
            className='rounded border-gray-300 p-2 focus:border-pink-500 focus:ring-pink-500'
          >
            <option value=''>Select</option>
            <option value='organic'>Organic Farming</option>
            <option value='dairy'>Dairy Production</option>
          </select>
        </div>
        <div className='col-span-2 flex flex-col'>
          <label className='mb-2 text-sm font-medium text-gray-700'>
            Experience Level
          </label>
          <select
            name='experienceLevel'
            value={formData.experienceLevel}
            onChange={handleChange}
            className='rounded border-gray-300 p-2 focus:border-pink-500 focus:ring-pink-500'
          >
            <option value=''>Select</option>
            <option value='beginner'>Beginner</option>
            <option value='intermediate'>Intermediate</option>
            <option value='expert'>Expert</option>
          </select>
        </div>
        <div className='col-span-2 flex flex-col'>
          <label className='mb-2 text-sm font-medium text-gray-700'>
            Contact Info
          </label>
          <input
            name='contactInfo'
            value={formData.contactInfo}
            onChange={handleChange}
            className='rounded border-gray-300 p-2 focus:border-pink-500 focus:ring-pink-500'
            placeholder='Enter your email or phone number'
            required
          />
        </div>
        <div className='col-span-2 flex flex-col'>
          <label className='mb-2 text-sm font-medium text-gray-700'>
            Goals
          </label>
          <textarea
            name='goals'
            value={formData.goals}
            onChange={handleChange}
            className='rounded border-gray-300 p-2 focus:border-pink-500 focus:ring-pink-500'
            placeholder='Enter your goals in farming'
          />
        </div>
        <button
          type='submit'
          className='col-span-2 mt-4 rounded-lg bg-gradient-to-r from-pink-500 to-yellow-500 p-3 font-semibold text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-pink-500'
        >
          Submit
        </button>
      </form>
    </div>
  );
}
