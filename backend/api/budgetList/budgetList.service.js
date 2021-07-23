const dbService = require("../../services/db.service");
const { runSQL } = require("../../services/db.service");

module.exports = {
    query,
    getById,
    addBudgetList,
    updateBudgetList,
    updateTotalExpences,
    removeBudgetList
}
// const query2 = (condition)? `SELECT * from budget_list WHERE budget_list.budgetListId=${budgetListId} ${condition}`:`SELECT * from budget_list WHERE budget_listList.budgetListId=${budgetListId}`;

async function query(filterBy) {
    const condition = _buildCriteria(filterBy)
    const query = (condition.length) ? `SELECT * from budget_list WHERE budgetId=${filterBy.budgetId} ${condition}` : `SELECT * from budget_list WHERE budgetId=${filterBy.budgetId}`;
    let budgetLists;
    try {
        budgetLists = await dbService.runSQL(query)
        return budgetLists;
    }
    catch (err) {
        console.log('error with query select budgetLists', err);
    }
}

async function getById(budgetListId) {
    const query = `SELECT * from budget_list WHERE budget_list.id = ${budgetListId}`;
    let budgetList;
    try {
        budgetList = await dbService.runSQL(query);
    }
    catch (err) {
        console.log('error while trying to get budgetList-->', err);
    }
    return budgetList;
}

async function addBudgetList(budgetList) {
    const query = `INSERT INTO budget_list(budgetId, title, category, totalAmount, depAmount, depDate, finalPaymentDate, note, paymentOption ) VALUES(
        ${budgetList.budgetId},
        "${budgetList.title}",
        "${budgetList.category}",
        ${budgetList.totalAmount},
        ${budgetList.depAmount},
        "${budgetList.depDate}",
        "${budgetList.finalPaymentDate}",
        "${budgetList.note}",
        "${budgetList.paymentOption}")`;
    return dbService.runSQL(query);
}

async function updateBudgetList(budgetList) {
    let okPacket;
    const query = `UPDATE budget_list SET 
    title = "${budgetList.title}",
    category = "${budgetList.category}",
    totalAmount = ${budgetList.totalAmount},
    depAmount = ${budgetList.depAmount},
    depDate = "${budgetList.depDate}",
    finalPaymentDate = "${budgetList.finalPaymentDate}",
    note = "${budgetList.note}",
    paymentOption = "${budgetList.paymentOption}"
        WHERE id=${budgetList.id}`;
    try {
        okPacket = await dbService.runSQL(query);
        return okPacket;
    }
    catch (err) {
        console.log('error with updating the budgetList', err);
    }
}

async function updateTotalExpences(totalExpences) {
    let okPacket;
    const query = `UPDATE budget_list SET totalExpences= ${budgetList.totalExpences} WHERE id=${budgetList.id}`;
    try {
        okPacket = await dbService.runSQL(query);
        return okPacket;
    }
    catch (err) {
        console.log('error with updating the budgetList', err);
    }
}

async function removeBudgetList(budgetListId,) {
    let query = `DELETE FROM budget_list WHERE budget_list.id = ${budgetListId} `;
    try {
        await dbService.runSQL(query)
    }
    catch (err) {
        console.log(err);
    }
}

//internal use functions:

function _buildCriteria(filterBy) {
    let creteria = '';
    if (filterBy.title) creteria += `AND title="${filterBy.title}"`;
    if (filterBy.category) creteria += `AND category="${filterBy.category}"`;
    if (filterBy.totalAmount) creteria += `AND totalAmount=${filterBy.totalAmount}`;
    if (filterBy.depAmount) creteria += `AND depAmount=${filterBy.depAmount}`;
    if (filterBy.depDate) creteria += `AND depDate=${filterBy.depDate}`;
    if (filterBy.finalPaymentDate) creteria += `AND finalPaymentDate=${filterBy.finalPaymentDate}`;
    if (filterBy.paymentOption) creteria += `AND paymentOption=${filterBy.paymentOption}`;
    return creteria;
}