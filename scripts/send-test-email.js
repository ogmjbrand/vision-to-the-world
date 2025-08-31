import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Vision To The World <onboarding@resend.dev>',
      to: ['kharmony987@gmail.com'],
      subject: 'Hello from Vision to the World!',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h1 style="color: #2563eb;">Vision To The World</h1>
          <p>Congrats on sending your <strong>first email</strong> from your Next.js app!</p>
          <p>This is a test email to verify your Resend configuration.</p>
          <hr style="border: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="color: #6b7280; font-size: 14px;">
            Sent from Vision To The World booking system
          </p>
        </div>
      `
    });

    if (error) {
      console.error('Error sending email:', error);
      return;
    }

    console.log('Email sent successfully!', data);
  } catch (err) {
    console.error('Failed to send email:', err);
  }
}

sendEmail();