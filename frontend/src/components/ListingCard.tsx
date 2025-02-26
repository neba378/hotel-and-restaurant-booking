import React from "react";
import { useNavigate } from "react-router-dom";

interface ListingCardProps {
  _id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  description: string;
  pricing: number;
  type: string;
  images: string[];
  totalNumber: number; // Add totalNumber to props
}

const ListingCard: React.FC<ListingCardProps> = ({
  _id,
  name,
  address,
  city,
  state,
  zip,
  description,
  pricing,
  type,
  images,
  totalNumber, // Destructure totalNumber from props
}) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userRole = user.role;

    if (userRole === "vendor") {
      // For vendor, navigate to the vendor's detail page
      navigate(`/vendor-detail/${_id}`);
    } else if (userRole === "customer") {
      // For customer, navigate to the customer's detail page
      navigate(`/customer-detail/${_id}`);
    } else {
      // Fallback in case the role is not found
      console.error("User role not found");
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer border border-gray-300 rounded-lg shadow-lg p-4 hover:shadow-xl transition-transform transform hover:scale-105"
    >
      <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white">
        <img
          src={images.length > 0 ? images[0] : "/default-image.jpg"}
          alt={name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-500">{address}</p>
          <p className="text-sm text-gray-500">
            {city}, {state} {zip}
          </p>
          <p className="text-sm text-gray-700 mt-2">{description}</p>

          {/* Display total number of rooms/tables */}
          <p className="text-sm text-gray-600 mt-2">
            {totalNumber} {type === "hotel" ? "rooms" : "tables"} available
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900">
              ${pricing.toFixed(2)}
            </span>
            <span className="px-2 py-1 text-xs bg-blue-600 text-white rounded-full">
              {type}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
