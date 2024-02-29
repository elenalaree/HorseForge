const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const URI_token = "https://localhost:3001/login" || "https://horse-forge.onrender.com"

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: URI_token
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));