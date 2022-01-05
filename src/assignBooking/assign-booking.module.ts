import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/auth/auth.module";
import { BookingsModule } from "src/bookings/bookings.module";
import { AssignBookingController } from "./assign-booking.controller";
import { AssignBookingSchema } from "./assign-booking.model";
import { AssignBookingsService } from "./assign-booking.service";

@Module({
    imports:[MongooseModule.forFeature([{name:'AssignBooking', schema: AssignBookingSchema}]), 
    AuthModule, BookingsModule],
    controllers: [AssignBookingController],
    providers: [AssignBookingsService],
    exports: [AssignBookingsService]
})
export class AssignbookingModule{}