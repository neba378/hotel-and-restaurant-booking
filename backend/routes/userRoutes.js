const express = require("express");
const { getListings, getListing, setBooking, getBookings, decrementService } = require("../controller/userController");
const { authMiddleware, authCustomer } = require("../utils/authMiddleware");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("Hello World!");
});


userRouter.get("/services",  authMiddleware, authCustomer, getListings);
userRouter.get("/services/:id",  authMiddleware, authCustomer, getListing);
userRouter.post("/bookings",  authMiddleware, authCustomer, setBooking);
userRouter.get("/bookings",  authMiddleware, authCustomer, getBookings);
userRouter.patch("/services/:id",  authMiddleware, authCustomer, decrementService);

module.exports = { userRouter };
