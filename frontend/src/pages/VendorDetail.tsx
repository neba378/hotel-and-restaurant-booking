import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Define the type for formData
interface FormData {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  description: string;
  facilities: string[];
  pricing: string;
  type: string;
  images: string[];
  totalNumber: string; // Added totalNumber
}

const VendorDetail: React.FC = () => {
  const { id } = useParams(); // Get listing ID from URL params
  interface Listing {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    description: string;
    facilities: string[];
    pricing: string;
    type: string;
    images: string[];
    totalNumber: string;
  }

  const [listing, setListing] = useState<Listing | null>(null);
  const [editable, setEditable] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    description: "",
    facilities: [],
    pricing: "",
    type: "",
    images: [],
    totalNumber: "", // Initialize totalNumber field
  });
  const navigate = useNavigate();

  // Fetch the vendor's listing details when the component mounts
  useEffect(() => {
    const fetchListing = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `https://hotel-and-restaurant-booking-production.up.railway.app/api/vendor/listings/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);

        const data = await response.json();
        if (response.ok) {
          console.log("dd", data);
          setListing(data);
          setFormData({
            ...data,
            totalNumber: data.totalNumber || "", // Add totalNumber to form data
          });
        } else {
          console.error("Failed to fetch listing:", data.message);
        }
      } catch (error) {
        console.error("Error fetching listing:", error);
      }
    };

    fetchListing();
  }, [id, navigate]);

  // Handle input change for editable fields
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle editing the listing details
  const handleEdit = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `https://hotel-and-restaurant-booking-production.up.railway.app/api/vendor/listings/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setListing(data);
        setEditable(false); // Disable editing after saving
        alert("Listing updated successfully");
      } else {
        console.error("Failed to update listing:", data.message);
        alert("Error updating listing");
      }
    } catch (error) {
      console.error("Error updating listing:", error);
      alert("Error updating listing");
    }
  };

  // Handle deleting the listing
  const handleDelete = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      navigate("/login");
      return;
    }

    const confirmation = window.confirm(
      "Are you sure you want to delete this listing?"
    );
    if (!confirmation) return;

    try {
      const response = await fetch(
        `https://hotel-and-restaurant-booking-production.up.railway.app/api/vendor/listings/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Listing deleted successfully");
        navigate("/vendor-listings");
      } else {
        console.error("Failed to delete listing:", data.message);
        alert("Error deleting listing");
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
      alert("Error deleting listing");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold">Vendor Listing Details</h2>

      {listing ? (
        <div className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!editable}
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>

            <div>
              <label className="block font-medium">Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!editable}
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>

            <div>
              <label className="block font-medium">City:</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                disabled={!editable}
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>

            <div>
              <label className="block font-medium">State:</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                disabled={!editable}
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>

            <div>
              <label className="block font-medium">Zip:</label>
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleInputChange}
                disabled={!editable}
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>

            <div>
              <label className="block font-medium">Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                disabled={!editable}
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>

            <div>
              <label className="block font-medium">Pricing:</label>
              <input
                type="number"
                name="pricing"
                value={formData.pricing}
                onChange={handleInputChange}
                disabled={!editable}
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>

            {/* Total Number Field */}
            <div>
              <label className="block font-medium">Total Number:</label>
              <input
                type="number"
                name="totalNumber"
                value={formData.totalNumber}
                onChange={handleInputChange}
                disabled={!editable}
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex space-x-4">
            {editable ? (
              <button
                onClick={handleEdit}
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setEditable(true)}
                className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
            )}

            <button
              onClick={handleDelete}
              className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default VendorDetail;
