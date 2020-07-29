const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const auth = require('./modules/auth.module');

require('dotenv').config();
const app = express();

//middleware
app.use(helmet());
app.use(cors());
app.use(express.static('../client/build/'));
//app.use(express.static('../public/'));
app.use(session ({
    secret: process.env.SESSION_SECRET,
    resave: true, 
    saveUninitialized: true
    })
);

//authentication
auth(app);


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
    const authRoutes = require('./routes/auth');
    const usersRoutes = require('./routes/users');
    const paymentRoutes = require('./routes/payment');

    app.use('/', mainRoutes);
    app.use('/api/products', productRoutes);
    app.use('/auth', authRoutes);
    app.use('/users', usersRoutes);
    app.use('/payments', paymentRoutes);

    app.get('*', (req, res) => {       
        res.sendFile(path.join(__dirname, './../client/build/', 'index.html' ));
    })

    app.listen(port, () => console.log('Listening on port:' + port));
});



