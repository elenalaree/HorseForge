const mongodb = require('../database/index.js');
const ObjectId = require('mongodb').ObjectId;
const Horse = require('../models/Breed.js');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');


const allHorses = async (req, res) => {
    try {
        const result = await mongodb.getDb().db().collection('myBarn').find();
        const horses = await result.toArray();
        res.json(horses);
    } catch (error) {
        console.error('Error fetching all horses:', error);
        res.status(500).json({ error: 'Failed to fetch horses.' });
    }
};

const getHorse = async (req, res) => {
    const horseId = req.params.id;
    try {
        const horse = await mongodb.getDb().db().collection('myBarn').findOne({ _id: new ObjectId(horseId) });
        if (!horse) {
            return res.status(404).json({ message: 'Horse not found' });
        }
        res.json(horse);
    } catch (error) {
        console.error('Error fetching horse:', error);
        res.status(500).json({ error: 'Failed to fetch horse.' });
    }
};

const createHorse = async (req, res) => {
    const horse = new Horse({
        name: req.body.name,
        height: req.body.height,
        age: req.body.age,
        weight: req.body.weight,
        breed: req.body.breed,
        color: req.body.color,
        gender: req.body.gender
    });

    try {
        const response = await mongodb.getDb().db().collection('myBarn').insertOne(horse);
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



const updateHorse = async (req, res) => {
    const infoId = req.params.id;
    const updatedInfoData = req.body; // Get the updated info data from the request body
    try {
        // Check if any required properties are missing
        if (!updatedInfoData.name || !updatedInfoData.height || !updatedInfoData.age || !updatedInfoData.weight || !updatedInfoData.breed || !updatedInfoData.color || !updatedInfoData.gender) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Update the information in the database
        const result = await mongodb.getDb().db().collection('myBarn').updateOne(
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


const deleteHorse = async (req, res) => {
    const horseId = new ObjectId(req.params.id);

    try {
        const response = await mongodb.getDb().db().collection('myBarn').deleteOne({ _id: horseId });
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

module.exports = { allHorses, getHorse, createHorse, updateHorse, deleteHorse };