const Event = require('../models/event.js');
const events = require('../db/events.json');

const index = (req, res) => {
    res.json({
        events: Event.readEvents(req.query)
    });
}

const store = (req, res) => {
    let newEvent;
    let {title, description, date, maxSeats} = req.body

    
    if(!title || !description || !date || !maxSeats){
        return res.status(400).send("One or more informations are missing");
    }

    maxSeats = Number(maxSeats);
    const lastEventID = events[events.length-1].id;
    newEvent = {
        id: lastEventID+1,
        title,
        description,
        date,
        maxSeats
    }
    Event.addEvent(newEvent);
    res.json({
        newEvent: newEvent
    })

}

const update = (req, res) => {
    res.json({message: "Update Route"});
}

module.exports = {
    index,
    store,
    update
}