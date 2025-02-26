import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListingCard from "../components/ListingCard";

// Define the structure of a listing for better type safety
interface Listing {
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
  totalNumber: number; 
}

const VendorListings: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]); // Strongly typed array
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [priceFilter, setPriceFilter] = useState<string>("");
  const navigate = useNavigate();

  // Fetch vendor listings
  useEffect(() => {
    const fetchListings = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/vendor/listings",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setListings(data || []);
          setFilteredListings(data || []);
        } else {
          console.error("Failed to fetch listings:", data.message);
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, [navigate]);

  const handleAddService = () => {
    navigate("/add-service"); // Navigate to the Add Service page
  };
  // Handle search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);

    const filtered = listings.filter(
      (listing) =>
        listing.name.toLowerCase().includes(query) ||
        listing.city.toLowerCase().includes(query) ||
        listing.state.toLowerCase().includes(query)
    );

    setFilteredListings(filtered);
  };

  // Handle filter functionality
  const handleFilter = () => {
    let filtered = [...listings];

    if (typeFilter) {
      filtered = filtered.filter((listing) => listing.type === typeFilter);
    }

    if (priceFilter) {
      const priceRange = priceFilter.split("-").map(Number);
      filtered = filtered.filter(
        (listing) =>
          listing.pricing >= priceRange[0] && listing.pricing <= priceRange[1]
      );
    }

    setFilteredListings(filtered);
  };

  // Clear filters and reset to original listings
  const resetFilters = () => {
    setTypeFilter("");
    setPriceFilter("");
    setFilteredListings(listings);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
        <h2 className="text-3xl font-semibold">Your Listings</h2>

        {/* Search Bar */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name, city, or state"
          className="p-2 border border-gray-300 rounded mt-4 sm:mt-0"
        />
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap space-x-4">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Filter by Type</option>
          <option value="hotel">Hotel</option>
          <option value="restaurant">Restaurant</option>
        </select>

        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Filter by Price</option>
          <option value="0-50">Under $50</option>
          <option value="50-100">$50 - $100</option>
          <option value="100-200">$100 - $200</option>
          <option value="200-500">$200 - $500</option>
        </select>

        <button
          onClick={resetFilters}
          className="p-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          Reset Filters
        </button>
        <div className="mt-6">
          <button
            onClick={handleAddService}
            className="p-3 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add New Service
          </button>
        </div>
      </div>

      {/* Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.length > 0 ? (
          filteredListings.map((listing) => (
            <ListingCard
              key={listing._id}
              _id={listing._id}
              name={listing.name}
              address={listing.address}
              city={listing.city}
              state={listing.state}
              zip={listing.zip}
              description={listing.description}
              pricing={listing.pricing}
              type={listing.type}
              images={listing.images}
              totalNumber={listing.totalNumber}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No listings found.</p>
        )}
      </div>
    </div>
  );
};

export default VendorListings;
