const todoService = require('./todo.service');
const logger = require('../../services/logger.service');
const utilService = require('../../services/util.service');

module.exports={
    getTodos,
    getTodoById,
    addTodo,
    removeTodo,
    updateTodo
}

async function getTodos(req,res) {
    const {accountId} = req.query.accountId;
    const todos = await todoService.query(accountId, req.query);
    logger.debug(todos);
    res.send(todos);
}

async function getTodoById(req, res){
    const id = req.params.id;
    const {catTable} = req.query
    const todo = await todoService.getById(req.params.id, catTable);
    logger.debug(todo);
    res.send(todo);
}

async function addTodo(req,res){
    const todo = req.body
    await todoService.addTodo(todo);
    res.end();
}

async function updateTodo(req, res){
    const todoId= req.params.id;
    const todo = req.body;
    if(todo.id !== todoId) return;
    let updateStat = await todoService.updateTodo(todo);
    (updateStat.affectedRows !== 0)? res.send(todo): res.send(updateStat);
}

async function removeTodo(req, res){
    await todoService.removeTodo(req.params.id);
    res.end();
}


