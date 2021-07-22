const express = require('express');
const router = express.Router();
const {requireAuth} = require('../../middlewares/requireAuth.middleware')
const {getBudget, addBudget, removeBudget, updateBudget} = require('./budget.controller');


router.get('/:id', getBudget);
router.post('/', addBudget);
router.put('/:id', updateBudget);
router.delete('/:id', requireAuth, removeBudget);

module.exports = router;