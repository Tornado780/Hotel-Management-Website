export default function BookingConfirmationModal({ show, onClose,pricePerNight }) {
  if (!show) return null;

  const handlePayNow = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/payment/pay`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ total: pricePerNight }), // pass the actual amount
  });
  const data = await res.json();
  window.location.href = data.url;
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm text-center">
        <h2 className="text-lg font-bold mb-3">🎉 Booking Confirmed</h2>
        <p className="mb-6">Do you want to pay now or later?</p>
        <div className="flex justify-center gap-4">
          <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">
            Pay Later
          </button>
          <button onClick={handlePayNow} className="bg-blue-600 text-white px-4 py-2 rounded">
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}
