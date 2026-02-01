const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

/**
 * Category Routes
 * Base path: /api/v1
 */

// POST /api/v1/create-category - Create a new category
router.post('/create-category', categoryController.createCategory);

// GET /api/v1/categories - Get all categories
router.get('/get-categories', categoryController.getAllCategories);

module.exports = router;
