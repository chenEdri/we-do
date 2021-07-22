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
    const budget = req.body
    await budgetService.add(budget);
    res.end();
}

async function updateVenue(req, res) {
    const venueId = req.params.id;
    const venue = req.body;
    let updateStat = await venueService.update(venueId, venue)
    res.send(updateStat, venue)
}

async function deleteVenue(req, res) {
    await venueService.remove(req.params.id)
    res.end()
}
module.exports = {
    getVenue,
    getVenues,
    deleteVenue,
    updateVenue
}