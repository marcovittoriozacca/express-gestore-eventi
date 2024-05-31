const path = require('path');
const fs = require('fs');
const events = require('../db/events.json');
const reservations = require('../db/reservations.json');
const Reservation = require('./reservation.js');
const filePath = path.join(process.cwd(), 'db', 'events.json');
class Event {
    constructor(title, description, date, maxSeats, id = null){
        if(!title || !description || !date || !maxSeats){
            throw new Error("One or more informations are missing");
        }
        this.id = id !== null? id : this.constructor.idHandler();
        this.title = title;
        this.description = description;
        this.date = date;
        this.maxSeats = Number(maxSeats);
    };


    static readEvents(queryString){
        let instantiatedArray = events.map(e => this.instantiationHandler(e));

        if(Object.keys(queryString).length === 0 || !queryString){
            return instantiatedArray;
        }

        Object.keys(queryString).forEach(param => {
            instantiatedArray = instantiatedArray.filter(e => e[param] == queryString[param]);
        });
        return instantiatedArray;

    };

    static addEvent(newEvent){
        const updateEvents = [...events, newEvent];
        const string = JSON.stringify(updateEvents, null, 2);
        fs.writeFileSync(filePath, string);
    }

    static updateEvent(oldEvent, newEvent){
        
        let {title, description, date, maxSeats} = newEvent;
        let {id} = oldEvent;

        const updatedEvent = {
            id: id,
            title: title || oldEvent.title,
            description: description || oldEvent.description,
            date: date || oldEvent.date,
            maxSeats: maxSeats || oldEvent.maxSeats,
        }

        const filteredEvents = events.filter(e => e.id !== id);

        const newArray = [...filteredEvents, updatedEvent];
        const sortedArray = newArray.sort((a,b) => a.id - b.id);
        const string = JSON.stringify(sortedArray, null, 2);
        fs.writeFileSync(filePath, string);

        return updatedEvent;
    }

    static instantiationHandler(element){
        return new Event(element.title, element.description, element.date, element.maxSeats, element.id);
    }

    static idHandler() {
        return events.length !== 0 ? events[events.length - 1].id + 1 : 1;
    }

    static getReservations(id) {
        const filteredReservations = reservations.filter(r => r.eventId === id);
        const instantiatedReservations = filteredReservations.map(r => new Reservation(r.firstName, r.lastName, r.email, r.eventId, r.id));
        return instantiatedReservations;
    }


    set setTitle(newTitle){
        if(!newTitle || newTitle.trim().replace(/[^\w\s]|_/g, ' ').length === 0){
            throw new Error();
        }
        this.title = newTitle;
        
    }

    set setDescription(newDescription){
        if(!newDescription){
            throw new Error();
        }
        this.description = newDescription;
        
    }

    set setDate(newDate){
        const checkDate = new Date(newDate);
        if(!newDate || isNaN(checkDate)){
            throw new Error();
        }
        this.date = newDate;
        
    }

    set setMaxSeats(newMaxSeats){
        if(!newMaxSeats || newMaxSeats < 1 || typeof newMaxSeats !== "number"){
            throw new Error();
        }
        this.maxSeats = newMaxSeats;
        
    }

}

module.exports = Event;