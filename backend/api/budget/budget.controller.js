const budgetService = require('./budget.service');
const logger = require('../../services/logger.service');
const utilService = require('../../services/util.service');

module.exports={
    getBudget,
    getBudgetById,
    addBudget,
    removeBudget,
    updateBudget
}

async function getBudget(req, res){
    const {accountId} = req.query;
    const budgets = await budgetService.query(accountId);
    logger.debug(budgets);
    res.send(budgets);
}

async function getBudgetById(req, res){
    const budget = await budgetService.getById(req.params.id);
    logger.debug(budget);
    res.send(budget);
}

async function addBudget(req,res){
    const budget = req.body
    await budgetService.addBudget(budget);
    res.end();
}

async function updateBudget(req, res){
    const budgetId= req.params.id;
    const budget = req.body;
    if(budget.id !== budgetId) return;
    let updateStat = await budgetService.updateBudget(budget);
    (updateStat.affectedRows !== 0)? res.send(budget): res.send(updateStat);
}

async function removeBudget(req, res){
    await budgetService.removeBudget(req.params.id);
    res.end();
}


