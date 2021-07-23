const express = require('express');
const router = express.Router();
const {requireAuth} = require('../../middlewares/requireAuth.middleware')
const {getBudgetByAccount, getBudgetById, addBudget, removeBudget, updateBudget} = require('./budget.controller');

router.get('/', getBudgetByAccount)
router.get('/:id', getBudgetById);
router.post('/', addBudget);
router.put('/:id', updateBudget);
router.delete('/:id', requireAuth, removeBudget);

module.exports = router;