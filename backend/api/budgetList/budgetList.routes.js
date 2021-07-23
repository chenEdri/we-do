const express = require('express');
const router = express.Router();
const {requireAuth} = require('../../middlewares/requireAuth.middleware')
const {getBudgetList, getBudgetListById, addBudgetList, removeBudgetList, updateBudgetList} = require('./budgetList.controller');

router.get('/', getBudgetList)
router.get('/:id', getBudgetListById);
router.post('/', addBudgetList);
router.put('/:id', updateBudgetList);
router.delete('/:id', requireAuth, removeBudgetList);

module.exports = router;