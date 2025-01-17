'use client';

import axios from 'axios';
import { useState } from 'react';

export default function Chat() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResponse('');

    try {
      const res = await axios.post('/api/openAi', { prompt });
      setResponse(res.data.response);
    } catch (error) {
      setResponse('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mx-auto mt-10 max-w-2xl rounded-lg bg-white p-6 shadow-md'>
      <h1 className='mb-4 text-center text-2xl font-bold'>AI Chat Assistant</h1>
      <textarea
        className='w-full rounded-md border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder='Ask me something...'
        rows={4}
        disabled={loading}
      ></textarea>
      <button
        className={`mt-4 w-full rounded-md bg-blue-500 px-4 py-2 font-semibold text-white transition hover:bg-blue-600 ${
          loading || !prompt.trim() ? 'cursor-not-allowed opacity-50' : ''
        }`}
        onClick={handleSubmit}
        disabled={loading || !prompt.trim()}
      >
        {loading ? 'Loading...' : 'Send'}
      </button>
      <div className='mt-6 rounded-md bg-gray-100 p-4'>
        <p className='text-gray-700'>
          {response || 'Your response will appear here.'}
        </p>
      </div>
    </div>
  );
}
