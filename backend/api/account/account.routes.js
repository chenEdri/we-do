const express = require('express')
const {requireAuth, requireAdmin}  = require('../../middlewares/requireAuth.middleware')
const {getAccount, getById, addAccount, removeAccount, updateAccount} = require('./account.controller.js');

const router = express.Router()

router.get('/', getAccount);
router.get('/:id', getById);
router.post('/', addAccount);
router.delete('/:id', requireAuth, removeAccount);
router.put('/:id', updateAccount);

module.exports = router