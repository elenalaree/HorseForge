const express = require("express");
const session = require("express-session")
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const mongodb = require("./database/index.js");
const passport = require('passport');
const { ensureAuthenticated } = require("./validation/auth.js");
require('./validation/auth.js')

const app = express();
const port = process.env.PORT || 3001;

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401)
}

// Configure session middleware
app.use(session({
    secret: process.env.SUPERSECRET,
    resave: false,
    saveUninitialized: false
}));

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());



app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        );
        res.setHeader(
            'Access-Control-Allow-Methods',
            'GET, POST, PATCH, PUT, DELETE, OPTIONS'
        );
        next();
    });



app.get("/", (req, res) => {
    res.send('<a href="/auth/google">Authenticate with google</a>')
    });
app.get('/auth/google',
    passport.authenticate('google', {scope: ['email', 'profile'] }));
    
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure'
        }));
app.use('/protected', isLoggedIn, require('./routes'));

app.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

app.get('/auth/google/failure', (req, res) => {
    res.send('Failed to authenticate..');
  });


mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});