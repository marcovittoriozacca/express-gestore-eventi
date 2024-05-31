const reservations = require('../db/reservations.json');
const path = require('path')
const fs = require('fs');
const {validateEmail} = require('../utils.js');
const filePath = path.join(process.cwd(), 'db', 'reservations.json');
class Reservation {
    constructor(firstName, lastName, email, eventId, id = null){
        this.id = id !== null? id : this.constructor.idHandler();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.eventId = Number(eventId);
    }


    static addReservation(newReservation){

        let {firstName, lastName, email, eventId} = newReservation;

        if(!firstName || firstName.trim().replace(/[^\w\s]|_/g, ' ').length === 0 || !lastName || lastName.trim().replace(/[^\w\s]|_/g, ' ').length === 0){
            throw new Error;
        }
        if(!email || !validateEmail(email)){
            throw new Error;
        }
        if(!eventId){
            throw new Error;
        }
        console.log(newReservation)
        const updateReservations = [...reservations, newReservation];
        const string = JSON.stringify(updateReservations, null, 2);
        fs.writeFileSync(filePath, string);

        return newReservation;
    }

    static removeReservation(eventId, reservationId){
        
        const reservationToDelete =  reservations.find(r => r.id === reservationId && r.eventId === eventId);

        console.log(reservationToDelete)
        const filteredReservations = reservations.filter(r => r.id !== reservationToDelete.id);

        const updateReservations = [...filteredReservations];
        const string = JSON.stringify(updateReservations, null, 2);
        // fs.writeFileSync(filePath, string);
    }


    static idHandler() {
        return reservations.length !== 0 ? reservations[reservations.length - 1].id + 1 : 1;
    }
}

module.exports = Reservation;