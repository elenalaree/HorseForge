const mongoose = require('mongoose');

const horseSchema = mongoose.Schema({
    name: { type: String, required: true },
    height: { type: String, required: true },
    average_age: { type: String, required: true },
    weight: { type: String, required: true },
    classification: { type: String, required: true },
    colorings: { type: String, required: true },
    interesting_fact: { type: String, required: true }
}, { collection: 'breeds' });


module.exports = mongoose.model('Breed', breedSchema);
