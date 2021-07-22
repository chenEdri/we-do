const dbService = require("../../services/db.service");
const { runSQL } = require("../../services/db.service");

module.exports = {
    query,
    getById,
    addGuest,
    updateGuest,
    removeGuest
}


async function query(accountId, filterBy = null) {
    const condition = (filterBy)? _buildCriteria(): null;
    const query =(condition)? `SELECT * from guestList WHERE guestList.accountId=${accountId} ${condition}`:`SELECT * from guestList WHERE guestList.accountId=${accountId}`;
    let guests;
    try {
        guests = await dbService.runSQL(query)
        return guests;
    }
    catch (err) {
        console.log('error with query select guests', err);
    }
}

async function getById(guestId) {
    const query = `SELECT * from guestList WHERE guestList.id = ${guestId} `;
    let guest;
    try {
        guest = await dbService.runSQL(query);
    }
    catch (err) {
        console.log('error while trying to get guest-->', err);
    }
    return guest;
}

async function addGuest(guest) {
    const query = `INSERT INTO guestList(accountId, firstName, lastName, categoryId, side, phoneNumber, guestNoteId) 
    VALUES(${guest.accountId},"${guest.firstName}","${guest.lastName}",${guest.categoryId},${side},"${guest.phoneNumber}", ${guest.guestNoteId})`;
    return dbService.runSQL(query);
}

async function updateGuest(guest) {
    let okPacket;
    const query = `UPDATE guestList SET
     accountId= ${guest.accountId},
     firstName= "${guest.firstName}",
     lastName ="${guest.lastName}",
     categoryId = ${guest.categoryId},
     side =${guest.side}, 
     phoneNumber = "${guest.phoneNumber}",
     guestNoteId = ${guest.guestNoteId}
     WHERE id=${guest.id}`;
    try {
        okPacket = await dbService.runSQL(query);
        return okPacket;
    }
    catch (err) {
        console.log('error with updating the guest', err);
    }
}


async function removeGuest(guestId) {
    let query = `DELETE FROM guestList WHERE guestList.id = ${guestId} `;
    try {
        await dbService.runSQL(query)
    }
    catch (err) {
        console.log(err);
    }
}

//internal use functions:

function _buildCriteria(filterBy) {
    let creteria ='';
    if (filterBy.firstName) creteria =`AND guestList.firstName="${filterBy.firstName}"`;
    if (filterBy.lastName) creteria +=`AND guestList.lastName="${filterBy.lastName}"`;
    if (filterBy.categoryId) creteria +=`AND guestList.categoryId=${filterBy.categoryId}`;
    if (filterBy.side) creteria +=`AND guestList.side=${filterBy.side}`;
    if (filterBy.phoneNumber) creteria +=`AND guestList.phoneNumber="${filterBy.phoneNumber}"`;
    if (filterBy.rsvp) creteria +=`AND guestList.rsvp=${filterBy.rsvp}`;
    return creteria;
}