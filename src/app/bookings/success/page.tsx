// app/bookings/success/page.tsx
export default function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center p-8 bg-white rounded shadow">
        <h1 className="text-3xl font-bold text-green-600">✅ Booking Confirmed!</h1>
        <p>You'll receive a confirmation email shortly.</p>
        <a href="/" className="text-blue-600">← Back Home</a>
      </div>
    </div>
  );
}