const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const uri = "https://localhost:3001/google/callback" || "https://horse-forge.onrender.com/google/callback"

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: uri ,
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, cb) {
    
      return cb(null, profile);
  }
));

passport.serializeUser(function(user, cb) {
    cb(null, user)
})
passport.deserializeUser(function(user, cb) {
    cb(null, user)
})
