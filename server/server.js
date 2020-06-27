const express = require('express');
const helmet = require('helmet');
require('dotenv').config();
const routes = require('./routes');

const app = express();

//middleware
app.use(helmet());
app.use(express.static('../public'));


//Connect to DB
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//once connected to the db - set up server
db.once('open', () => {
    console.log('db connection: success');
    const port = process.env.PORT || 3000;

    //set routes
    const productRoutes = require('./routes/products');
    console.log(productRoutes.stack);

    app.get('/test', (req, res) => {
        return res.status(400).json('test false');
    })
    
    app.get('/', (req, res) => {
        return res.json(app._router.stack);
    });

    app.use('/api/products', productRoutes);
    app.listen(port, () => console.log('Listening on port:' + port));
});



