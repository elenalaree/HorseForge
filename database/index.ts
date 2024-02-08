import dotenv from 'dotenv';
import { MongoClient, Db } from 'mongodb';

dotenv.config();

let db: Db | null = null;

const initDb = (callback: (error: Error | null, db: Db | null) => void): void => {
    if (db) {
        console.log('Db is already initialized!');
        return callback(null, db);
    }
    MongoClient.connect(process.env.MONGODB_URI as string)
        .then((client: MongoClient) => {
            db = client.db();
            callback(null, db);
        })
        .catch((err: Error) => {
            callback(err, null);
        });
};

const getDb = (): Db => {
    if (!db) {
        throw new Error('Db not initialized');
    }
    return db;
};

export default {
    initDb,
    getDb
};
