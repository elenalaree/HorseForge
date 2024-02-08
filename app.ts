const express = require("express");
const port = process.env.PORT || 3001;
const dot = require('dotenv');
dot.config();
const bodyParser = require('body-parser');
const mongodb = require("./database/contactsDB")


const app = express();
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
    })
    .use('/', require('./routes'));


mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});