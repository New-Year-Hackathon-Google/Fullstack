'use client';

import { useState } from 'react';
import axios from 'axios';

export default function FarmerForm() {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    imageUrl: '',
    duration: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('/api/farmer-mongodb', formData);
      alert('Farmer form submitted successfully!');
      setFormData({
        name: '',
        type: '',
        imageUrl: '',
        duration: '',
      });
    } catch (error) {
      console.error('Error submitting farmer form:', error);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-lg rounded-lg bg-white p-8 shadow-md'
      >
        <h2 className='mb-6 text-2xl font-bold text-gray-800'>
          Register as a Farmer
        </h2>
        <div className='mb-4'>
          <label className='mb-1 block text-sm font-medium text-gray-700'>
            Name
          </label>
          <input
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='w-full rounded border-gray-300 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
            placeholder='Enter your name'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='mb-1 block text-sm font-medium text-gray-700'>
            Type of Help Needed
          </label>
          <select
            name='type'
            value={formData.type}
            onChange={handleChange}
            className='w-full rounded border-gray-300 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
            required
          >
            <option value=''>Select</option>
            <option value='harvest'>Harvest</option>
            <option value='packaging'>Packaging</option>
            <option value='distribution'>Distribution</option>
          </select>
        </div>
        <div className='mb-4'>
          <label className='mb-1 block text-sm font-medium text-gray-700'>
            Image URL
          </label>
          <input
            name='imageUrl'
            value={formData.imageUrl}
            onChange={handleChange}
            className='w-full rounded border-gray-300 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
            placeholder='Enter an image URL'
          />
        </div>
        <div className='mb-4'>
          <label className='mb-1 block text-sm font-medium text-gray-700'>
            Duration
          </label>
          <input
            name='duration'
            value={formData.duration}
            onChange={handleChange}
            className='w-full rounded border-gray-300 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
            placeholder='Enter duration (e.g., 2 weeks)'
            required
          />
        </div>
        <button
          type='submit'
          className='w-full rounded bg-blue-500 p-3 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        >
          Submit
        </button>
      </form>
    </div>
  );
}
