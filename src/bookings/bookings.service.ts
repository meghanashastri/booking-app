import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { InjectModel } from "@nestjs/mongoose";
import console from "console";
import { Model } from "mongoose";
import { AuthService } from "src/auth/auth.service";
import { Booking } from "./booking.model";

@Injectable()
export class BookingsService{
    constructor(@InjectModel('Booking') private readonly bookingModel: Model<Booking>, 
    private authService: AuthService){}

    async insertBooking(status: string, client: string, created_by: string, from_hub: string, to_hub: string){
        const type = await this.authService.findUserType(client);
        if(type === 'Client'){
            const newBooking = new this.bookingModel({status: status, client: client, created_by: created_by, 
                from_hub:from_hub, to_hub: to_hub});
            const result = await newBooking.save();
            return result.id as string;
        }else{
            return 'Only Client can create a booking.'
        }  
    }

    /*async getAllBookings(){
        const bookings = await this.bookingModel.find().exec();
        return bookings as Booking[];
    }*/

    find(options) {
        return this.bookingModel.find(options);
    }

    count(options) {
        return this.bookingModel.count(options).exec();
    }

    async getBooking(bookingId: string){
        const booking = await this.findBooking(bookingId);
        return {id: booking.id, status: booking.status, created_by: booking.created_by};
    }

    async updateBooking(bookingId: string, status: string, client: string, created_by: string, 
        from_hub: string, to_hub: string) : Promise<string>{
        const booking = await this.findBooking(bookingId);

        const type = await this.authService.findUserType(booking.client);

        if(type === 'Client'){

        if(status && status!=='in-progress' || status !== 'completed'){
            booking.status = status;
        }
        if(client){
            booking.client = client;
        }
        if(created_by){
            booking.created_by = created_by;
        }
        if(from_hub){
            booking.from_hub = from_hub;
        }
        if(to_hub){
            booking.to_hub = to_hub;
        }

        booking.save();
        return 'Booking updated'
    }else{
        return 'Only Client can update booking.'
    }  
    }

    async startEndTrip(bookingId: string, status: string, userId: string) : Promise<string>{
        const booking = await this.findBooking(bookingId);
        const type = await this.authService.findUserType(userId);

        if(type === 'Partner'){
            if(status && status === 'in-progress' || status === 'completed'){
                booking.status = status;
            }
            booking.save();
            return 'Booking updated';

        }else{
            return 'Only Partner can start and stop trip';
        }
    }

    async deleteBooking(bookingId: string){
       const result = await this.bookingModel.deleteOne({_id: bookingId}).exec();
       if(!result.acknowledged){
           throw new NotFoundException('Could not find booking.');  
       }
    }

    async findBooking(bookingId: string): Promise<Booking>{
        let booking;
        try {
        booking = await this.bookingModel.findById(bookingId).exec();
        } catch (error) {
            throw new NotFoundException('Could not find booking.');   
        }

        if(!booking){
            throw new NotFoundException('Could not find booking.');

        }
        return booking;
    }
}