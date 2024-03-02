const routes = require('express').Router();
const passport = require('passport');
const controls = require('../controllers')


// Get all breeds
routes.get('/', controls.openName); 
routes.use('/breeds', require('./breed-routes.js'));
routes.use('/horses', require('./barn-routes.js'));
routes.use('/', require('./swagger.js')); 
module.exports = routes;