const mongoose = require('mongoose');

require('dotenv').config();

const db = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error.message);
    }
}

module.exports = db;