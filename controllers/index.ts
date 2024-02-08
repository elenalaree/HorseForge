const mongodb = require('../database/mongoDB');
const ObjectId = require('mongodb').ObjectId;
const Horse = require('../models/horse-model');


const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDb().db().collection('breeds').find();
        const breeds = await result.toArray();
        res.json(breeds);
    } catch (error) {
        console.error('Error fetching all breeds:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getBreed = async (req, res) => {
    const horseId = req.params.id;
    try {
        const horse = await mongodb.getDb().db().collection('breeds').findOne({ _id: new ObjectId(horseId) });
        if (!horse) {
            return res.status(404).json({ message: 'Horse not found' });
        }
        res.json(horse);
    } catch (error) {
        console.error('Error fetching horse:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createBreed = async (req, res) => {
    const horse = new Horse({
        name: req.body.name,
        height: req.body.height,
        average_age: req.body.average_age,
        weight: req.body.weight,
        classification: req.body.classification,
        colorings: req.body.colorings,
        interesting_fact: req.body.interesting_fact
    });

    try {
        const response = await mongodb.getDb().db().collection('breeds').insertOne(horse);
        if (response.acknowledged) {
            res.status(201).json({ message: 'Horse created successfully', horse });
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the horse.');
        }
    } catch (error) {
        console.error('Error creating horse:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateBreed = async (req, res) => {
    const horseId = req.params.id;
    const updatedHorseData = req.body;

    try {
        const result = await mongodb.getDb().db().collection('breeds').updateOne(
            { _id: new ObjectId(horseId) },
            { $set: updatedHorseData }
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Horse not found' });
        }
        res.status(200).json({ message: 'Horse updated successfully' });
    } catch (error) {
        console.error('Error updating horse:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteBreed = async (req, res) => {
    const horseId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDb().db().collection('breeds').deleteOne({ _id: horseId });
        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'Horse deleted successfully' });
        } else {
            res.status(404).json({ message: 'Horse not found' });
        }
    } catch (error) {
        console.error('Error deleting horse:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getAll, getBreed, createBreed, updateBreed, deleteBreed };

