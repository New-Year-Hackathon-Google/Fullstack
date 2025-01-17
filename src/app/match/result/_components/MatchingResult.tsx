'use client';

import { useState } from 'react';
import axios from 'axios';

interface Match {
  farmer: string; // Farmer ID
  youth: string; // Youth Name
}

export default function MatchingResult() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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

    try {
      setLoading(true);
      setError('');
      setMatches([]);
      const response = await axios.post('/api/match', formData);
      setMatches(response.data.matches);
    } catch (err) {
      console.error('Error fetching matches:', err);
      setError('Failed to fetch match results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='mx-auto max-w-4xl'>
        <form
          onSubmit={handleSubmit}
          className='mb-8 rounded-lg bg-white p-6 shadow-md'
        >
          <h2 className='mb-4 text-2xl font-bold text-gray-800'>
            Find Matching Farmers
          </h2>
          <div className='mb-4'>
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              Your Name
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
              Skills
            </label>
            <textarea
              name='skills'
              value={formData.skills}
              onChange={handleChange}
              className='w-full rounded border-gray-300 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
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
              className='w-full rounded border-gray-300 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
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
              className='w-full rounded border-gray-300 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
              placeholder='Enter your availability (e.g., weekends, 2 weeks)'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full rounded bg-blue-500 p-3 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            disabled={loading}
          >
            {loading ? 'Finding Matches...' : 'Find Matches'}
          </button>
        </form>

        <div className='rounded-lg bg-white p-6 shadow-md'>
          <h2 className='mb-4 text-2xl font-bold text-gray-800'>
            Matching Results
          </h2>
          {error && <p className='mb-4 text-red-600'>{error}</p>}
          {loading && <p className='mb-4 text-gray-600'>Loading matches...</p>}
          {!loading && matches.length > 0 && (
            <ul className='space-y-4'>
              {matches.map((match, index) => (
                <li
                  key={index}
                  className='flex items-center justify-between rounded-lg bg-gray-100 p-4 shadow-sm hover:bg-gray-200'
                >
                  <div>
                    <p className='text-lg font-semibold text-gray-700'>
                      Farmer ID: {match.farmer}
                    </p>
                    <p className='text-sm text-gray-500'>
                      Matched for Youth: {match.youth}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {!loading && matches.length === 0 && !error && (
            <p className='text-lg text-gray-700'>No matches found yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
