const { Category } = require('../models');

/**
 * Create a new category
 * @param {string} categoryName - Name of the category
 * @returns {Promise<Object>} Created category object
 */
const createCategory = async (categoryName) => {
    try {
        const category = await Category.create({
            category: categoryName,
            is_active: 1
        });
        return category;
    } catch (error) {
        throw error;
    }
};

/**
 * Get all categories
 * @param {boolean} activeOnly - If true, returns only active categories
 * @returns {Promise<Array>} Array of category objects
 */
const getAllCategories = async (activeOnly = false) => {
    try {
        const whereClause = activeOnly ? { is_active: 1 } : {};
        const categories = await Category.findAll({
            where: whereClause,
            order: [['created_at', 'DESC']]
        });
        return categories;
    } catch (error) {
        throw error;
    }
};

/**
 * Check if category name already exists
 * @param {string} categoryName - Name to check
 * @returns {Promise<boolean>} True if exists, false otherwise
 */
const categoryExists = async (categoryName) => {
    try {
        const category = await Category.findOne({
            where: { category: categoryName }
        });
        return !!category;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    categoryExists
};
