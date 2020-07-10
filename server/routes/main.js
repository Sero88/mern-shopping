const router = require('express').Router();
const Product = require('../models/product.model');


router.get('/', (req, res) => {
    console.log(req.user);
    res.status(200).json(req.user);
    //res.sendFile('index.html');
});



module.exports = router;