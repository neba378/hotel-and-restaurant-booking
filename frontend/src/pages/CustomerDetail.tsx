import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CustomerDetail: React.FC = () => {
  interface Listing {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    description: string;
    images: string[];
    type: string;
    totalRooms: number;
  }

  const [listing, setListing] = useState<Listing | null>(null);
  const [bookingDate, setBookingDate] = useState("");
  const [error, setError] = useState<string>("");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [availableRooms, setAvailableRooms] = useState<number>(0);
  const pricePerRoomOrTable = 100; // Price for each room/table

  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          `https://hotel-and-restaurant-booking-production.up.railway.app:8000/api/user/services/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setListing(data);
          setAvailableRooms(data.totalRooms); // Assuming the backend sends totalRooms
        } else {
          setError(data.message);
        }
      } catch (error) {
        console.error("Error fetching listing details:", error);
        setError("An error occurred while fetching the details.");
      }
    };

    fetchListingDetails();
  }, [id, navigate]);

  const handleBooking = async () => {
    if (!bookingDate) {
      setError("Please select a booking date.");
      return;
    }

    if (availableRooms <= 0) {
      setError("No available rooms/tables left.");
      return;
    }

    

    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(`https://hotel-and-restaurant-booking-production.up.railway.app:8000/api/user/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ listingId: id, bookingDate }),
      });

      const data = await response.json();
      if (response.ok) {
        setError(""); // Clear any previous error messages
        alert("Booking successfully made!");
setAvailableRooms(availableRooms - 1);
        await fetch(`https://hotel-and-restaurant-booking-production.up.railway.app:8000/api/user/services/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        navigate("/customer-listings");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error making booking:", error);
      setError("An error occurred while making the booking.");
    }
  };

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!listing) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/2 mb-6 sm:mb-0">
          <img
            src={
              listing.images.length > 0
                ? listing.images[0]
                : "/default-image.jpg"
            }
            alt={listing.name}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        <div className="w-full sm:w-1/2 pl-0 sm:pl-6">
          <h2 className="text-3xl font-semibold text-gray-800">
            {listing.name}
          </h2>
          <p className="text-sm text-gray-500">{listing.address}</p>
          <p className="text-sm text-gray-500">
            {listing.city}, {listing.state} {listing.zip}
          </p>
          <p className="text-sm text-gray-700 mt-2">{listing.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900">
              ${pricePerRoomOrTable}
            </span>
            <span className="px-2 py-1 text-xs bg-blue-600 text-white rounded-full">
              {listing.type}
            </span>
          </div>

          {/* Booking Form */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Make a Booking</h3>

            <label htmlFor="bookingDate" className="block text-gray-700 mt-4">
              Select a date:
            </label>
            <input
              type="date"
              id="bookingDate"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]} // Disable past dates
              className="p-2 border border-gray-300 rounded mt-2 w-full"
            />

            {/* Total section */}
            <div className="mt-6 bg-gray-100 p-4 rounded-md">
              <h4 className="font-semibold">Total Price: </h4>
              <p className="text-lg text-gray-700">${pricePerRoomOrTable}</p>
              <p className="text-sm text-gray-500">
                Available rooms/tables: {availableRooms}
              </p>
            </div>

            <div className="mt-6">
              <button
                onClick={handleBooking}
                className="p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
