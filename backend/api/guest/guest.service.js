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
    const query =(condition)? `SELECT * from guest_list WHERE guest_list.accountId=${accountId} ${condition}`:`SELECT * from guest_list WHERE guest_list.accountId=${accountId}`;
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
    const query = `SELECT * from guest_list WHERE guest_list.id = ${guestId} `;
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
    const query = `INSERT INTO guest_list(accountId , firstName, lastName, guestNumber, category , side, phoneNumber,rsvp,guestNoteId ) 
    VALUES(${guest.accountId},"${guest.firstName}","${guest.lastName}",${guest.guestNumber},"${guest.category }",${guest.side},"${guest.phoneNumber}", ${guest.rsvp}, ${guest.guestNoteId})`;
    return dbService.runSQL(query);
}

async function updateGuest(guest) {
    let okPacket;
    const query = `UPDATE guest_list SET
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
    let query = `DELETE FROM guest_list WHERE guest_list.id = ${guestId} `;
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
    if (filterBy.firstName) creteria =`AND guest_list.firstName="${filterBy.firstName}"`;
    if (filterBy.lastName) creteria +=`AND guest_list.lastName="${filterBy.lastName}"`;
    if (filterBy.categoryId) creteria +=`AND guest_list.categoryId=${filterBy.categoryId}`;
    if (filterBy.side) creteria +=`AND guest_list.side=${filterBy.side}`;
    if (filterBy.phoneNumber) creteria +=`AND guest_list.phoneNumber="${filterBy.phoneNumber}"`;
    if (filterBy.rsvp) creteria +=`AND guest_list.rsvp=${filterBy.rsvp}`;
    return creteria;
}