const express = require('express');
const {index, store, update} = require('../controllers/events.js');
const reservations = require('../controllers/reservations.js');

const router = express.Router();

router.get('/', index);

router.use(express.urlencoded({ extended: true }));

router.post('/', store);
router.put('/:event', update);


router.get('/:event/reservations', reservations.index);
router.post('/:event/reservations', reservations.store);
router.delete('/:event/reservations/:reservation', reservations.destroy);


module.exports = router;