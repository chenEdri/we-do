const dbService = require("../../services/db.service");
const { runSQL } = require("../../services/db.service");

module.exports = {
    query,
    getById,
    addTodo,
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
    const query = `INSERT INTO todo_list(accountId, title, desription, category , personIncharge, finalDate, isDone, isLate) 
    VALUES(${todo.accountId},"${todo.title}","${todo.desription}","${todo.category }","${todo.personIncharge}","${todo.finalDate}", ${todo.isDone}, ${todo.isLate})`;
    return dbService.runSQL(query);
}

async function updateTodo(todo) {
    let okPacket;
    const query = `UPDATE todo_list SET
    accountId= ${todo.accountId},
    title= "${todo.title}",
    desription ="${todo.desription}",
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
    let creteria ='';
    if (filterBy.title) creteria =`AND todo_list.title="${filterBy.title}"`;
    if (filterBy.description) creteria +=`AND todo_list.description="${filterBy.description}"`;
    if (filterBy.category) creteria +=`AND todo_list.category=${filterBy.category}`;
    if (filterBy.personIncharge) creteria +=`AND todo_list.personIncharge="${filterBy.personIncharge}"`;
    if (filterBy.isDone) creteria +=(filterBy.isDone)?`AND todo_list.isDone=1`:`AND todo_list.isDone=0`;
    if (filterBy.isLate) creteria +=(filterBy.isLate)?`AND todo_list.isLate=1`:`AND todo_list.isLate=0`;
    return creteria;
}