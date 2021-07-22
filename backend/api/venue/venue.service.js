const { runSQL } = require('../../services/db.service');
const dbService = require('../../services/db.service');
const loggerService = require('../../services/logger.service');

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query(accountId) {
    let res;
    var query = `SELECT * FROM venue WHERE venue.accountId=${accountId}`;
    try {
        res = dbService.runSQL(query);
    }
    catch (err) {
        console.log();
    }
}

async function getById(venueId) {
    let res;
    var query = `SELECT * FROM venue WHERE venue.id = ${venueId}`;
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


async function remove(venueId) {
    let query = `DELETE FROM venue WHERE venue.id = ${venueId}`;
    try {
        await dbService.runSQL(query)
    }
    catch (err) {
        console.log(err);
    }
}

async function add(venue) {
    let res;
    var query = `INSERT INTO venue(name, coordinate, imgUrl) VALUES("${venue.name}","${venue.coordinate}","${venue.imgUrl}")`;
    return dbService.runSQL(query)
}


async function update(venueId, venue) {
    console.log(venue.fullName);
    let okPacket;
    let query = `UPDATE venue SET name ="${venue.name}",
                                    coordinate = "${venue.coordinate}",
                                    imgUrl="${venue.imgUrl}"
                                    WHERE venue.id=${venueId}`;
    try {
        okPacket = await dbService.runSQL(query);
        if (okPacket.affectedRows !== 0) return okPacket;
    }
    catch (err) {
        console.log('error with updating the account', err);
    }
}

