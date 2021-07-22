const express = require('express');
const router = express.Router();
const {getCategories,getCategoryById, addCategory, removeCategory, updateCategory} = require('./category.controller');

router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.post('/', addCategory);
router.put('/:id', updateCategory);
router.delete('/:id', removeCategory);

module.exports = router;