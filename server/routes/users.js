const router = require('express').Router();
const Users = require('../models/user.model');

router.get('/', (req, res) => {
    const user = {};
    if(req.user && req.user[0]){
        user.firstName = req.user[0].firstName
    }
    res.json(user);
});

module.exports = router;