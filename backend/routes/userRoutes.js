const express = require("express");
const { login, register, changePassword } = require("../controller/userController");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("Hello World!");
});

userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.post("/changepassword", changePassword);

module.exports = { userRouter };
