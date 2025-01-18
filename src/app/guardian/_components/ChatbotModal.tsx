'use client';

import React, { useState } from 'react';
import axios from 'axios';

interface ChatbotProps {
  buttonLabel?: string;
  apiEndpoint: string;
}

const ChatbotModal: React.FC<ChatbotProps> = ({
  buttonLabel = '챗봇 열기',
  apiEndpoint,
}) => {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setQuestion('');
    setResponse('');
  };

  const handleAsk = async () => {
    if (!question.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post(apiEndpoint, { prompt: question });
      setResponse(res.data.response || '답변을 가져올 수 없습니다.');
    } catch (error) {
      setResponse('오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className='fixed bottom-4 right-4 rounded-full bg-blue-500 px-4 py-2 text-white shadow-lg hover:bg-blue-600'
      >
        {buttonLabel}
      </button>
      {open && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='w-full max-w-md rounded bg-white p-6 shadow-lg'>
            <h2 className='mb-4 text-xl font-bold'>AI 챗봇</h2>
            <textarea
              placeholder='질문을 입력하세요'
              rows={4}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className='mb-4 w-full rounded border p-2 focus:outline-none focus:ring focus:ring-blue-300'
            />
            <button
              onClick={handleAsk}
              disabled={loading}
              className={`w-full rounded px-4 py-2 text-white ${loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'}`}
            >
              {loading ? '응답 생성 중...' : '질문하기'}
            </button>
            {response && (
              <div className='mt-4 rounded border bg-gray-100 p-4'>
                <p>{response}</p>
              </div>
            )}
            <button
              onClick={handleClose}
              className='mt-4 w-full rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600'
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotModal;
