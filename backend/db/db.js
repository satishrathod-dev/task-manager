const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT);
        console.log("MongoDB connected");
    }
    catch(err){
        console.log(err)
    }
}

module.exports = connectDB;