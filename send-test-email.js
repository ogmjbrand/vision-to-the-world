// send-test-email.js
import { Resend } from 'resend';

const resend = new Resend('re_PPeAa9z8_4Eb3ZCNTpWZu1pbhuqAqMih7');

async function sendEmail() {
  try {
    console.log('Sending test email...');
    
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'kharmony987@gmail.com',
      subject: 'Hello from Vision to the World!',
      html: '<p>Congrats on sending your <strong>first email</strong> from your Next.js app!</p>'
    });

    if (error) {
      console.error('Error sending email:', error);
      return;
    }

    console.log('✅ Email sent successfully!', data);
  } catch (err) {
    console.error('❌ Failed to send email:', err);
  }
}

sendEmail();