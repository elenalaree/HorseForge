const mongodb = require('../database/index.js');
const ObjectId = require('mongodb').ObjectId;
const Horse = require('../models/Horse.js');
const { validationResult } = require('express-validator');


const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDb().db().collection('breeds').find();
        const breeds = await result.toArray();
        res.json(breeds);
    } catch (error) {
        console.error('Error fetching all breeds:', error);
        res.status(500).json({ error: 'Failed to fetch breeds.' });
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
        res.status(500).json({ error: 'Failed to fetch breeds.' });
    }
};

const createBreed = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const horse = new Horse({
            name: req.body.name,
            height: req.body.height,
            average_age: req.body.average_age,
            weight: req.body.weight,
            classification: req.body.classification,
            colorings: req.body.colorings,
            interesting_fact: req.body.interesting_fact
        });

        // Save the horse to the database
        await horse.save();

        res.status(201).json({ message: 'Horse breed created successfully', horse });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

const updateBreed = async (req, res) => {
    const infoId = req.params.id;
    const updatedInfoData = req.body; // Get the updated info data from the request body
    try {
        // Check if any required properties are missing
        if (!updatedInfoData.name || !updatedInfoData.height || !updatedInfoData.average_age || !updatedInfoData.weight || !updatedInfoData.classification || !updatedInfoData.colorings || !updatedInfoData.interesting_fact) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Update the information in the database
        const result = await mongodb.getDb().db().collection('Infos').updateOne(
            { _id: new ObjectId(infoId) },
            { $set: updatedInfoData } // Use $set to update specific fields
        );

        if (result.matchedCount === 0) {
            // No information with the specified ID was found
            return res.status(404).json({ message: 'Information not found' });
        }

        console.log("Information updated successfully");
        res.status(200).json({ message: 'Information updated successfully' });
    } catch (error) {
        console.error('Error updating information:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


const deleteBreed = async (req, res) => {
    const horseId = new ObjectId(req.params.id);

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

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
