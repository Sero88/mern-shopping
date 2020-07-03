const router = require('express').Router();
const Product = require('../models/product.model');
const { route } = require('./products');


router.get('/', (req, res) => {
    Product.find()
        .then( products => {res.json(products)})
        .catch( err => {res.status(400).json( 'ERROR: ' + err)});
});



module.exports = router;