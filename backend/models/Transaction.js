const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
   collect_id: String,
   school_id: String,
   gateway: String,
   order_amount: Number,
   transaction_amount: Number,
   status: String,
   custom_order_id: String,
   bank_reference: String,
   payment_method: String,
   
});

module.exports = mongoose.model("users", transactionSchema);


// const mongoose = require("mongoose");

// const TransactionSchema = new mongoose.Schema({
//     collect_id: { type: String, required: true },
//     school_id: { type: String, required: true },
//     gateway: { type: String, required: true },
//     order_amount: { type: Number, required: true },
//     transaction_amount: { type: Number, required: true },
//     status: { type: String, required: true },
//     custom_order_id: { type: String, required: true },
// });

// module.exports = mongoose.model("Transaction", TransactionSchema);
