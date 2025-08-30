'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Redirect if no session ID is present
    if (!sessionId) {
      const timer = setTimeout(() => router.push('/packages'), 3000);
      return () => clearTimeout(timer); // Cleanup timeout on unmount
    }
  }, [sessionId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="text-6xl mb-4 animate-bounce">✅</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Booking Confirmed!
        </h1>
        <p className="text-gray-600 mb-4">
          Your trip is secured with instant confirmation.
        </p>
        <p className="text-sm text-gray-500 font-mono">
          Transaction ID: {sessionId || 'N/A'}
        </p>

        <div className="mt-8 space-y-4">
          <p className="text-gray-700">
            <strong className="block mb-2">Next Steps:</strong>
            You'll receive a confirmation email shortly.
          </p>
          
          <a 
            href="https://wa.me/17164305246" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <span className="mr-2">💬</span>
            Chat with us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}