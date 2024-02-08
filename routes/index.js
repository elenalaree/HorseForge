const routes = require('express').Router();
const controls = require('../controllers')


// Get all breeds
routes.use('/breeds', require('./breed-routes.js'));
routes.use('/', require('./swagger.js'));
routes.get("/", controls.openName);



module.exports = routes;