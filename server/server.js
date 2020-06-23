const express = require('express');
const helmet = require('helmet');
require('dotenv').config();
const routes = require('./routes');

const app = express();
app.use(helmet());


//Connect to DB
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//once connected proceed with setting up server
db.once('open', () => {
    console.log('db connection: success');
    const port = process.env.PORT || 3000;

    routes.setRoutes(app);
    app.listen(port, () => console.log('Listening on port:' + port));
});



