// const express = require("express");
// const {
//     getAllTransactions,
//     getTransactionsBySchool,
//     checkStatus,
//     updateStatusWebhook,
//     manualStatusUpdate,
// } = require("../controllers/transactionsController");

// const router = express.Router();

// router.get("/", getAllTransactions);
// router.get("/:school_id", getTransactionsBySchool);
// router.post("/check-status", checkStatus);
// router.post("/webhook", updateStatusWebhook);
// router.post("/manual-update", manualStatusUpdate);

// module.exports = router;




const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');





// Fetch All Transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find({}, 'collect_id school_id gateway order_amount transaction_amount status custom_order_id');
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fetch Transactions by School
router.get('/school/:schoolId', async (req, res) => {
  try {
    const transactions = await Transaction.find({ school_id: req.params.schoolId });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Transaction Status Check
router.get('/check-status/:customOrderId', async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ custom_order_id: req.params.customOrderId });
    if (transaction) {
      res.json({ status: transaction.status });
    } else {
      res.status(404).json({ message: 'Transaction not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Webhook for Status Updates
router.post('/webhook', async (req, res) => {
  try {
    const { order_info } = req.body;
    const transaction = await Transaction.findOneAndUpdate(
      { collect_id: order_info.order_id },
      { 
        status: req.body.status === 200 ? 'SUCCESS' : 'FAILURE',
        order_amount: order_info.order_amount,
        transaction_amount: order_info.transaction_amount,
        gateway: order_info.gateway,
        bank_reference: order_info.bank_reference
      },
      { new: true }
    );
    if (transaction) {
      res.json({ message: 'Transaction updated successfully' });
    } else {
      res.status(404).json({ message: 'Transaction not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Manual Status Update
router.post('/update-status', async (req, res) => {
  try {
    const { collect_id, status } = req.body;
    const transaction = await Transaction.findOneAndUpdate(
      { collect_id },
      { status },
      { new: true }
    );
    if (transaction) {
      res.json({ message: 'Transaction status updated successfully' });
    } else {
      res.status(404).json({ message: 'Transaction not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

