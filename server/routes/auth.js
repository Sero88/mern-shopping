const router = require('express').Router();
const User = require('../models/user.model');
const passport = require('passport');


router.get('/google/', passport.authenticate('google', {scope: ['profile', 'email']}) );

router.get('/google/callback/', passport.authenticate('google', {failureRedirect: '/'}), 
    (req, res) => {
        res.redirect('/');
    }
);

//router.get('/user')

module.exports = router;
