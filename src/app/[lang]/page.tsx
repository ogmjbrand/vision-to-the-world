// src/app/[lang]/page.tsx
'use client';

import { useLocale } from 'next-intl';
import PackageCard from '@/components/PackageCard';
import WhatsAppButton from '@/components/WhatsAppButton';
import Footer from '@/components/Footer';

export default function Home() {
  const locale = useLocale();

  // ✅ Type-safe translations
  const translations = {
    en: { 
      title: 'Vision To The World', 
      tagline: 'See The World With Us', 
      book_now: 'Book Now', 
      packages: 'Packages' 
    },
    fr: { 
      title: 'Vision To The World', 
      tagline: 'Voyagez avec nous', 
      book_now: 'Réserver', 
      packages: 'Forfaits' 
    },
    ar: { 
      title: 'فيجن تو ذا وورلد', 
      tagline: 'شاهد العالم معنا', 
      book_now: 'احجز الآن', 
      packages: 'الباقات' 
    },
  } as const;

  type Locale = keyof typeof translations;
  const lang = locale as Locale;
  const t = translations[lang];

  const packages = [
    {
      id: 'paris',
      title: 'Paris Elegance Package',
      location: 'Paris, France',
      duration: '7 Days / 6 Nights',
      price: 4200,
      image: '/packages/paris.jpg',
      highlights: ['5-Star Hotel', 'Eiffel Tower Dinner', 'Louvre Tour', 'Champagne Cruise'],
    },
    {
      id: 'maldives',
      title: 'Maldives Overwater Villa',
      location: 'Maldives',
      duration: '5 Days / 4 Nights',
      price: 3800,
      image: '/packages/maldives.jpg',
      highlights: ['Overwater Bungalow', 'Spa & Wellness', 'Snorkeling Tour', 'Candlelit Dinner'],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="font-bold text-xl">🎯 {t.title}</div>
          <nav className="space-x-6">
            <a href={`/${locale}/packages`} className="hover:text-blue-600">{t.packages}</a>
            <a href={`/${locale}/contact`} className="hover:text-blue-600">Contact</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">{t.tagline}</h1>
        
        {/* YouTube Section */}
        <section className="py-16 bg-gray-900 text-white text-center">
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
        </section>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </main>

      <WhatsAppButton />
      <Footer />
    </div>
  );
}