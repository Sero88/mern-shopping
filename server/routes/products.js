const router = require('express').Router();
const Product = require('../models/product.model');
const { model } = require('../models/product.model');

router.route('/').get( (req, res) => {
    Product.find()
        .then( products => {res.json(products)})
        .catch( err => {res.status(400).json( 'ERROR: ' + err)});
});


router.get('/test', (req, res) => {
    res.json('test');
});

module.exports = router;