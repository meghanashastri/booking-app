import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const AssignBookingSchema = new mongoose.Schema({
    driverId:{
        type: Schema.Types.ObjectId,
        ref: 'Auth'
    },
    bookingId: {
        type: Schema.Types.ObjectId,
        ref: 'Booking'
    }
})

export interface AssignBooking extends mongoose.Document{
    id: string;
    driverId: string;
    bookingId: string;
}