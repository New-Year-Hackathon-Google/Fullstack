'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import useYouthStore from '@/store/youthStore';

export default function MatchingResult() {
  const { name, skills, location, availability } = useYouthStore();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.post('/api/match', {
          name,
          skills,
          location,
          availability,
        });
        setMatches(response.data.matches);
      } catch (err) {
        console.error('Error fetching matches:', err);
        setError('Failed to fetch match results. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [name, skills, location, availability]);

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md'>
        <h2 className='mb-4 text-2xl font-bold text-gray-800'>
          Matching Results
        </h2>
        {loading && <p className='text-gray-700'>Loading match results...</p>}
        {error && <p className='text-red-600'>{error}</p>}
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
  );
}
