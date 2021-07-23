const express = require('express');
const router = express.Router();
const {requireAuth} = require('../../middlewares/requireAuth.middleware')
const {getTodos, getTodoById, addTodo, addDefaultTodos, removeTodo, updateTodo} = require('./todoList.controller');

router.get('/', getTodos);
router.get('/:id', getTodoById);
router.post('/', addTodo);
router.post('/def', addDefaultTodos)
router.put('/:id', updateTodo);
router.delete('/:id', requireAuth, removeTodo);

module.exports = router;