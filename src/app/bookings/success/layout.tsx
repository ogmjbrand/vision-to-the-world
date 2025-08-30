import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Booking Confirmed | Vision To The World',
  description: 'Your booking has been confirmed successfully',
  openGraph: {
    title: 'Booking Confirmed | Vision To The World',
    description: 'Your booking has been confirmed successfully',
    type: 'website'
  }
};

interface LayoutProps {
  children: ReactNode;
}

export default function SuccessLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-green-50">
      {children}
    </div>
  );
}