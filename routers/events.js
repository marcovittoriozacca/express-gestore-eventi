const express = require('express');
const {index, store, update} = require('../controllers/events.js');


const router = express.Router();

router.get('/', index);

router.use(express.urlencoded({ extended: true }));

router.post('/', store);
router.put('/:event', update);


module.exports = router;