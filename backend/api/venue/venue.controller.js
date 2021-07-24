const venueService = require('./venue.service')
const logger = require('../../services/logger.service')


async function getVenues(req, res) {
    const venues = await venueService.query(req.query)
    logger.debug(venues);
    res.send(venues)
}

async function getVenue(req, res) {
    const venue = await venueService.getById(req.params.id)
    res.send(venue)
}

async function addVenue(req,res){
    const venue = req.body
    await venueService.add(venue);
    res.end();
}

async function updateVenue(req, res) {
    let updateStat;
    const venueId = req.params.id;
    const venue = req.body;
    if(venue.id.toString() !== venueId) return;
    updateStat = await venueService.update(venue);
    (updateStat.affectedRows !== 0)? res.send(venue): res.send(updateStat);
}

async function deleteVenue(req, res) {
    await venueService.remove(req.params.id)
    res.end()
}

module.exports = {
    getVenue,
    getVenues,
    addVenue,
    updateVenue,
    deleteVenue
}