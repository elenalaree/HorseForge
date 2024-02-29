const express = require("express");
const session = require("express-session")
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const mongodb = require("./database/index.js");
const passport = require('passport');
const { ensureAuthenticated } = require("./validation/auth.js");
require('./validation/auth.js')

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401)
}

const app = express();
const port = process.env.PORT || 3001;


app
    .use(bodyParser.json());


app
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
    })
    
    

app.get("/", (req, res) => {
    res.send('<a href="/auth/google">Authenticate with google</a>')
    });
app.get('/auth/google',
    passport.authenticate('google', {scope: ['email', 'profile'] }));
    
app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure'
        }));
app.use('/protected', require('./routes'));


mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});