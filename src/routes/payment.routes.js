const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');

// POST /api/v1/add-payment-history - Add new payment history
router.post('/add-payment-history', paymentController.addPaymentHistory);

// GET /api/v1/get-payment-history - Get all payment history
router.get('/get-payment-history', paymentController.getAllPayments);

// GET /api/v1/payment-summary - Get monthly category wise summary
router.get('/payment-summary', paymentController.getMonthlySummary);

module.exports = router;

