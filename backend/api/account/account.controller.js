const accountService = require('./account.service');
const logger = require('../../services/logger.service');
const utilService = require('../../services/util.service');

module.exports = {
    getAccount,
    addAccount,
    removeAccount,
    updateAccount
}

async function getAccount(req, res) {
    const {id} = req.query;
    let account = await accountControllerService.getById(id);
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

