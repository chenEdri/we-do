const dbService = require("../../services/db.service");
const { runSQL } = require("../../services/db.service");
// const ACTIVITY = activityService.getEmptyActivity();
module.exports = {
    // query,
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

async function getById(id) {
    const query = `SELECT * FROM account WHERE account.id = ${id}`;
    let account;
    try {
        account = await dbService.runSQL(query);
    }
    catch (err) {
        console.log('error while trying to get acount by Id', err);
    }
    return account;
}

//INSERT INTO table_name (col1, col2,...) VALUES ('val1', 'val2'...); in order to get back the Id:
//SELECT LAST_INSERT_ID()
async function addAccount(id, account) {
    const query = `INSERT INTO account(name,weddingDate) VALUES(
        "${account.name}","${account.weddingDate}"`;
    return dbService.runSQL(query)
}


async function updateAccount(id, account) {
    let okPacket;
    const query = `UPDATE account SET name ="${account.accountName}",
                                    weddingDate=${account.weddingDate},
                                    WHERE id=${id}`;
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
