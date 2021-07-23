const budgetListService = require('./budgetList.service');
const logger = require('../../services/logger.service');
const utilService = require('../../services/util.service');

module.exports={
    getBudgetList,
    getBudgetListById,
    addBudgetList,
    removeBudgetList,
    updateBudgetList
}

async function getBudgetList(req, res){
    const budgetLists = await budgetListService.query(req.query);
    logger.debug(budgetLists);
    res.send(budgetLists);
}

async function getBudgetListById(req, res){
    const budgetList = await budgetListService.getById(req.params.id);
    logger.debug(budgetList);
    res.send(budgetList);
}

async function addBudgetList(req,res){
    const budgetList = req.body
    await budgetListService.addBudgetList(budgetList);
    res.end();
}

async function updateBudgetList(req, res){
    const budgetListId= req.params.id;
    const budgetList = req.body;
    console.log('here',budgetListId );
    console.log('here2',budgetList.id );
    if(budgetList.id.toString() !== budgetListId.toString()) return;
    let updateStat = await budgetListService.updateBudgetList(budgetList);
    (updateStat.affectedRows !== 0)? res.send(budgetList): res.send(updateStat);
}

async function removeBudgetList(req, res){
    await budgetListService.removeBudgetList(req.params.id);
    res.end();
}


