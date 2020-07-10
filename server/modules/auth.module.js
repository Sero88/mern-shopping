const passport = require('passport');
const Strategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user.model');


module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session()); 
    
    //authentication
    passport.use( new Strategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
        function(accessTotken, refreshToken, profile, cb){
            ///console.dir(profile);
            return cb(null, profile);
        }
    ))

    passport.serializeUser((user, cb) => {
        cb(null, user);
    });

    passport.deserializeUser( (obj, cb) => {
        cb(null, obj);
    });
}

