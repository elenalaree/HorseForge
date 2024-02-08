const routes = require('express').Router();

const controls = require('../controllers/breeds.js')
// Get all contacts
routes.get("/", controls.getAll);

// Get one breed

routes.get("/:id", controls.getBreed);
// Create Breed
routes.post("/", controls.createBreed);
// Modify Breed
routes.put('/:id', controls.updateBreed);
// Delete breed
routes.delete('/:id', controls.deleteBreed);


module.exports = routes;