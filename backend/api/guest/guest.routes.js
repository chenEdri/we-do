const express = require('express');
const router = express.Router();
const {requireAuth} = require('../../middlewares/requireAuth.middleware')
const {getGuests,getGuestById, addGuest, removeGuest, updateGuest} = require('./guest.controller');

router.get('/', getGuests);
router.get('/:id', getGuestById)
router.post('/', addGuest);
router.put('/:id', updateGuest);
router.delete('/:id', requireAuth, removeGuest);

module.exports = router;