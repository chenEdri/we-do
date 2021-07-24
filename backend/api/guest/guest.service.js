const dbService = require("../../services/db.service");
const { runSQL } = require("../../services/db.service");

module.exports = {
    query,
    getById,
    addGuest,
    updateGuest,
    removeGuest
}


async function query(filterBy = {}) {
    const condition = _buildCriteria(filterBy);
    const query = (condition) ? `SELECT * FROM guest_list gl LEFT JOIN guest_notes gn ON gl.guestNoteId = gn.id WHERE gl.accountId=${filterBy.accountId} ${condition}` :
    `SELECT * FROM guest_list gl LEFT JOIN guest_notes gn ON gl.guestNoteId = gn.id WHERE gl.accountId= ${filterBy.accountId}`;
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
    const query = `SELECT * from guest_list gl LEFT JOIN guest_notes gn ON gl.guestNoteId = gn.id  WHERE guest_list.id = ${guestId} `;
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
    if (guest.note) {
        const guestNoteId = await _addGuestNote(guest.note);
        guest.guestNoteId = guestNoteId.insertId;
    }
    const query = `INSERT INTO guest_list(accountId , name, guestNumber, category , side, phoneNumber,rsvp,guestNoteId ) 
    VALUES(${guest.accountId},"${guest.name}",${guest.guestNumber},"${guest.category}",${guest.side},"${guest.phoneNumber}", ${guest.rsvp}, ${guest.guestNoteId})`;
    try {
        dbService.runSQL(query);
    }
    catch {
        console.log('error with adding the guest to guest list', err);
    }
}

async function _addGuestNote(note) {
    let okPacket;
    const query = `INSERT INTO guest_notes(isChildren, numberOfChildren, isFoodAllergy, foodAllergicDes, foodNote, isDisability, disabilityDesc) VALUES(
        ${note.isChildren},
        ${note.numberOfChildren},
        ${note.isFoodAllergy},
        "${note.foodAllergicDes}",
        "${note.foodNote}",
        ${note.isDisability},
        "${note.disabilityDesc}")`;
    try {
        okPacket = dbService.runSQL(query);
        return okPacket
    }
    catch {
        console.log('error with adding new note to the guest notes', err);
    }
}

async function updateGuest(guest) {
    let okPacket;
    let updateNote;
    if (!guest.noteId && guest.note) {
        try {
            updateNote = await _addGuestNote(guest.note);
            guest.guestNoteId = updateNote.insertId;
        }
        catch (err) {
            console.log('error with adding note to guest notes', err);
        }
    } else if (guest.noteId && guest.note) {
        try {
            updateNote = await _updateGuestNote(guest.note);
        }
        catch {
            console.log('error with update guest note', err);
        }
    }
    const query = `UPDATE guest_list SET
    name= "${guest.name}",
    category = "${guest.category}",
    side =${guest.side}, 
    phoneNumber = "${guest.phoneNumber}",
    guestNoteId = ${guest.guestNoteId}
    WHERE id=${guest.id} AND accountId= ${guest.accountId}`;
    try {
        if (updateNote !== 0) okPacket = await dbService.runSQL(query);
        return okPacket;
    }
    catch (err) {
        console.log('error with updating the guest', err);
    }
}

async function _updateGuestNote(note) {
    let okPacket;
    const query = `UPDATE guest_notes SET
    isChildren= ${guest.isChildren},
    numberOfChildren = ${guest.numberOfChildren},
    isFoodAllergy =${guest.isFoodAllergy}, 
    foodAllergicDes = "${guest.foodAllergicDes}",
    foodNote = "${guest.foodNote}",
    isDisability = ${guest.isDisability},
    disabilityDesc =" ${guest.disabilityDesc}"
     WHERE id=${note.id}`;
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
    let creteria = '';
    if (filterBy.name) creteria = `AND gl.name="${filterBy.name}"`;
    if (filterBy.guestNumber) creteria = `AND gl.guestNumber=${filterBy.guestNumber}`;
    if (filterBy.category) creteria += `AND gl.categoryId=${filterBy.categoryId}`;
    if (filterBy.side) creteria += `AND gl.side=${filterBy.side}`;
    if (filterBy.phoneNumber) creteria += `AND gl.phoneNumber="${filterBy.phoneNumber}"`;
    if (filterBy.rsvp) creteria += `AND gl.rsvp=${filterBy.rsvp}`;
    return creteria;
}