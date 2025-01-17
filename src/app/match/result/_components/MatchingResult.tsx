'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function MatchingResult() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const res = await axios.get('/api/match');
      setMatches(res.data.matches);
    };

    fetchMatches();
  }, []);

  return (
    <div className='mx-auto mt-10 max-w-3xl rounded-lg bg-white p-6 shadow-md'>
      <h2 className='mb-4 text-2xl font-bold'>Match Results</h2>
      {matches.length > 0 ? (
        <ul className='list-disc pl-6'>
          {matches.map((match, index) => (
            <li key={index} className='mb-2'>
              {match}
            </li>
          ))}
        </ul>
      ) : (
        <p>No matches found yet.</p>
      )}
    </div>
  );
}
