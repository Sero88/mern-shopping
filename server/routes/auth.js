const router = require('express').Router();
const User = require('../models/user.model');
const passport = require('passport');


router.get('/google/', passport.authenticate('google', {scope: ['profile']} ) );

router.get('/google/callback/', passport.authenticate('google', {failureRedirect: '/'}), 
    (req, res) => {
        res.redirect('/');
    }
);


module.exports = router;
