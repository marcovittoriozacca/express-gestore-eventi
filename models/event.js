const path = require('path');
const fs = require('fs');
const events = require('../db/events.json');
class Event {
    static readEvents(queryString){
        if(Object.keys(queryString).length === 0 || !queryString){
            return events;
        }
        console.log(Object.keys(queryString))
        let filteredEvents = [...events];

        Object.keys(queryString).forEach(param => {
            filteredEvents = filteredEvents.filter(e => e[param] == queryString[param]);
        });

        return filteredEvents;

    }

    static singleEvent(eventId){
        const eventFound = events.find(e => e.id == eventId);
        return eventFound;
    }

    static addEvent(newEvent){
        const filePath = path.join(process.cwd(), 'db', 'events.json');
        const updateEvents = [...events, newEvent];
        const string = JSON.stringify(updateEvents, null, 2);
        fs.writeFileSync(filePath, string);
    }
}

module.exports = Event;