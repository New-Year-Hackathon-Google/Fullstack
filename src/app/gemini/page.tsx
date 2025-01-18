'use client';

import React, { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setResponse(data.response);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='min-h-screen p-8'>
      <div className='mx-auto max-w-2xl'>
        <h1 className='mb-6 text-2xl font-bold'>Gemini Chat</h1>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder='Ask something...'
              className='min-h-[100px] w-full rounded-lg border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
              disabled={loading}
            />
          </div>

          <button
            type='submit'
            disabled={loading || !prompt.trim()}
            className='w-full rounded-lg bg-blue-500 p-4 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50'
          >
            {loading ? 'Generating...' : 'Send'}
          </button>

          {error && (
            <div className='rounded-lg bg-red-50 p-4 text-red-500'>{error}</div>
          )}

          {response && (
            <div className='mt-6 rounded-lg bg-gray-50 p-6'>
              <h2 className='mb-2 font-semibold'>Response:</h2>
              <div className='whitespace-pre-wrap'>{response}</div>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
