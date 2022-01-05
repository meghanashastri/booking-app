import * as mongoose from 'mongoose';

export const AuthSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Please enter name'],
        trim: true,
        maxlength: [40, 'Name cannot be more than 50 characters']
    },
    phone: {
        type: Number,
        unique: true,
        required: [true, 'Please enter phone number'],
        trim: true,
        minlength: 10,
        maxlength: 10
    },
    active:{
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        enum: ['Client', 'Partner'],
        required: [true, 'Please enter User Type']
    },
    password:{
        type: String,
        required: [true, 'Please enter password'],
        trim: true,
        maxlength: [20, 'Password cannot be more than 20 characters']
    }
})

export interface Auth extends mongoose.Document{
    id: string;
    phone: number;
    password: string;
    type: string;
}