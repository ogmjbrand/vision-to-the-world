// src/components/PackageCard.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function PackageCard({ pkg }) {
  const [isBooking, setIsBooking] = useState(false);
  const totalWithFee = Math.round(pkg.price * 1.05 * 100) / 100;

  const handleStripe = async () => {
    setIsBooking(true);
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      body: JSON.stringify({
        price: totalWithFee,
        package: pkg.title,
        packageId: pkg.id,
      }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    setIsBooking(false);
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden">
      <div className="relative h-48">
        <Image src={pkg.image} alt={pkg.title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold">{pkg.title}</h3>
        <p>{pkg.location} • {pkg.duration}</p>
        <p className="text-2xl font-bold text-blue-600">${pkg.price}</p>
        <p className="text-xs">+5% fee → Total: ${totalWithFee}</p>

        <button
          onClick={handleStripe}
          disabled={isBooking}
          className="w-full bg-blue-600 text-white py-3 rounded mt-4 hover:bg-blue-700"
        >
          {isBooking ? 'Processing...' : '✅ Book Now'}
        </button>
      </div>
    </div>
  );
}