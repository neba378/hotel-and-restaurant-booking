const express = require("express");
const { getVendorListings, addListing, editListing, deleteListing, getVendorListing } = require("../controller/vendorController");
const { authMiddleware, authVendor } = require("../utils/authMiddleware");
const vendorRouter = express.Router();

vendorRouter.get("/listings", authMiddleware, authVendor, getVendorListings);
vendorRouter.get("/listings/:id", authMiddleware, authVendor, getVendorListing);
vendorRouter.post("/listings", authMiddleware, authVendor, addListing);
vendorRouter.put("/listings/:id", authMiddleware, authVendor, editListing);
vendorRouter.delete("/listings/:id", authMiddleware, authVendor, deleteListing);

module.exports = { vendorRouter };