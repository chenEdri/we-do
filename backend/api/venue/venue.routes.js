const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {getVenue, getVenues, deleteVenue, updateVenue} = require('./venue.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getVenues)
router.get('/:id', getVenue)
router.put('/:id', updateVenue)
router.delete('/:id', deleteVenue)

module.exports = router