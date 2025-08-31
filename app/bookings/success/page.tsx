'use client';

import { Suspense } from 'react';

function SuccessContent() {
  const { useSearchParams } = require('next/navigation');
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const status = searchParams.get('status');
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Booking Successful!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for your booking. Your reservation has been confirmed.
        </p>

        {bookingId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm font-medium text-gray-700">Booking Reference</p>
            <p className="text-lg font-bold text-gray-900">{bookingId}</p>
          </div>
        )}

        <button
          onClick={() => window.location.href = '/'}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}