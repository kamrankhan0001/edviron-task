const mongoose = require("mongoose");
const fs = require("fs");
const csv = require("csv-parser");
const Transaction = require("../models/Transaction");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

const importData = async () => {
   try {
       const transactions = [];
       fs.createReadStream("filePath")
           .pipe(csv())
           .on("data", (row) => transactions.push(row))
           .on("end", async () => {
               await Transaction.insertMany(transactions);
               console.log("Data imported successfully!");
               process.exit();
           });
   } catch (error) {
       console.error("Error importing data:", error);
       process.exit(1);
   }
};

importData();




// const mongoose = require('mongoose');
// const csvtojson = require('csvtojson');
// const Transaction = require('./models/Transaction'); // Transaction model

// // MongoDB connection
// const connectDB = async () => {
//   try {
//     await mongoose.connect('mongodb://localhost:27017/transactionsDB', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected');
//   } catch (err) {
//     console.error('MongoDB connection failed:', err);
//     process.exit(1);
//   }
// };

// // Import data from CSV files
// const importCSV = async (filePath) => {
//   try {
//     const jsonArray = await csvtojson().fromFile('./file1.csv');
//     await Transaction.insertMany(jsonArray);
//     console.log(`Data imported from ${'./file2.csv'}`);
//   } catch (err) {
//     console.error('Error importing data:', err);
//   }
// };

// const startImport = async () => {
//   await connectDB();
//   await importCSV('./file1.csv'); // Replace with your file paths
//   await importCSV('./file2.csv');
//   mongoose.connection.close();
// };

// startImport();








// const fs = require("fs");
// const mongoose = require("mongoose");
// const csvParser = require("csv-parser");
// const dotenv = require("dotenv");
// const Transaction = require("./models/Transaction");

// dotenv.config();
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// const importCSV = (filePath) => {
//     return new Promise((resolve, reject) => {
//         const transactions = [];
//         fs.createReadStream(filePath)
//             .pipe(csvParser())
//             .on("data", (row) => {
//                 transactions.push(row);
//             })
//             .on("end", () => {
//                 resolve(transactions);
//             })
//             .on("error", (error) => {
//                 reject(error);
//             });
//     });
// };

// const importData = async () => {
//     try {
//         const data1 = await importCSV("./file1.csv");
//         const data2 = await importCSV("./file2.csv");
//         const allData = [...data1, ...data2];
//         await Transaction.insertMany(allData);
//         console.log("Data Imported!");
//         process.exit();
//     } catch (error) {
//         console.error("Error importing data:", error);
//         process.exit(1);
//     }
// };

// importData();
