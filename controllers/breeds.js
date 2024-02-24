const mongodb = require('../database/index.js');
const ObjectId = require('mongodb').ObjectId;
const Breed = require('../models/Breed.js');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');


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
    const breedId = req.params.id;
    try {
        const breed = await mongodb.getDb().db().collection('breeds').findOne({ _id: new ObjectId(breedId) });
        if (!breed) {
            return res.status(404).json({ message: 'Breeds not found' });
        }
        res.json(breed);
    } catch (error) {
        console.error('Error fetching breeds:', error);
        res.status(500).json({ error: 'Failed to fetch breeds.' });
    }
};

const createBreed = async (req, res) => {
    const breed = new Breed({
        name: req.body.name,
        height: req.body.height,
        average_age: req.body.average_age,
        weight: req.body.weight,
        classification: req.body.classification,
        colorings: req.body.colorings,
        interesting_fact: req.body.interesting_fact
    });

    try {
        const response = await mongodb.getDb().db().collection('breeds').insertOne(breed);
        if (response.acknowledged) {
            res.status(201).json({ message: 'Breed created successfully', breed });
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the breed.');
        }
    } catch (error) {
        console.error('Error creating breed:', error);
        res.status(500).json({ error: 'Internal server error' });
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
        const result = await mongodb.getDb().db().collection('breeds').updateOne(
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
    const breedId = new ObjectId(req.params.id);

    try {
        const response = await mongodb.getDb().db().collection('breeds').deleteOne({ _id: breedId });
        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'Breed deleted successfully' });
        } else {
            res.status(404).json({ message: 'Breed not found' });
        }
    } catch (error) {
        console.error('Error deleting breed:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getAll, getBreed, createBreed, updateBreed, deleteBreed };
