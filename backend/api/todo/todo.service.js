const dbService = require("../../services/db.service");
const { runSQL } = require("../../services/db.service");

module.exports = {
    query,
    getById,
    addTodo,
    updateTodo,
    removeTodo
}


async function query(accountId, filterBy = null) {
    const condition = (filterBy)? _buildCriteria(): null;
    let todoId;
    const query = (condition)? `SELECT * from todoList WHERE todoList.accountId=${accountId} ${condition}`:`SELECT * from todoList WHERE todoList.accountId=${accountId}`;
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
    const query = `SELECT * from todo WHERE todo.id = ${todoId} `;
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
    const query = `INSERT INTO todo(accountId, firstName, lastName, categoryId, side, phoneNumber, todoNoteId) 
    VALUES(${todo.accountId},"${todo.firstName}","${todo.lastName}",${todo.categoryId},${side},"${todo.phoneNumber}", ${todo.todoNoteId})`;
    return dbService.runSQL(query);
}

async function updateTodo(todo) {
    let okPacket;
    const query = `UPDATE todo SET
     accountId= ${todo.accountId},
     firstName= "${todo.firstName}",
     lastName ="${todo.lastName}",
     categoryId = ${todo.categoryId},
     side =${todo.side}, 
     phoneNumber = "${todo.phoneNumber}",
     todoNoteId = ${todo.todoNoteId}
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
    let creteria ='';
    if (filterBy.title) creteria =`AND todoItem.title="${filterBy.title}"`;
    if (filterBy.description) creteria +=`AND todoItem.description="${filterBy.description}"`;
    if (filterBy.categoryId) creteria +=`AND todoItem.categoryId=${filterBy.categoryId}`;
    if (filterBy.personIncharge) creteria +=`AND todoItem.personIncharge="${filterBy.personIncharge}"`;
    if (filterBy.isDone) creteria +=`AND todoItem.isDone="${filterBy.isDone}"`;
    if (filterBy.isLate) creteria +=`AND todoItem.isLate="${filterBy.isLate}"`;
    return creteria;
}