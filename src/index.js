require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { connectDatabase, syncDatabase } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Money Management API is running',
        timestamp: new Date().toISOString()
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

// Start Server with DB Connection
const startServer = async () => {
    try {
        // Connect to database
        await connectDatabase();

        // Sync models with database (creates tables if not exist)
        // Use { force: true } to drop and recreate tables (DANGER: loses data)
        // Use { alter: true } to alter tables to match models
        await syncDatabase({ alter: false });

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is running on http://localhost:${PORT}`);
            console.log(`Money Management Project`);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();

module.exports = app;


