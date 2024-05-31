const Event = require('../models/event.js');
const events = require('../db/events.json');

const index = (req, res) => {
    res.json({
        events: Event.readEvents(req.query)
    });
}

const store = (req, res) => {
    let {title, description, date, maxSeats} = req.body
    
    const event = new Event(title, description, date, maxSeats);

    Event.addEvent(event);
    res.json({
        newEvent: event
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
    const update = Event.updateEvent(eventFound, req.body);

    res.json({
        updatedEvent: update
    })


}

module.exports = {
    index,
    store,
    update
}