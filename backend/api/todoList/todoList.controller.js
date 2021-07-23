const todoService = require('./todoList.service');
const logger = require('../../services/logger.service');
const utilService = require('../../services/util.service');

// default option to add by user chios:

const DEF_TODOS = `()`;

module.exports={
    getTodos,
    getTodoById,
    addTodo,
    addDefaultTodos,
    removeTodo,
    updateTodo
}

async function getTodos(req,res) {
    const todos = await todoService.query(req.query);
    logger.debug(todos);
    res.send(todos);
}

async function getTodoById(req, res){
    const todo = await todoService.getById(req.params.id);
    logger.debug(todo);
    res.send(todo);
}

async function addTodo(req,res){
    const todo = req.body
    await todoService.addTodo(todo);
    res.end();
}

async function addDefaultTodos(req,res){
    await todoService.addTodo(DEF_TODOS);
    res.end();
}

async function updateTodo(req, res){
    console.log('here');
    const todoId= req.params.id;
    const todo = req.body;
    if(todo.id.toString()  !== todoId.toString() ) return;
    let updateStat = await todoService.updateTodo(todo);
    (updateStat.affectedRows !== 0)? res.send(todo): res.send(updateStat);
}

async function removeTodo(req, res){
    await todoService.removeTodo(req.params.id);
    res.end();
}


