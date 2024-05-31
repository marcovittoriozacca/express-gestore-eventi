const Event = require('../models/event.js');
const Reservation = require('../models/reservation.js');

const index = (req, res) => {
    const {event} = req.params;
    const filteredReservations = Event.getReservations(Number(event));
    res.json({
        reservations: filteredReservations
    })

}

const store = (req, res) => {
    let {firstName, lastName, email} = req.body; 
    const eventId = req.params.event;
    const reservation = new Reservation(firstName, lastName, email, eventId);
    const newReservation = Reservation.addReservation(reservation);

    res.json({
        newReservation: newReservation
    })
}

const destroy = (req, res) => {
    
    res.send(`${req.params.event} - ${req.params.reservation}`);
}

module.exports = {
    index,
    store,
    destroy
}