'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function MatchingResult() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/match');
        setMatches(response.data.matches);
      } catch (err) {
        console.error('Error fetching matches:', err);
        setError('Failed to fetch match results. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <p className='text-xl font-semibold text-gray-700'>
            Loading match results...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <p className='text-xl font-semibold text-red-600'>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 p-4'>
      <div className='mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md'>
        <h2 className='mb-6 text-2xl font-bold text-gray-800'>
          Matching Results
        </h2>
        {matches.length > 0 ? (
          <ul className='space-y-4'>
            {matches.map((match, index) => (
              <li
                key={index}
                className='flex justify-between rounded-lg bg-gray-100 p-4 shadow-sm hover:bg-gray-200'
              >
                <div>
                  <p className='text-lg font-semibold text-gray-700'>
                    Farmer ID: {match.farmer}
                  </p>
                  <p className='text-sm text-gray-500'>
                    Matched with Youth ID: {match.youth}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-lg text-gray-700'>No matches found yet.</p>
        )}
      </div>
    </div>
  );
}
