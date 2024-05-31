const path = require('path');
const fs = require('fs');
const events = require('../db/events.json');
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
        const filePath = path.join(process.cwd(), 'db', 'events.json');
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

        const filePath = path.join(process.cwd(), 'db', 'events.json');
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

}

module.exports = Event;