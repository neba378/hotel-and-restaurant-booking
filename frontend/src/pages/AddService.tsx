import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  totalNumber: number; // Total number of rooms/tables
}

const AddService: React.FC = () => {
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
    totalNumber: 1, // Default to 1 room/table
  });
  const navigate = useNavigate();

  // Handle input change for form fields
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle adding the service
  const handleAddService = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/vendor/listings",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Service added successfully!");
        navigate("/vendor-listings"); // Navigate back to vendor listings
      } else {
        console.error("Failed to add service:", data.message);
        alert("Error adding service");
      }
    } catch (error) {
      console.error("Error adding service:", error);
      alert("Error adding service");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold">Add New Service</h2>

      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium">Service Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
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
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div>
            <label className="block font-medium">Zip Code:</label>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div>
            <label className="block font-medium">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
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
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div>
            <label className="block font-medium">Service Type:</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
            >
              <option value="">Select Service Type</option>
              <option value="restaurant">Restaurant</option>
              <option value="hotel">Hotel</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">
              Total Number of Rooms/Tables:
            </label>
            <input
              type="number"
              name="totalNumber"
              value={formData.totalNumber}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div>
            <label className="block font-medium">
              Facilities (comma separated):
            </label>
            <input
              type="text"
              name="facilities"
              value={formData.facilities.join(", ")}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  facilities: e.target.value
                    .split(",")
                    .map((item) => item.trim()),
                }))
              }
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div>
            <label className="block font-medium">
              Images (comma separated URLs):
            </label>
            <input
              type="text"
              name="images"
              value={formData.images.join(", ")}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  images: e.target.value.split(",").map((item) => item.trim()),
                }))
              }
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleAddService}
            className="p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddService;
