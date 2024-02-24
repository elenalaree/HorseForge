const routes = require('express').Router();

const {validateHorse, validateUpdateHorse, validateDeleteHorse } = require('../validation/horse.js');


const controls = require('../controllers/horses.js')
// Get all contacts
routes.get("/", controls.allHorses);

// Get one breed

routes.get("/:id", controls.getHorse);
// Create Horse
routes.post("/", controls.createHorse);
// Modify Horse
routes.put('/:id', validateUpdateHorse, controls.updateHorse);
// Delete breed
routes.delete('/:id', validateDeleteHorse, controls.deleteHorse);


module.exports = routes;