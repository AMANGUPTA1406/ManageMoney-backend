const categoryService = require('../services/category.service');

/**
 * Category Controller
 * Handles HTTP requests and responses for category endpoints
 */

/**
 * Create a new category
 * POST /v1/create-category
 * Body: { category: "Category Name" }
 */
const createCategory = async (req, res) => {
    try {
        const { category } = req.body;

        // Validation
        if (!category || category.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Category name is required'
            });
        }

        // Check if category already exists
        const exists = await categoryService.categoryExists(category.trim());
        if (exists) {
            return res.status(409).json({
                success: false,
                message: 'Category already exists'
            });
        }

        // Create category
        const newCategory = await categoryService.createCategory(category.trim());

        return res.status(201).json({
            success: true,
            message: 'Category created successfully',
            data: newCategory
        });

    } catch (error) {
        console.error('Error creating category:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Failed to create category',
            error: error.message
        });
    }
};

/**
 * Get all categories
 * GET /v1/categories
 * Query: ?active=true (optional, filter active only)
 */
const getAllCategories = async (req, res) => {
    try {
        const activeOnly = req.query.active === 'true';
        const categories = await categoryService.getAllCategories(activeOnly);

        return res.status(200).json({
            success: true,
            message: 'Categories fetched successfully',
            count: categories.length,
            data: categories
        });

    } catch (error) {
        console.error('Error fetching categories:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch categories',
            error: error.message
        });
    }
};

module.exports = {
    createCategory,
    getAllCategories
};
