// app/bookings/success/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const email = searchParams.get('email'); // Get email from URL
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId || !email) {
      setTimeout(() => router.push('/packages'), 3000);
      return;
    }

    // Optionally fetch booking details from your database
    // const fetchBooking = async () => {
    //   const res = await fetch(`/api/bookings?email=${email}&session_id=${sessionId}`);
    //   const data = await res.json();
    //   setBooking(data);
    //   setLoading(false);
    // };
    // fetchBooking();

    setLoading(false);
  }, [sessionId, email, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center p-8">
          <div className="animate-spin text-4xl mb-4">⌛</div>
          <p>Verifying your booking...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="text-6xl mb-4 animate-bounce">✅</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Booking Confirmed!</h1>
        <p className="text-gray-600 mb-4">Thank you for booking with Vision To The World!</p>
        <p className="text-sm text-gray-500 font-mono bg-gray-50 p-2 rounded">
          Transaction ID: {sessionId}
        </p>

        <div className="mt-8 space-y-6">
          <div className="text-gray-700">
            <strong className="block mb-2">Next Steps:</strong>
            <p>Check your email ({email}) for confirmation details.</p>
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
              onClick={() => router.push('/')}
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