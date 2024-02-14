const routes = require('express').Router();

const {validateBreed, validateUpdateBreed, validateDeleteBreed } = require('../validation/horse.js');


const controls = require('../controllers/breeds.js')
// Get all contacts
routes.get("/", controls.getAll);

// Get one breed

routes.get("/:id", controls.getBreed);
// Create Breed
routes.post("/", validateBreed, controls.createBreed);
// Modify Breed
routes.put('/:id', validateUpdateBreed, controls.updateBreed);
// Delete breed
routes.delete('/:id', validateDeleteBreed, controls.deleteBreed);


module.exports = routes;