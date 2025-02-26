const Listing = require("../model/Listing");
const User = require("../model/user");


exports.getVendorListings = async (req, res) => {
    try {
        const listings = await Listing.find({ vendorId: req.user.id });
        console.log(listings);
        res.status(200).json(listings);
    } catch (error) {
        console.error("Error fetching listings for vendor:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}   

exports.getVendorListing = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }
        res.status(200).json(listing);
    } catch (error) {
        console.error("Error fetching listing for vendor:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}


exports.editListing = async (req, res) => {
    const { id } = req.params;
    const { name, address, city, state, zip, description, facilities, pricing, images, type, totalNumber } = req.body;
    try {
      const listing = await Listing.findById(id);
      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }
      listing.name = name;
      listing.address = address;
      listing.city = city;
      listing.state = state;
      listing.zip = zip;
      listing.description = description;
      listing.facilities = facilities;
      listing.pricing = pricing;
      listing.images = images;
      listing.type = type;
      listing.totalNumber = totalNumber;
      // Object.assign(listing, req.body); optional
      await listing.save();
      res
        .status(200)
        .json({ message: "Listing updated successfully", listing });
    } catch (error) {
        console.error("Error updating listing:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.deleteListing = async (req, res) => {
    const { id } = req.params;
    try {
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }
        await listing.deleteOne({_id: id})
        res.status(200).json({ message: "Listing deleted successfully" });
    } catch (error) {
        console.error("Error deleting listing:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.addListing = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
          return res
            .status(401)
            .json({ message: "Unauthorized. Please log in." });
        }

        const vendor = await User.findById(req.user.id);
        if (!vendor || vendor.role !== "vendor") {
          return res
            .status(403)
            .json({ message: "Access denied. Only vendors can add listings." });
        }
            const {
              name,
              address,
              city,
              state,
              zip,
              description,
              facilities,
              pricing,
              images,
              type,
              totalNumber
            } = req.body;

        const listing = new Listing({
            vendorId: vendor._id,
            name,
            address,
            city,
            state,
            zip,
            description,
            facilities,
            pricing,
            images,
            type,
            totalNumber
        });
        await listing.save();
        res.status(201).json({ message: "Listing created successfully", listing });
    } catch (error) {
        console.error("Error creating listing:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

