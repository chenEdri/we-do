const guestService = require('./guest.service');
const logger = require('../../services/logger.service');
const utilService = require('../../services/util.service');

module.exports={
    getGuests,
    getGuestById,
    addGuest,
    removeGuest,
    updateGuest
}

async function getGuests(req,res) {
    const {accountId} = req.query.accountId;
    const guests = await guestService.query(accountId, req.query);
    logger.debug(guests);
    res.send(guests);
}

async function getGuestById(req, res){
    const {accountId} = req.query;
    const guest = await guestService.getById(req.params.id);
    logger.debug(guest);
    res.send(guest);
}

async function addGuest(req,res){
    const guest = req.body
    await guestService.addGuest(guest);
    res.end();
}

async function updateGuest(req, res){
    const guestId= req.params.id;
    const guest = req.body;
    if(guest.id !== guestId) return;
    let updateStat = await guestService.updateGuest(guest);
    (updateStat.affectedRows !== 0)? res.send(guest): res.send(updateStat);
}

async function removeGuest(req, res){
    await guestService.removeGuest(req.params.id);
    res.end();
}


