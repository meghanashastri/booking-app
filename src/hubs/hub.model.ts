import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const HubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter Hub name'],
        trim: true,
        maxlength: [40, 'Hub name cannot be more than 50 characters']
    },
    location: {
        type: [Number],
        required: [true, 'Please enable location']
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Auth'
    }

})

export interface Hub extends mongoose.Document{
    id: string;
    name: string;
    owner: string;
}