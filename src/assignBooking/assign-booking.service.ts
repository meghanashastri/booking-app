import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuthService } from "src/auth/auth.service";
import { BookingsService } from "src/bookings/bookings.service";
import { AssignBooking } from './assign-booking.model';

@Injectable()
export class AssignBookingsService{
    constructor(@InjectModel('AssignBooking') private readonly assignBookingModel: Model<AssignBooking>,
    private authService: AuthService, 
    private bookingService: BookingsService){}

    async applyBooking(driverId: string, bookingId: string){
        const user = await this.authService.findUserType(driverId);

        const booking = await this.bookingService.findBooking(bookingId);

        if(user === 'Partner' && booking.id === bookingId){
            const applyBooking = new this.assignBookingModel({
                driverId: driverId,
                bookingId: bookingId
            });
            const updateStatus = await this.bookingService.updateBooking(bookingId, "assigned", null, null, null, null);
            const result = await applyBooking.save();
            return 'Booking applied successfully.'
        }else{
            return 'Cannot apply booking.'
        }
    }

    async getPartner(bookingId: string) : Promise<string>{
        let assignBooking;
        try {
            assignBooking = this.assignBookingModel.findById(bookingId).exec();
        } catch (error) {
            throw new NotFoundException('Could not find booking.');   
        }
        if(!assignBooking){
            throw new NotFoundException('Could not find booking.');

        }
        return assignBooking.driverId;
    }
}