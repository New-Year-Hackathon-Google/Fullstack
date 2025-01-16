'use client';

import { useState } from 'react';
import axios from 'axios';

export default function YouthForm() {
  const [formData, setFormData] = useState({
    availableHelp: '',
    location: '',
    availability: '',
    skills: '',
    interests: '',
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
      await axios.post('/api/youth', formData);
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
      <h2 className='mb-4 text-2xl font-bold'>Youth Form</h2>
      <label className='mb-2 block'>Available Help</label>
      <select
        name='availableHelp'
        value={formData.availableHelp}
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
      <label className='mb-2 block'>Availability</label>
      <input
        name='availability'
        value={formData.availability}
        onChange={handleChange}
        className='mb-4 w-full rounded border p-2'
        placeholder='Enter your availability (e.g., weekends, 3 weeks)'
      />
      <label className='mb-2 block'>Skills</label>
      <input
        name='skills'
        value={formData.skills}
        onChange={handleChange}
        className='mb-4 w-full rounded border p-2'
        placeholder='Enter your skills'
      />
      <label className='mb-2 block'>Interests</label>
      <input
        name='interests'
        value={formData.interests}
        onChange={handleChange}
        className='mb-4 w-full rounded border p-2'
        placeholder='Enter your interests'
      />
      <button
        type='submit'
        className='w-full rounded bg-green-500 p-2 text-white hover:bg-green-600'
      >
        Submit
      </button>
    </form>
  );
}
