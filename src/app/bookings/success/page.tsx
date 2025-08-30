// app/bookings/success/page.tsx
'use client'; // ✅ Enables client-side features like hooks

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  // Redirect after 3 seconds if no session ID
  useEffect(() => {
    if (!sessionId) {
      const timer = setTimeout(() => {
        router.push('/packages');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [sessionId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Booking Confirmed!</h1>
        <p className="text-gray-600 mb-4">Your trip is secured with instant confirmation.</p>
        <p className="text-sm text-gray-500">Transaction ID: {sessionId || 'N/A'}</p>

        <div className="mt-6">
          <p className="text-gray-700">
            <strong>Next Steps:</strong><br />
            You'll receive a confirmation email shortly.<br />
            For instant updates,{' '}
            <a
             href="https://wa.me/17164305246"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline font-medium"
            >// Trigger re-deploy
              chat with us on WhatsApp
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}