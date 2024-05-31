require('dotenv').config();
const express = require('express');
const events = require('./routers/events.js');
const errorHandler = require('./middlewares/errorHandler.js');
const notFound = require('./middlewares/notFound.js');
const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";


app.use('/events', events);


app.use(notFound);
app.use(errorHandler);

app.listen(port, host, () => {
    console.log(`Server avviato: http://${host}:${port}`)
})
