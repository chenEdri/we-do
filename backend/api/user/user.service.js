const { runSQL } = require('../../services/db.service');
const dbService = require('../../services/db.service');
const loggerService = require('../../services/logger.service');

module.exports = {
    query,
    getById,
    getByEmail,
    remove,
    update,
    add
}

async function query(accountId) {
    let res;
    var query = `SELECT * FROM user WHERE user.accountId=${accountId} `;
    try {
        res = dbService.runSQL(query);
    }
    catch (err) {
        console.log();
    }

}

async function getById(userId) {
    let res;
    var query = `SELECT * FROM user WHERE user.id = ${userId}`;
    try {
        res = dbService.runSQL(query);
    }
    catch (err) {
        console.log('ERROR FINDING USER WITH THIS ID');
        throw err;
    }
    finally {
        return res;
    }
}

async function getByEmail(email) {
    let res;
    var query = `SELECT * FROM user WHERE user.email = ${email}`;
    try {
        await dbService.runSQL(query);
    }
    catch (err) {
        console.log('ERROR FINDING USER WITH THIS EMAIL');
        throw err;
    }
    finally {
        return res;
    }
}


async function remove(userId) {
    let query = `DELETE FROM user WHERE user.id = ${userId}`;
    try {
        await dbService.runSQL(query)
    }
    catch (err) {
        console.log(err);
    }
}

async function update(userId, user) {
    console.log(user.fullName);
    let okPacket;
    let query = `UPDATE user SET full_name ="${user.fullName}",
                                    email = "${user.email}",
                                    password="${user.password}"
                                    WHERE user.id=${userId}`;
    try {
        okPacket = await dbService.runSQL(query);
        if (okPacket.affectedRows !== 0) return okPacket;
    }
    catch (err) {
        console.log('error with updating the account', err);
    }
}

async function add(name, password, email) {
    let res;
    var query = `INSERT INTO user(full_name, email, password) VALUES("${name}","${email}","${password}")`;
    return dbService.runSQL(query)
}

// function _buildCriteria(filterBy) {
//     const criteria = {};
//     // if (filterBy.txt) {
//     //     criteria.fullName = filterBy.txt
//     // }
//     // if (filterBy.minBalance) {
//     //     criteria.balance = { $gte: +filterBy.minBalance }
//     // }
//     return criteria;
// }


