const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Category = require('./category.model');

/**
 * Payment History Model
 * Defines the structure of the my_payment_history table
 */
const Payment = sequelize.define('Payment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Category,
            key: 'id'
        }
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'my_payment_history',  // Exact table name in database
    timestamps: true,                   // Enables createdAt & updatedAt
    createdAt: 'created_at',           // Map to your column name
    updatedAt: 'updated_at',           // Map to your column name
});

// Define the relationship (Foreign Key)
// Payment belongs to one Category
Payment.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'category',                    // Alias for eager loading
    onDelete: 'SET NULL',              // If category deleted, set to NULL
    onUpdate: 'CASCADE'                // If category id changes, update here
});

// Category has many Payments
Category.hasMany(Payment, {
    foreignKey: 'category_id',
    as: 'payments'                     // Alias for eager loading
});

module.exports = Payment;
