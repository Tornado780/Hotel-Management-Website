import { useState } from "react";
import BookingConfirmationModal from "./BookingConfirmationModal"; // Make sure this path is correct

export default function BookingForm({ hotelId, roomId, pricePerNight }) {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ← send cookie
        body: JSON.stringify({
          hotelId,
          roomId,
          guests,
          price: pricePerNight,
          checkIn: checkInDate,
          checkOut: checkOutDate,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Show "Pay Now or Later" modal after successful booking
        setShowPaymentModal(true);
        alert("Booking successful!");
      } else {
        alert(data.message || "Booking failed");
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-start md:items-center justify-between
                   bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] rounded-xl mt-16 p-6
                   mx-auto max-w-6xl"
      >
        <div className="flex flex-col flex-wrap gap-4 md:flex-row items-start md:items-center md:gap-10 text-gray-500">

          <div className="flex flex-col">
            <label htmlFor="checkInDate" className="font-medium">Check-in Date</label>
            <input
              id="checkInDate"
              type="date"
              required
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
            />
          </div>

          <div className="w-px bg-gray-500/70 h-15 max-md:hidden" />

          <div className="flex flex-col">
            <label htmlFor="checkOutDate" className="font-medium">Check-out Date</label>
            <input
              id="checkOutDate"
              type="date"
              required
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
            />
          </div>

          <div className="w-px bg-gray-500/70 h-15 max-md:hidden" />

          <div className="flex flex-col">
            <label htmlFor="guests" className="font-medium">Guests</label>
            <input
              id="guests"
              type="number"
              min={1}
              required
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-amber-500 hover:bg-primary-dull active:scale-95 transition-all
                     rounded-md max-md:w-full max-md:mt-6 py-3 md:px-25 text-base cursor-pointer"
        >
          Book Now
        </button>
      </form>

      {/* Pay Now or Later Modal */}
      <BookingConfirmationModal
      show={showPaymentModal}
      onClose={() => setShowPaymentModal(false)}
      pricePerNight={pricePerNight} // ← pass the value
    />

    </>
  );
}
