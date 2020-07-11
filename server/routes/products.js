const router = require('express').Router();
const Product = require('../models/product.model');


router.route('/test').get( (req, res) => {
    console.log(req.user);
   
   res.json('done ' + req.isAuthenticated());
});

router.route('/:id').get( (req, res) => {
    Product.find( {_id: req.params.id})
        .then( product => res.json(product) )
        .catch( err => res.status(400).json( 'ERROR: ' + err ) );
});


router.route('/').get( (req, res) => {
    Product.find()
        .then( products => res.json(products) )
        .catch( err => res.status(400).json( 'ERROR: ' + err) );
});

module.exports = router;