const { mongoose } = require("mongoose");
const { User } = require("../model/user");
const { hashPassword, comparePassword, generateAccessToken } = require("../utils/password_services");


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

    res.status(200).json({ message: "Login successful", accessToken, refreshToken });
  } catch (error) {
    console.log("Error logging in:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.register = async (req, res) => {

    const {firstName, lastName, email, password} = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (await checkUser(email)) {
        return res.status(400).json({ message: 'User with the given email already exist' });

    };

    try{
    const newUser = await new User({
        name: {first: firstName, last: lastName},
        email: email,
        password: await hashPassword(password)
    });

    await newUser.save();

    return res.status(201).json({message: 'User created successfully', "newUser": newUser});
    }
    catch (error){
        return res.status(500).json({error: error, message: 'Internal server error'});
    }
}    


exports.changePassword = async (req, res) => {
    const {email, oldPassword, newPassword} = req.body;

    if (!email || !oldPassword || !newPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try{
        const existUser = await User.findOne({email: email});
        if (!existUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!comparePassword(existUser.password, oldPassword)) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        if (!comparePassword(existUser.password, newPassword)) {
          return res
            .status(400)
            .json({
              message: "New password must be different from old password",
            });
        }
        const updatedUser = await User.findOneAndUpdate(
          { email: email },
          { password: await hashPassword(newPassword) }
          
        );

        await updatedUser.save();
        

        return res.status(200).json({ message: 'Password changed successfully' });
    }
    catch (err){
        return res.status(500).json({message: 'Internal server error'});
    }
}
