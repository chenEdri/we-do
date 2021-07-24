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

async function getByName(venueName) {
    let res;
    var query = `SELECT * FROM venue WHERE venue.naem = ${venueName}`;
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
    var query = `INSERT INTO venue(accountId, name, coordinate, imgUrl) VALUES(${venue.accountId}, "${venue.name}",(POINT(${venue.coordinate[0]},${venue.coordinate[1]})),"${venue.imgUrl}")`;
    try {
        dbService.runSQL(query);
        res.end()
    } catch {
        console.log('error inserting new venue to the table');
    }
}


async function update(venue) {
    let okPacket;
    let query = `UPDATE venue SET accountId=${venue.accountId},
    name ="${venue.name}",
    coordinate = (POINT(${venue.coordinate[0]},${venue.coordinate[1]})),
    imgUrl="${venue.imgUrl}"
        WHERE venue.id=${venue.id}`;
    try {
        okPacket = await dbService.runSQL(query);
        return okPacket;
    }
    catch (err) {
        console.log('error with updating the account', err);
    }
}

