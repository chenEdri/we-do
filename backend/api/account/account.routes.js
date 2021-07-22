const express = require('express')
const {requireAuth, requireAdmin}  = require('../../middlewares/requireAuth.middleware')
const {getAccount, addAccount, removeAccount, updateAccount} = require('./account.controller.js');

const router = express.Router()

router.get('/:id', getAccount);
router.post('/', addAccount);
router.delete('/:id', requireAuth, removeAccount);
router.put('/:id', updateAccount);

module.exports = router