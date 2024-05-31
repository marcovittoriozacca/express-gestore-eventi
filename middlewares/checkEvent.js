const events = require('../db/events.json');
const reservations = require('../db/reservations.json');

const checkEventDate = (req, res, next) => {
    let {event} = req.params;
    let foundEvent = events.find(e => e.id === Number(event));

    if (!foundEvent) {
        return res.status(404).json({
            status: 404,
            error: 'Event not found',
        });
    }

    let actualDate = new Date();
    actualDate.setHours(0, 0, 0, 0);

    let eventDate = new Date(foundEvent.date);
    eventDate.setHours(0, 0, 0, 0);

    if (actualDate < eventDate) {
        return next();
    }

    const diffTime = Math.abs(actualDate - eventDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    res.status(400).json({
        status: 400,
        error: `Cannot reserve or delete an already existing reservation for this event anymore because ${foundEvent.date} was ${diffDays} days ago`,
    });
    
    
}

const checkMaxSeats = (req, res, next) => {
    let {event} = req.params;
    let foundEvent = events.find(e => e.id === Number(event));

    if (!foundEvent) {
        return res.status(404).json({
            status: 404,
            error: 'Event not found',
        });
    }

    const seatsAvailable = reservations.reduce((acc, currentValue) => {
        if(currentValue.eventId === Number(event)){
            acc--;
        }
        return acc;
    }, Number(foundEvent.maxSeats))

    if(seatsAvailable < 1){
        return res.status(400).json({
            status:400,
            message:"Sorry, there are no seats available for this event"
        })
    }
    next();

}

module.exports = {
    checkEventDate,
    checkMaxSeats
}

