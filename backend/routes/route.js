const express = require("express");
const { userRouter } = require("./userRoutes.js");
const { login, register } = require("../controller/userController.js");
const { vendorRouter } = require("./vendorRoutes.js");

const router = express.Router();

router.use("/api/user", userRouter);
router.use("/api/vendor", vendorRouter);
router.post("/api/login", login);
router.post("/api/register", register);

module.exports = router;