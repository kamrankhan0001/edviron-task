const mongoose = require("mongoose");
const clc = require("cli-color");
//const importCSV = require("..utils/file1.csv")
//const importData = require("../utils/importData");


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(clc.yellow("MongoDB Connected successfully"));
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
