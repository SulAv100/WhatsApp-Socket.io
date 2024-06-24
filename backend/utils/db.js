const mongoose = require("mongoose");

const URL = process.env.MONGO_DB;

const connectDB = async()=>{
    try{
        await mongoose.connect(URL);
        console.log("Connection made successfully");
    }
    catch(error){
        console.error(error);
    }
}

module.exports = connectDB;
