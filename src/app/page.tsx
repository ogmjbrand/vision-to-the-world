// src/app/page.tsx
// Build trigger - final push

import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useState } from 'react';
// import CashAppModal from '@/components/CashAppModal';
// If the file exists at src/components/CashAppModal.tsx, ensure it is present.
// Otherwise, update the path below to the correct location or comment out/remove this import if not needed.

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* YouTube Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Travel Inspiration</h2>
          <p className="mb-8 max-w-2xl mx-auto text-gray-300">
            Watch real journeys and get inspired for your next adventure.
          </p>
          <div className="flex justify-center">
            <div className="aspect-video max-w-4xl w-full rounded-lg overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/videoseries?list=LL"
                title="Vision To The World - Travel Vlogs"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
          <div className="mt-8">
            <a
              href="https://www.youtube.com/@visiontotheworld"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-red-600 text-white px-6 py-3 rounded-full font-medium hover:bg-red-700 transition"
            >
              🔔 Subscribe on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Components */}
      <WhatsAppButton />
      <Footer />

      {/* Cash App Modal Trigger */}
      {/* {showModal && (
        <CashAppModal amount={100} onClose={() => setShowModal(false)} />
      )} */}
    </>
  );
}