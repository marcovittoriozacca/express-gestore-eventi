const express = require('express');
const {index, store, update} = require('../controllers/events.js');

const router = express.Router();

router.get('/', (req, res) => res.json({message: "Index Route"}));

router.post('/', (req, res) => res.json({message: "Store Route"}));

router.put('/:event', (req, res) => res.json({message: "Update Route"}));


module.exports = router;