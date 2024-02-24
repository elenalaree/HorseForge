const { body, param } = require('express-validator');

const validateHorse = [
    // Name must not be empty
    body('name').notEmpty().withMessage('Name is required'),

    // Height is required
    body('height').notEmpty().withMessage('Height is required'),

    // Age is required
    body('age').notEmpty().isNumeric('Age is required'),

    // Weight is required
    body('weight').notEmpty().isNumeric('Weight is required'),

    // breed must not be empty
    body('breed').notEmpty().withMessage('Breed is required'),

    // Color must not be empty
    body('color').notEmpty().withMessage('Color is required'),

    // Interesting fact must not be empty
    body('gender').notEmpty().withMessage('Gender is required')
];
// Validation middleware for updating breed information
const validateUpdateHorse = [
    // Check if ID parameter is provided
    param('id').notEmpty().withMessage('ID parameter is required'),

    // Check if all required properties are provided in the request body
    body('name').notEmpty().withMessage('Name is required'),
    body('height').notEmpty().withMessage('Height is required'),
    body('age').notEmpty().withMessage('Age is required'),
    body('weight').notEmpty().withMessage('Weight is required'),
    body('breed').notEmpty().withMessage('Breed is required'),
    body('color').notEmpty().withMessage('Color is required'),
    body('gender').notEmpty().withMessage('Gender fact is required')
];

const validateDeleteHorse = [
    // Check if ID parameter is provided
    param('id').notEmpty().withMessage('ID parameter is required')
];


module.exports = {validateHorse, validateUpdateHorse, validateDeleteHorse};
