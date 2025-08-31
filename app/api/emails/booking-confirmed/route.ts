import { NextResponse } from "next/server";
import { Resend } from "resend"; // or resend provider 
// Initialize email provider
const resend = new Resend(process.env.RESEND_API_KEY); // example with Resend

export async function POST(req: Request) {
  try {
    const body = await req.json(); 

    const { user_email, packageId } = body; // 👈 values you send from frontend
    
    // Send email
    const data = await resend.emails.send({
      from: "Vision to the world <no-reply@visiontotheworld.com>", 
      to: user_email,
      subject: "Booking Confirmed ✅",
      html: `
        <h1>Thank you for your booking!</h1>
        <p>Your package ID: <b>${packageId}</b></p>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error });
  }
}