const Product = require('./models/product.model');
const mongoose = require('mongoose');

exports.setRoutes = function (app) {
    app.get('/', function (req, res) { 
        Product.find() 
            .then( products => {
                res.json(products);
            })
            .catch(err => res.status(400).json('Error ' + err));
    });
};
