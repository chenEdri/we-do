const dbService = require("../../services/db.service");
const { runSQL } = require("../../services/db.service");
// const ACTIVITY = activityService.getEmptyActivity();
module.exports = {
    // query,
    getByUserId,
    getById,
    addAccount,
    removeAccount,
    updateAccount,
}

// async function query() {
//     let _accounts;
//     const query = 'SELECT * FROM account';
//     try {
//         _accounts = await dbService.runSQL(query)
//     }
//     catch (err) {
//         console.log('error with query select accounts', err);
//     }
//     return _accounts;
// }

async function getByUserId(id) {
    let account;
    let result;
    const query = `SELECT accountId FROM account_controller WHERE userId=${id}`;
    try {
        result = await dbService.runSQL(query);
        account = await dbService.runSQL(`SELECT * FROM account WHERE id= ${result[0].accountId}`);
    }
    catch (err) {
        console.log('error while trying to get acount by Id', err);
    }
    return account;
}

async function getById(id) {
    const query = `SELECT * FROM account WHERE id = ${id}`;
    let account;
    try {
        account = await dbService.runSQL(query);
    }
    catch (err) {
        console.log('error while trying to get acount by Id', err);
    }
    return account;
}


async function addAccount(account) {
    let okPacket;
    const query = `INSERT INTO account(
        accountName,
        weedingDate,
        brideName,
         groomName) VALUES(
        "${account.accountName}",
        ${account.weedingDate},
        "${account.brideName}",
        "${account.groomName}")`;
    try {
        okPacket = await dbService.runSQL(query);
        console.log(okPacket.insertId);
        await dbService.runSQL(`INSERT INTO account_controller(accountId,userId) VALUES(${okPacket.insertId},${account.userId})`);
    }
    catch {
        console.log('Eror with adding new account');
    }
}


async function updateAccount(id, account) {
    let okPacket;
    const query = `UPDATE account SET accountName = "${account.accountName}",
        weedingDate = "${account.weedingDate}",
        brideName = "${account.brideName}",
        groomName = "${account.groomName}"
        WHERE id = ${id}`;
    try {
        okPacket = await dbService.runSQL(query);
        if (okPacket.affectedRows !== 0) return okPacket;
    }
    catch (err) {
        console.log('error with updating the account', err);
    }
}

async function removeAccount(id) {
    const query = `DELETE FROM account WHERE account.id = ${id}`;
    try {
        await dbService.runSQL(query)
    }
    catch (err) {
        console.log(err);
    }
}
