const dbService = require("../../services/db.service");
const { runSQL } = require("../../services/db.service");

module.exports = {
    query,
    getById,
    addBudget,
    updateBudget,
    updateTotalExpences,
    removeBudget
}
// const query2 = (condition)? `SELECT * from budgetList WHERE budgetList.budgetId=${budgetId} ${condition}`:`SELECT * from budgetList WHERE budgetList.budgetId=${budgetId}`;

async function query(accountId) {
    const query = `SELECT * from budget WHERE accountId=${accountId}`;
    let budgets;
    try {
        budgets = await dbService.runSQL(query)
        return budgets;
    }
    catch (err) {
        console.log('error with query select budgets', err);
    }
}

async function getById(budgetId) {
    const query = `SELECT * from budget WHERE budget.id = ${budgetId}`;
    let budget;
    try {
        budget = await dbService.runSQL(query);
    }
    catch (err) {
        console.log('error while trying to get budget-->', err);
    }
    return budget;
}

async function addBudget(budget) {
    const query = `INSERT INTO budget(accountId, totalBudget, totalExpences, isOverBudget) VALUES(
        ${budget.accountId},
        ${budget.totalBudget},
        ${budget.totalExpences},
        ${budget.isOverBudget})`;
    return dbService.runSQL(query);
}

async function updateBudget(budget) {
    let okPacket;
    const query = `UPDATE budget SET totalBudget= ${budget.totalBudget}, totalExpences= ${budget.totalExpences}, isOverBudget =${budget.isOverBudget} WHERE id=${budget.id}`;
    try {
        okPacket = await dbService.runSQL(query);
        return okPacket;
    }
    catch (err) {
        console.log('error with updating the budget', err);
    }
}

async function updateTotalExpences(totalExpences){
    let okPacket;
    const query = `UPDATE budget SET totalExpences= ${budget.totalExpences} WHERE id=${budget.id}`;
    try {
        okPacket = await dbService.runSQL(query);
        return okPacket;
    }
    catch (err) {
        console.log('error with updating the budget', err);
    }
}

async function removeBudget(budgetId, ) {
    let query = `DELETE FROM budget WHERE budget.id = ${budgetId} `;
    try {
        await dbService.runSQL(query)
    }
    catch (err) {
        console.log(err);
    }
}

