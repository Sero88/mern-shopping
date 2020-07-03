const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

//middleware
app.use(helmet());
app.use(cors());
//app.use(express.static('../client/public'));


//Connect to DB
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//once connected to the db - set up server
db.once('open', () => {
    console.log('db connection: success');
    const port = process.env.PORT || 5000;

    //set routes
    const mainRoutes = require('./routes/main');
    const productRoutes = require('./routes/products');

    app.use('/', mainRoutes);
    app.use('/api/products', productRoutes);
    app.listen(port, () => console.log('Listening on port:' + port));
});



