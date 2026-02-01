const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * Category Master Model
 * Defines the structure of the category_master table
 */
const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    is_active: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
    }
}, {
    tableName: 'category_master',      // Exact table name in database
    timestamps: true,                   // Enables createdAt & updatedAt
    createdAt: 'created_at',           // Map to your column name
    updatedAt: 'updated_at',           // Map to your column name
});

module.exports = Category;
