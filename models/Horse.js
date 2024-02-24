const mongoose = require('mongoose');

const horseSchema = mongoose.Schema({
    name: { type: String, required: true },
    height: { type: String, required: true },
    age: { type: Number, required: true },
    weight: { type: Number, required: true },
    breed: { type: String, required: true },
    color: { type: String, required: true },
    gender: { type: String, required: true }
}, { collection: 'myBarn' });


module.exports = mongoose.model('Horse', horseSchema);