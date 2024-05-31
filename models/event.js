const path = require('path');
const fs = require('fs');
const events = require('../db/events.json');
console.log(path.join(process.cwd(), 'db', 'events.json'));
class Event {
    constructor(id, title, description, date, maxSeats){
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.maxSeats = maxSeats;
    }

    static readEvents(){
        return events;
    }

    static addEvent(newEvent){
        const filePath = path.join(process.cwd(), 'db', 'events.json');
        const updateEvents = [...events, newEvent];
        const string = JSON.stringify(updateEvents);
        fs.writeFileSync(filePath, string);
    }
}