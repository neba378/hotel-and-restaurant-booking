const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

exports.generateAccessToken = user => {
    const payload = {id: user._id, email: user.email, role: user.role};
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRETE, {expiresIn: '1d'});
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRETE, {expiresIn: '30d'});

    return {accessToken, refreshToken};
}

exports.getEmailFromToken = token => {
    const email = jwt.decode(token).email;
    if (!email) {
        throw new Error('Invalid token');
    }
    return email;
}

exports.hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

exports.comparePassword = async (password, hashedPassword) => {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
}

exports.verifyToken = (token, secret) =>{
    try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (error) {
        return null;
    }
}