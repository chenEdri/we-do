const accountService = require('./account.service');
const logger = require('../../services/logger.service');
const utilService = require('../../services/util.service');

module.exports = {
    getAccount,
    getById,
    addAccount,
    removeAccount,
    updateAccount
}


async function getAccount(req, res){
    console.log('getAccount');
    let {userId} = req.query;
    let account = await accountService.getByUserId(userId);
    logger.debug(account, 'account_controller', 'GET');
    res.send(account);
}

async function getById(req, res) {
    console.log('getById');
    let account = await accountService.getById(req.params.id);
    logger.debug(account, 'account_controller', 'GET');
    res.send(account);
}

async function addAccount(req, res) {
    const _account = req.body;
    await accountService.addAccount(_account);
    res.end();
}

async function removeAccount(req, res) {
    const id = req.params.id;
    await accountService.removeAccount(id);
    res.end();
}

async function updateAccount(req, res) {
    const accountId = req.params.id;
    const account = req.body;
    let updateStat = await accountService.updateAccount(accountId, account);
    (updateStat.affectedRows !== 0)? res.send(account): res.send(updateStat);
    // res.send(updateStat, account);
}

