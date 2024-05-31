const path = require('path');
const fs = require('fs');
const events = require('../db/events.json');
class Event {
    static readEvents(queryString){
        if(Object.keys(queryString).length === 0 || !queryString){
            return events;
        }
        let filteredEvents = [...events];

        Object.keys(queryString).forEach(param => {
            filteredEvents = filteredEvents.filter(e => e[param] == queryString[param]);
        });

        return filteredEvents;

    }

    static addEvent(newEvent){
        const filePath = path.join(process.cwd(), 'db', 'events.json');
        const updateEvents = [...events, newEvent];
        const string = JSON.stringify(updateEvents, null, 2);
        fs.writeFileSync(filePath, string);
    }

    static updateEvent(updatedEvents){
        const filePath = path.join(process.cwd(), 'db', 'events.json');
        const sortedArray = updatedEvents.sort((a,b) => a.id - b.id);
        const string = JSON.stringify(sortedArray, null, 2);
        fs.writeFileSync(filePath, string);
    }

}

module.exports = Event;