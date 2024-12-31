// const express = require("express");
// const dotenv = require("dotenv");
// const clc = require("cli-color");
// const cors = require('cors');
// const connectDB = require("./config/db");
// const transactionRoutes = require("./routes/transactions");
// //const userModel = require("./models/Transaction");
// const Transaction = require("./models/Transaction");
// //const importCSV = require("./utils/importCSV");

// dotenv.config();
// connectDB();

// const app = express();

// app.use(express.json());
// app.use(cors());
// //app.use(cors({ origin: 'http://localhost:3000' }));

// app.use("/api/transactions", transactionRoutes);

// const PORT = process.env.PORT || 5000;
// //app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// mongoose.connect("mongodb://127.0.0.1:27017/edviron")

// app.get('/getTransaction', (req, res)=>{
//   userModel.find()
//   .then(Transaction => res.json(Transaction))
//   .catch(err => res.json(err))
// })


// app.listen(PORT, ()=>{
//     console.log(clc.yellow("Server is running on:"));
//       console.log(clc.yellow.underline(`http://localhost:${PORT}/`));
//   });

const express = require("express");
const dotenv = require("dotenv");
const clc = require("cli-color");
const cors = require("cors");
const mongoose = require("mongoose");
const transactionRoutes = require("./routes/transactions");
const Transaction = require("./models/Transaction");

dotenv.config();

const app = express();

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/assignments", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(clc.green("MongoDB connected successfully!")))
  .catch((error) => {
    console.error(clc.red("Error connecting to MongoDB: "), error);
    process.exit(1); // Exit process with failure
  });

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" })); // Allow requests from React frontend

// Routes
app.use("/api/transactions", transactionRoutes);

// Define a route to fetch all transactions
app.get("/getTransaction", async (req, res) => {
  try {
    const transactions = await Transaction.find(); // Use the Transaction model to fetch data
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transactions", error });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(clc.yellow("Server is running on:"));
  console.log(clc.yellow.underline(`http://localhost:${PORT}/`));
});
