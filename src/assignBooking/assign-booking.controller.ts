import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AssignBookingsService } from "./assign-booking.service";

@Controller('applyBooking')
export class AssignBookingController{
    constructor(private readonly assignBookingService: AssignBookingsService){}

    @Post()
    async applyBooking(@Body('driverId') driverId: string, @Body('bookingId') bookingId: string){
        const returnValue = await this.assignBookingService.applyBooking(driverId, bookingId);
        return {message : returnValue};
    }
}