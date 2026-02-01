const paymentService = require('../services/payment.service');

/**
 * Add a new payment history entry
 * POST /v1/add-payment-history
 * Body: { category_id, amount, notes (optional) }
 */
const addPaymentHistory = async (req, res) => {
    try {
        const { category_id, amount, notes } = req.body;

        // Validation: category_id is required
        if (!category_id) {
            return res.status(400).json({
                success: false,
                message: 'category_id is required'
            });
        }

        // Validation: amount is required
        if (!amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: 'amount is required and must be greater than 0'
            });
        }

        // Create payment history
        const payment = await paymentService.addPaymentHistory({
            category_id,
            amount,
            notes
        });

        return res.status(201).json({
            success: true,
            message: 'Payment history added successfully',
            data: payment
        });

    } catch (error) {
        console.error('Error adding payment history:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Failed to add payment history',
            error: error.message
        });
    }
};

/**
 * Get all payment history
 * GET /v1/get-payment-history
 */
const getAllPayments = async (req, res) => {
    try {
        const payments = await paymentService.getAllPayments();

        return res.status(200).json({
            success: true,
            message: 'Payment history fetched successfully',
            count: payments.length,
            data: payments
        });

    } catch (error) {
        console.error('Error fetching payment history:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch payment history',
            error: error.message
        });
    }
};

/**
 * Get monthly category summary
 * GET /v1/payment-summary
 * Query: ?month=1&year=2024
 */
const getMonthlySummary = async (req, res) => {
    try {
        let { month, year } = req.query;

        const currentDate = new Date();

        // Default to current month/year if not provided
        if (!month) month = currentDate.getMonth() + 1;
        if (!year) year = currentDate.getFullYear();

        // Convert to numbers
        month = parseInt(month);
        year = parseInt(year);

        // Validation
        if (isNaN(month) || month < 1 || month > 12) {
            return res.status(400).json({
                success: false,
                message: 'Invalid month. Must be between 1 and 12.'
            });
        }

        if (isNaN(year) || year < 2000 || year > 2100) {
            return res.status(400).json({
                success: false,
                message: 'Invalid year.'
            });
        }

        const summary = await paymentService.getMonthlyCategorySummary(month, year);

        return res.status(200).json({
            success: true,
            message: `Summary for ${month}/${year} fetched successfully`,
            data: summary
        });

    } catch (error) {
        console.error('Error fetching monthly summary:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch monthly summary',
            error: error.message
        });
    }
};

module.exports = {
    addPaymentHistory,
    getAllPayments,
    getMonthlySummary
};

