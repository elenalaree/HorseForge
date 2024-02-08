import { Request, Response } from 'express';
import { ObjectId, InsertOneResult  } from 'mongodb';
import mongodb from '../database/index.ts';
import Horse, { HorseDocument } from '../models/index.ts';

interface InsertResponse<T> extends InsertOneResult<T> {
    ops: T[];
}

const getAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await mongodb.getDb().collection('breeds').find();
        const breeds = await result.toArray();
        res.json(breeds);
    } catch (error) {
        console.error('Error fetching all breeds:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getBreed = async (req: Request, res: Response): Promise<void> => {
    const horseId: string = req.params.id;
    try {
        const horse: HorseDocument | null = await mongodb.getDb().collection('breeds').findOne({ _id: new ObjectId(horseId) }) as HorseDocument | null;
        if (!horse) {
            return res.status(404).json({ message: 'Horse not found' });
        }
        res.json(horse);
    } catch (error) {
        console.error('Error fetching horse:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const createBreed = async (req: Request, res: Response): Promise<void> => {
    const horseData: typeof Horse = req.body; 

    try {
        const response: InsertOneResult<HorseDocument> = await mongodb.getDb().collection('breeds').insertOne(horseData);
        if (response.acknowledged) {
            res.status(201).json({ message: 'Horse created successfully', horse: (response as any).ops[0] });
        } else {
            res.status(500).json({ error: 'Some error occurred while creating the horse.' });
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
        const result = await mongodb.getDb().collection('breeds').updateOne(
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
    const horseId = req.params.id;
    try {
        const response = await mongodb.getDb().collection('breeds').deleteOne({ _id: horseId });
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

