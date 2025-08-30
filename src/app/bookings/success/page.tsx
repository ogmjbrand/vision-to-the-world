'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const handleHomeClick = () => {
    setIsTransitioning(true);
    router.push('/');
  };

  useEffect(() => {
    // Validate session
    if (!sessionId) {
      setError('No booking session found');
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        router.push('/');
      }, 3000);
      return () => clearTimeout(timer);
    }

    // Validate session format
    if (!sessionId.startsWith('cs_')) {
      setError('Invalid booking session');
      setIsTransitioning(true);
      router.push('/');
      return;
    }

    // Log successful booking
    try {
      console.log('Booking confirmed:', sessionId);
    } catch (err) {
      console.error('Logging error:', err);
    }

    setIsLoading(false);
  }, [sessionId, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center p-8">
          <div className="animate-spin text-4xl mb-4">⌛</div>
          <p>Verifying your booking...</p>
        </div>
      </div>
    );
  }

  if (!sessionId || isTransitioning || error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center p-8">
          <div className="animate-spin text-4xl mb-4">⌛</div>
          <p>{error || 'Redirecting to homepage...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="text-6xl mb-4 animate-bounce">✅</div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Booking Confirmed!
        </h1>
        
        <p className="text-gray-600 mb-4">
          Thank you for booking with Vision To The World!
        </p>
        
        <p className="text-sm text-gray-500 font-mono bg-gray-50 p-2 rounded">
          Transaction ID: {sessionId}
        </p>

        <div className="mt-8 space-y-6">
          <div className="text-gray-700">
            <strong className="block mb-2">Next Steps:</strong>
            <p>Check your email for booking confirmation details.</p>
          </div>
          
          <a 
            href="https://wa.me/17164305246" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <span className="mr-2">💬</span>
            Need help? Chat with us
          </a>

          <div className="pt-4 border-t">
            <button 
              onClick={handleHomeClick}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}