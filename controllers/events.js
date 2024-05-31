const Event = require('../models/event.js');

const index = (req, res) => {
    res.json({
        events: Event.readEvents(req.query)
    });
}

const store = (req, res) => {
    res.json({message: "Store Route"});
}

const update = (req, res) => {
    res.json({message: "Update Route"});
}

module.exports = {
    index,
    store,
    update
}