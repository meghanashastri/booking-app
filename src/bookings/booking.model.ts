import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const BookingSchema = new mongoose.Schema({
    status:{
        type: String,
        enum: ['created', 'assigned', 'cancelled', 'in-progress', 'completed', 'expired'],
        required: [true, 'Please enter status of booking']
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Auth'
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'Auth',
    },
    start_time: {
        type: Date,
        default: Date.now
    },
    from_hub: {
        type: Schema.Types.ObjectId,
        ref: 'Hub'
    },
    to_hub: {
        type: Schema.Types.ObjectId,
        ref: 'Hub'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

export interface Booking extends mongoose.Document{
    id: string;
    client: string;
    from_hub: string;
    to_hub: string;
    status: string;
    created_by: string;
}