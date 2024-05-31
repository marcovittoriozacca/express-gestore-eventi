const express = require('express');
const {index, store, update} = require('../controllers/events.js');


const router = express.Router();

router.get('/', index);

router.post('/', (req, res) => res.json({message: "Store Route"}));

router.put('/:event', update);


module.exports = router;