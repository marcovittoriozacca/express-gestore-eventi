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
    let {event} = req.params;
    event = Number(event);
    const eventFound = events.find(e => e.id === event);

    if(!eventFound){
        return res.status(400).json({
            status: 400,
            error: `No element with id:${event} found.`
        })
    }
    let {title, description, date, maxSeats} = req.body;
    maxSeats = Number(maxSeats);
    const updatedEvent = {
        id: event,
        title: title || eventFound.title,
        description: description || eventFound.description,
        date: date || eventFound.date,
        maxSeats: maxSeats || eventFound.maxSeats,
    }

    const filteredEvents = events.filter(e => e.id !== event);

    Event.updateEvent([...filteredEvents, updatedEvent]);


}

module.exports = {
    index,
    store,
    update
}