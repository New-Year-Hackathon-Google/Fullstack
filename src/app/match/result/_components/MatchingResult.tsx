'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import useYouthStore from '@/store/useYouthStore';

interface Farmer {
  name: string;
  type: string;
  imageUrl: string;
  duration: string;
}

interface Match {
  farmer: Farmer;
  youth: string;
}

export default function MatchingResult() {
  const { name, skills, location, availability } = useYouthStore();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.post('/api/match-mongodb', {
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
                className='flex items-center space-x-4 rounded-lg bg-gray-100 p-4 shadow-sm hover:bg-gray-200'
              >
                <img
                  src={match.farmer.imageUrl}
                  alt={match.farmer.name}
                  className='h-16 w-16 rounded-full object-cover'
                />
                <div>
                  <p className='text-lg font-semibold text-gray-700'>
                    {match.farmer.name}
                  </p>
                  <p className='text-sm text-gray-500'>
                    Help Needed: {match.farmer.type}
                  </p>
                  <p className='text-sm text-gray-500'>
                    Duration: {match.farmer.duration}
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
