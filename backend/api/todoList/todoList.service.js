const dbService = require("../../services/db.service");
const { runSQL } = require("../../services/db.service");

module.exports = {
    query,
    getById,
    addTodo,
    addDefaultTodos,
    updateTodo,
    removeTodo
}


async function query(filterBy) {
    const condition = _buildCriteria(filterBy);
    const query = (condition.length) ? `SELECT * from todo_list WHERE accountId=${filterBy.accountId} ${condition}` : `SELECT * from todo_list WHERE accountId=${filterBy.accountId}`;
    let todos;
    try {
        todos = await dbService.runSQL(query)
        return todos;
    }
    catch (err) {
        console.log('error with query select todos', err);
    }
}

async function getById(todoId) {
    const query = `SELECT * from todo_list WHERE id = ${todoId} `;
    let todo;
    try {
        todo = await dbService.runSQL(query);
    }
    catch (err) {
        console.log('error while trying to get todo-->', err);
    }
    return todo;
}

async function addTodo(todo) {
    const query = `INSERT INTO todo_list(accountId, title, description, category , personIncharge, finalDate, isDone, isLate) 
    VALUES(${todo.accountId},"${todo.title}","${todo.description}","${todo.category}","${todo.personIncharge}","${todo.finalDate}", ${todo.isDone}, ${todo.isLate})`;
    return dbService.runSQL(query);
}

async function addDefaultTodos(accountId) {
    const query = `INSERT INTO todo_list(accountId, title, description, category, personIncharge, finalDate, isDone, isLate)
VALUES(${accountId},"Decide on total budget", null, "Before the event", null, null, false, true),
(${accountId},"Make guest list", null, "Before the event", null, null, false, true),
(${accountId},"Choose a venue", null, "Before the event", null, null, false, true),
(${accountId},"Choose Catering", null, "Food & Beverages", null, null, false, true),
(${accountId},"Choose a DJ ", null, "Entertainment", null, null, false, true),
(${accountId},"Choose a makeup artist", null, "Apparel", null, null, false, true),
(${accountId},"Choose a Designer", null, "Before the event", null, null, false, true),
(${accountId},"Choose ceremony officiant", null,"Food & Beverages", null, null, false, true),
(${accountId},"Send Save The Date cards", null, "Before the event", null, null, false, true),
(${accountId},"Make & send wedding invitations", null, "Before the event", null, null, false, true),
(${accountId},"Choose a ceremony song", null, "Entertainment", null, null, false, true),
(${accountId},"Buy and collect the rings", null, "Ceremony preparations", null, null, false, true),
(${accountId},"Entrance ceremony song ", null, " Ceremony preparations", null, null, false, true),
(${accountId},"Choose a wedding dress", null, "Apparel", null, null, false, true),
(${accountId},"Choose clothes for Groom", null, "Apparel", null, null, false, true),
(${accountId},"Pick a Wedding Bouquet", null, "Ceremony preparations", null, null, false, true),
(${accountId},"Pick Bar menu", null, "Food & Beverages", null, null, false, true);`;
    return dbService.runSQL(query);
}

async function updateTodo(todo) {
    let okPacket;
    const query = `UPDATE todo_list SET
    accountId= ${todo.accountId},
    title= "${todo.title}",
    description ="${todo.description}",
    category = "${todo.category}",
    personIncharge ="${todo.personIncharge}", 
    finalDate = "${todo.finalDate}",
    isDone = ${todo.isDone},
    isLate = ${todo.isLate}
    WHERE id=${todo.id}`;
    try {
        okPacket = await dbService.runSQL(query);
        return okPacket;
    }
    catch (err) {
        console.log('error with updating the todo', err);
    }
}

async function removeTodo(todoId) {
    let query = `DELETE FROM todo WHERE todo.id = ${todoId} `;
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
    if (filterBy.title) creteria = `AND todo_list.title="${filterBy.title}"`;
    if (filterBy.description) creteria += `AND todo_list.description="${filterBy.description}"`;
    if (filterBy.category) creteria += `AND todo_list.category=${filterBy.category}`;
    if (filterBy.personIncharge) creteria += `AND todo_list.personIncharge="${filterBy.personIncharge}"`;
    if (filterBy.isDone) creteria += (filterBy.isDone) ? `AND todo_list.isDone=1` : `AND todo_list.isDone=0`;
    if (filterBy.isLate) creteria += (filterBy.isLate) ? `AND todo_list.isLate=1` : `AND todo_list.isLate=0`;
    return creteria;
}