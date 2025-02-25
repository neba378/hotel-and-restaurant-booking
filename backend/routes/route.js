const express = require("express");
const { userRouter } = require("./userRoutes.js");

const router = express.Router();

router.use("/api/users", userRouter);

module.exports = router;