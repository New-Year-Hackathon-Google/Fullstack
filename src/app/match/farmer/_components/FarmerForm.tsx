'use client';

import { useState } from 'react';
import axios from 'axios';
import DateSelection from './DateSelection';

export default function FarmerForm() {
  const [formData, setFormData] = useState<{
    name: string;
    type: string;
    location: string;
    year: string;
    month: string;
    day: string;
    skillsRequired: string;
    image: File | null;
    description: string;
  }>({
    name: '',
    type: '',
    location: '',
    year: '',
    month: '',
    day: '',
    skillsRequired: '',
    image: null,
    description: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, files } = e.target as HTMLInputElement; // files는 HTMLInputElement에만 존재
    if (name === 'image') {
      setFormData({ ...formData, image: files![0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key as keyof typeof formData] as any);
    });

    try {
      await axios.post('/api/farmer-mongodb', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Farmer form submitted successfully!');
      setFormData({
        name: '',
        type: '',
        location: '',
        year: '',
        month: '',
        day: '',
        skillsRequired: '',
        image: null,
        description: '',
      });
    } catch (error) {
      console.error('Error submitting farmer form:', error);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-green-300 via-blue-200 to-purple-300'>
      <form
        onSubmit={handleSubmit}
        className='grid w-[800px] grid-cols-2 gap-6 rounded-2xl bg-white p-10 shadow-lg transition-shadow hover:shadow-xl'
      >
        <h2 className='col-span-2 mb-6 text-center text-3xl font-bold text-blue-600'>
          Register as a Farmer
        </h2>
        <div className='flex flex-col'>
          <label className='mb-2 text-sm font-medium text-gray-700'>Name</label>
          <input
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='rounded border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500'
            placeholder='Enter your name'
            required
          />
        </div>
        <div className='flex flex-col'>
          <label className='mb-2 text-sm font-medium text-gray-700'>
            Type of Farming
          </label>
          <select
            name='type'
            value={formData.type}
            onChange={handleChange}
            className='rounded border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500'
            required
          >
            <option value=''>Select</option>
            <option value='organic'>Organic Vegetables</option>
            <option value='fruit'>Fruit Orchard</option>
            <option value='dairy'>Dairy</option>
          </select>
        </div>
        <div className='flex flex-col'>
          <label className='mb-2 text-sm font-medium text-gray-700'>
            Location
          </label>
          <input
            name='location'
            value={formData.location}
            onChange={handleChange}
            className='rounded border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500'
            placeholder='Enter farm location'
            required
          />
        </div>
        <div className='flex flex-col items-center justify-center'>
          <h1>시작 일자</h1>
          <DateSelection handleChange={handleChange} />
        </div>
        <div className='col-span-2 flex flex-col'>
          <label className='mb-2 text-sm font-medium text-gray-700'>
            Skills Required
          </label>
          <input
            name='skillsRequired'
            value={formData.skillsRequired}
            onChange={handleChange}
            className='rounded border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500'
            placeholder='Enter skills required (e.g., tractor operation)'
          />
        </div>
        <div className='col-span-2 flex flex-col'>
          <label className='mb-2 text-sm font-medium text-gray-700'>
            Upload Image
          </label>
          <input
            type='file'
            name='image'
            onChange={handleChange}
            className='rounded border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500'
          />
        </div>
        <div className='col-span-2 flex flex-col'>
          <label className='mb-2 text-sm font-medium text-gray-700'>
            Description
          </label>
          <textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            className='rounded border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500'
            placeholder='Describe your farm and work environment'
          />
        </div>
        <button
          type='submit'
          className='col-span-2 mt-4 rounded-lg bg-gradient-to-r from-blue-500 to-green-500 p-3 font-semibold text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          Submit
        </button>
      </form>
    </div>
  );
}
