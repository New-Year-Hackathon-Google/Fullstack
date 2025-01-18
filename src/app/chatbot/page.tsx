'use client';

import React, { useState } from 'react';
import axios from 'axios';

interface Message {
  type: 'user' | 'bot';
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMessage: Message = { type: 'user', content: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt('');
    setLoading(true);

    try {
      const res = await axios.post('/api/gemini', { prompt });
      const botMessage: Message = { type: 'bot', content: res.data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      const errorMessage: Message = {
        type: 'bot',
        content: '오류가 발생했습니다. 다시 시도해주세요.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6'>
      <div className='flex w-full max-w-lg flex-col rounded-lg bg-white p-6 shadow-md'>
        <h1 className='mb-4 text-center text-2xl font-semibold text-gray-800'>
          AI Chatbot
        </h1>
        <div className='mb-4 flex-1 space-y-4 overflow-y-auto'>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs rounded-lg px-4 py-2 text-white ${
                  message.type === 'user'
                    ? 'bg-blue-500'
                    : 'bg-gray-300 text-gray-800'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className='flex items-center space-x-4'>
          <textarea
            className='flex-1 resize-none rounded-md border p-3 text-gray-800 focus:ring focus:ring-blue-300'
            rows={1}
            placeholder='메시지를 입력하세요...'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading}
          />
          <button
            type='submit'
            className='rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 disabled:opacity-50'
            disabled={loading}
          >
            {loading ? '...' : '전송'}
          </button>
        </form>
      </div>
    </div>
  );
}
