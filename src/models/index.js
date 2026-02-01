/**
 * Models Index
 * Central export for all Sequelize models
 */
const { sequelize, connectDatabase, syncDatabase } = require('../config/database');
const Category = require('./category.model');
const Payment = require('./payment.model');

module.exports = {
    sequelize,
    connectDatabase,
    syncDatabase,
    Category,
    Payment
};
