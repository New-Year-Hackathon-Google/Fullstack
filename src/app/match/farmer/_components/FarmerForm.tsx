'use client';

import { useState } from 'react';
import axios from 'axios';

export default function FarmerForm() {
  const [formData, setFormData] = useState({
    helpType: '',
    location: '',
    duration: '',
    skills: '',
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
      await axios.post('/api/farmer', formData);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='mx-auto max-w-xl rounded bg-white p-6 shadow'
    >
      <h2 className='mb-4 text-2xl font-bold'>Farmer Form</h2>
      <label className='mb-2 block'>Help Needed</label>
      <select
        name='helpType'
        value={formData.helpType}
        onChange={handleChange}
        className='mb-4 w-full rounded border p-2'
      >
        <option value=''>Select</option>
        <option value='harvest'>Harvest</option>
        <option value='packaging'>Packaging</option>
        <option value='distribution'>Distribution</option>
      </select>
      <label className='mb-2 block'>Location</label>
      <input
        name='location'
        value={formData.location}
        onChange={handleChange}
        className='mb-4 w-full rounded border p-2'
        placeholder='Enter your location'
      />
      <label className='mb-2 block'>Duration</label>
      <input
        name='duration'
        value={formData.duration}
        onChange={handleChange}
        className='mb-4 w-full rounded border p-2'
        placeholder='Enter duration (e.g., 2 weeks)'
      />
      <label className='mb-2 block'>Skills Needed</label>
      <input
        name='skills'
        value={formData.skills}
        onChange={handleChange}
        className='mb-4 w-full rounded border p-2'
        placeholder='Enter required skills'
      />
      <button
        type='submit'
        className='w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600'
      >
        Submit
      </button>
    </form>
  );
}
