import mongoose, { Schema, Document } from 'mongoose';

interface IHorse extends Document {
    name: string;
    height: string;
    average_age: string;
    weight: string;
    classification: string;
    colorings: string;
    interesting_fact: string;
}

const horseSchema: Schema = new Schema({
    name: { type: String, required: true },
    height: { type: String, required: true },
    average_age: { type: String, required: true },
    weight: { type: String, required: true },
    classification: { type: String, required: true },
    colorings: { type: String, required: true },
    interesting_fact: { type: String, required: true }
});

const Horse = mongoose.model<IHorse>('Horse', horseSchema);

export default Horse;

// Define HorseDocument interface
export interface HorseDocument extends IHorse, Document {}