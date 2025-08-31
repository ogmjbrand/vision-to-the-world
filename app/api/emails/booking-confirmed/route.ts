// app/api/emails/booking-confirmed/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST() {
  try {
    // Check if API key exists
    if (!process.env.RESEND_API_KEY) {
      console.error('re_PPeAa9z8_4Eb3ZCNTpWZu1pbhuqAqMih7');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Your email sending code here...
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'kharmony987@gmail.com',
      subject: 'Booking Confirmed',
      html: '<p>Your booking has been confirmed!</p>'
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}