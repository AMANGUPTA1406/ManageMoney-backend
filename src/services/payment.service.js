const { Payment, Category, sequelize } = require('../models');
const { Op } = require('sequelize');

/**
 * Create a new payment history entry
 * @param {Object} paymentData - Payment data { category_id, amount, notes }
 * @returns {Promise<Object>} Created payment object
 */
const addPaymentHistory = async (paymentData) => {
    try {
        const payment = await Payment.create({
            category_id: paymentData.category_id,
            amount: paymentData.amount,
            notes: paymentData.notes || null
        });
        return payment;
    } catch (error) {
        throw error;
    }
};

/**
 * Get all payment history
 * @returns {Promise<Array>} Array of payment objects with category
 */
const getAllPayments = async () => {
    try {
        const payments = await Payment.findAll({
            include: [{
                model: Category,
                as: 'category',
                attributes: ['id', 'category']
            }],
            order: [['created_at', 'DESC']]
        });
        return payments;
    } catch (error) {
        throw error;
    }
};

/**
 * Get monthly summary categorized by category
 * @param {number} month - Month (1-12)
 * @param {number} year - Year (e.g., 2023)
 * @returns {Promise<Object>} Summary object { total_spending, category_breakdown }
 */
const getMonthlyCategorySummary = async (month, year) => {
    try {
        // Calculate start and end date of the month
        // valid month is 1-12. Javascript Date uses 0-11.
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59, 999);

        // Get Category-wise breakdown
        const categoryBreakdown = await Payment.findAll({
            attributes: [
                'category_id',
                [sequelize.fn('SUM', sequelize.col('amount')), 'total_amount']
            ],
            include: [{
                model: Category,
                as: 'category',
                attributes: ['category']
            }],
            where: {
                created_at: {
                    [Op.between]: [startDate, endDate]
                }
            },
            group: ['category_id', 'category.id', 'category.category'], // Grouping by all selected non-aggregated columns
            order: [[sequelize.literal('total_amount'), 'DESC']]
        });

        // Get Total Spending for the month
        const totalSpending = await Payment.sum('amount', {
            where: {
                created_at: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });

        return {
            month,
            year,
            total_spending: totalSpending || 0,
            category_breakdown: categoryBreakdown
        };
    } catch (error) {
        throw error;
    }
};

/**
 * Check if category exists by ID
 * @param {number} categoryId - Category ID
 * @returns {Promise<boolean>} True if exists
 */
const categoryExists = async (categoryId) => {
    try {
        const category = await Category.findByPk(categoryId);
        return !!category;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    addPaymentHistory,
    getAllPayments,
    getMonthlyCategorySummary,
    categoryExists
};
