const express = require('express');
const router = express.Router();
const {requireAuth} = require('../../middlewares/requireAuth.middleware')
const {getTodos,getTodoById, addTodo, removeTodo, updateTodo} = require('./todo.controller');

router.get('/', getTodos);
router.get('/:id', getTodoById);
router.post('/', addTodo);
router.put('/:id', updateTodo);
router.delete('/:id', requireAuth, removeTodo);

module.exports = router;