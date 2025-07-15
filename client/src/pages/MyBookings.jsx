import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/bookings/my`, {
      credentials: 'include',
    })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setBookings(data))
      .catch((err) => {
        console.error('Failed to fetch bookings', err);
        setBookings([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
      <Title
        title="My Bookings"
        subTitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks."
        align="left"
      />

      {loading ? (
        <p className="text-center mt-20 text-gray-500">Loading your bookings...</p>
      ) : bookings.length === 0 ? (
        <div className="mt-20 flex flex-col items-center text-center text-gray-600">
          <img src={assets.totalBookingIcon|| assets.emptyIcon} alt="No bookings" className="w-48 h-48 mb-6" />
          <h2 className="text-2xl font-semibold">You have no bookings yet</h2>
          <p className="mt-2 max-w-md">
            Plan your next stay with us and experience premium comfort and convenience. Don’t miss out on our exclusive seasonal discounts!
          </p>
          <a
            href="/"
            className="mt-6 px-6 py-3 bg-amber-500 text-white rounded hover:bg-amber-600 transition-all"
          >
            Explore Hotels
          </a>
        </div>
      ) : (
        <>
          <div className="max-w-6xl mt-8 w-full text-gray-800">
            <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3">
              <div className="w-1/3">Hotels</div>
              <div className="w-1/3">Date & Timings</div>
              <div className="w-1/3">Payment</div>
            </div>
          </div>

          {bookings.map((booking) => (
            <div key={booking._id} className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t">
              {/* Hotel Details */}
              <div className="flex flex-col md:flex-row">
                <img
                  src={booking.room?.images?.[0] || assets.defaultRoomImage}
                  alt="hotel-img"
                  className="min-md:w-44 rounded shadow object-cover"
                />
                <div className="flex flex-col gap-1.5 max-md:mt-3 min-md:ml-4">
                  <p className="font-playfair text-2xl">
                    {booking.hotel?.name}
                    <span className="font-inter text-sm"> ({booking.room?.roomType})</span>
                  </p>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <img src={assets.locationIcon} alt="location-icon" />
                    <span>{booking.hotel?.address}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <img src={assets.guestsIcon} alt="guests-icon" />
                    <span>Guests: {booking.guests}</span>
                  </div>
                  <p className="text-base">Price: ${booking.price}</p>
                </div>
              </div>

              {/* Date */}
              <div className="flex flex-row md:items-center md:gap-12 mt-3 gap-8">
                <div>
                  <p>Check-In:</p>
                  <p className="text-gray-500 text-sm">{new Date(booking.checkIn).toDateString()}</p>
                </div>
                <div>
                  <p>Check-Out:</p>
                  <p className="text-gray-500 text-sm">{new Date(booking.checkOut).toDateString()}</p>
                </div>
              </div>
               
              {/* Payment */}
              <div className="flex flex-col items-start justify-center pt-3">
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${booking.paymentStatus==="completed" ? "bg-green-500" : "bg-red-500"}`}></div>
                  <p className={`text-sm ${booking.paymentStatus==="completed" ? "text-green-500" : "text-red-500"}`}>
                    {booking.paymentStatus==="completed" ? "Paid" : "Unpaid"}
                  </p>
                </div>

                {booking.paymentStatus !== "completed" && (
                <button
                  className="px-4 py-1.5 mt-4 text-xs border border-gray-400 rounded-full hover:bg-gray-50 transition-all cursor-pointer"
                  onClick={async () => {
                    try {
                      const res = await fetch("${import.meta.env.VITE_SERVER_URL}/api/payment/pay", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ total: booking.price || "10.00" }), // pass dynamic price
                      });
                      const data = await res.json();
                      window.location.href = data.url;
                    } catch (err) {
                      console.error("Payment initiation error:", err);
                      alert("Failed to redirect to payment.");
                    }
                  }}
                >
                  Pay Now
                </button>
              )}

              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default MyBookings;
