const express = require('express');
const router = express.Router();

// Import route modules
const categoryRoutes = require('./category.routes');
const paymentRoutes = require('./payment.routes');

// Register routes with /v1 prefix
router.use('/v1', categoryRoutes);
router.use('/v1', paymentRoutes);

// API Health endpoint
router.get('/v1/health', (req, res) => {
    res.json({
        success: true,
        message: 'Money Management API',
        version: '1.0.0',
    });
});

module.exports = router;


