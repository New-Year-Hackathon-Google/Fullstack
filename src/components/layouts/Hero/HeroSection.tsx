'use client';

import Chatbot from '@/components/chatbot/page';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className='relative flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500'>
      {/* Overlay Pattern */}
      <Chatbot />
      <div
        className='absolute inset-0 bg-black opacity-10'
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="white" fill-opacity="0.1" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      {/* Main Content */}
      <div className='relative z-10 px-4 text-center sm:px-6 lg:px-8'>
        <h1 className='animate-fade-in-up mb-6 text-4xl font-bold text-white sm:text-6xl'>
          Welcome to our Silver Bridge Service
        </h1>
        <p className='mx-auto mb-8 max-w-2xl text-xl text-white/90 sm:text-2xl'>
          We provide real-time updates on patients' conditions and support them
          with AI technology by analyzing their current state, predicting
          potential illnesses, and suggesting possible ways to improve their
          health.
        </p>

        {/* CTA Buttons */}
        <div className='flex flex-row items-center justify-center gap-4'>
          <Link
            href='/guardian'
            className='group flex items-center rounded-full bg-white px-8 py-3 font-semibold text-purple-600 transition-all duration-200 hover:bg-opacity-90'
          >
            Get Started
            <ArrowRight className='ml-2 transition-transform group-hover:translate-x-1' />
          </Link>
          <button className='rounded-full border-2 border-white bg-transparent px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-white/10'>
            Learn More
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className='absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce'>
          <ChevronDown className='h-8 w-8 text-white' />
        </div>
      </div>

      {/* Background Shapes */}
      <div className='pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden'>
        <div className='animate-float absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-white/10 mix-blend-overlay blur-xl filter' />
        <div className='animate-float-delayed absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-white/10 mix-blend-overlay blur-xl filter' />
      </div>
    </div>
  );
};

export default HeroSection;
