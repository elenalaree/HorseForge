const { body, param } = require('express-validator');

const validateBreed = [
    // Name must not be empty
    body('name').notEmpty().withMessage('Name is required'),

    // Height is required
    body('height').notEmpty().withMessage('Height is required'),

    // Average age is required
    body('average_age').notEmpty().withMessage('Average age is required'),

    // Weight is required
    body('weight').notEmpty().withMessage('Weight is required'),

    // Classification must not be empty
    body('classification').notEmpty().withMessage('Classification is required'),

    // Colorings must not be empty
    body('colorings').notEmpty().withMessage('Colorings is required'),

    // Interesting fact must not be empty
    body('interesting_fact').notEmpty().withMessage('Interesting fact is required')
];
// Validation middleware for updating breed information
const validateUpdateBreed = [
    // Check if ID parameter is provided
    param('id').notEmpty().withMessage('ID parameter is required'),

    // Check if all required properties are provided in the request body
    body('name').notEmpty().withMessage('Name is required'),
    body('height').notEmpty().withMessage('Height is required'),
    body('average_age').notEmpty().withMessage('Average age is required'),
    body('weight').notEmpty().withMessage('Weight is required'),
    body('classification').notEmpty().withMessage('Classification is required'),
    body('colorings').notEmpty().withMessage('Colorings is required'),
    body('interesting_fact').notEmpty().withMessage('Interesting fact is required')
];

const validateDeleteBreed = [
    // Check if ID parameter is provided
    param('id').notEmpty().withMessage('ID parameter is required')
];


module.exports = {validateBreed, validateUpdateBreed, validateDeleteBreed};
