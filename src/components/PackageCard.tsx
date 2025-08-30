// src/components/PackageCard.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Package {
  id: string;
  title: string;
  price: number;
  image: string;
  location: string;
  duration: string;
}

export default function PackageCard({ pkg }: { pkg: Package }) {
  const [isBooking, setIsBooking] = useState(false);
  const totalWithFee = Math.round(pkg.price * 1.05 * 100) / 100;

  const handleStripeCheckout = async () => {
    setIsBooking(true);
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price: totalWithFee,
          package: pkg.title,
          packageId: pkg.id,
          user: {
            name: 'Guest',
            email: 'guest@example.com',
          },
        }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Failed to start booking. Please try again.');
    }
    setIsBooking(false);
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden">
      <div className="relative h-48">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold">{pkg.title}</h3>
        <p>{pkg.location} • {pkg.duration}</p>
        <p className="text-2xl font-bold text-blue-600">${pkg.price}</p>
        <p className="text-xs text-gray-500">+5% fee → Total: ${totalWithFee}</p>

        <button
          onClick={handleStripeCheckout}
          disabled={isBooking}
          className="w-full bg-blue-600 text-white py-3 rounded mt-4 hover:bg-blue-700"
        >
          {isBooking ? 'Processing...' : '✅ Book Now (Instant)'}
        </button>
      </div>
    </div>
  );
}