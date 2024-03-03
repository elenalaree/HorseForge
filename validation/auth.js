const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const uri ="https://horse-forge.onrender.com/auth/google/callback"

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: uri,
    passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, cb) {
        console.log("Inside Passport creation.")
        return cb(null, profile);
    }
));

passport.serializeUser(function (user, cb) {
    console.log("Inside serializer.")
    cb(null, user)
})
passport.deserializeUser(function (user, cb) {
    cb(null, user)
})
