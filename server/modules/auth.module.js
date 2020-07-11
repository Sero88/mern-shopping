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
           
            const user = {
                thirdPartyId: profile.id,
                firstName: profile.name.givenName, 
                lastName: profile.name.familyName,
                email: profile._json.email, 
                lastLogin: new Date()
            }

            console.log(user);
            User.findOneAndUpdate({thirdPartyId: profile.id}, user, {upsert:true, new:true}, 
                (err, doc) => {
                    console.log('saved', doc);
                    return cb(null, doc);
                }
            );
           
        }
    ))

    passport.serializeUser((user, cb) => {
        cb(null, user.thirdPartyId);
    });

    passport.deserializeUser( (id, cb) => {
        User.find({thirdPartyId: id}, (err, doc) => {
            if(err){
                console.error(err);
            } else{
                cb(null, doc);
            }            
        })
        
    });
}

