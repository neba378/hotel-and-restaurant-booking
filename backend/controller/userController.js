const User = require("../model/User");
const { hashPassword, comparePassword, generateAccessToken } = require("../utils/password_services");
const Listing = require("../model/Listing");
const Booking = require("../model/Booking");

const checkUser = async (email) => {
    const existUser = await User.findOne({email: email});
    if(existUser){
        return true;
    }
    return false;
}


exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const existUser = await User.findOne({ email: email });
    if (!existUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!(await comparePassword(password, existUser.password))) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const { accessToken, refreshToken } = generateAccessToken(existUser);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true, 
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(200).json({ message: "Login successful", accessToken, user: existUser });
  } catch (error) {
    console.log("Error logging in:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.register = async (req, res) => {
  const { firstName, lastName, email, password, role, phone, address } =
    req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if user already exists
  if (await User.findOne({ email })) {
    return res
      .status(400)
      .json({ message: "User with the given email already exists" });
  }

  try {
    const newUser = new User({
      name: { first: firstName, last: lastName },
      email,
      password: await hashPassword(password), 
      role: role || "customer", 
      contactDetails: {
        phone: phone || "", 
        address: address || "", 
      },
    });

    await newUser.save();

    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getListings = async (req, res) => {
  try {
    const listings = await Listing.find();
    res.status(200).json(listings);
  } catch (error) {
    console.error("Error fetching listings:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

exports.getListing = async (req, res) => {
  const { id } = req.params;
  try {
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.status(200).json(listing);
  } catch (error) {
    console.error("Error fetching listing:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

exports.setBooking = async (req, res) => {
  const { listingId, bookingDate } = req.body;
  console.log(listingId, bookingDate);
  const customerId = req.user.id;
  try {
    const booking = new Booking({
      customerId,
      listingId,
      bookingDate,
    });
    await booking.save();
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    console.error("Error creating booking:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

exports.getBookings = async (req, res) => {
  const customerId = req.user._id;
  try {
    const bookings = await Booking.find({ customerId });
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

exports.decrementService = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Listing.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (service.totalNumber <= 0) {
      return res.status(400).json({ message: "Sorry no service" });
    }

    service.totalNumber -= 1;
    await service.save();

    res.status(200).json({ message: "Service decremented successfully", service });
  } catch (error) {
    console.error("Error decrementing service:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
