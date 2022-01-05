import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/auth/auth.module";
import { BookingSchema } from "./booking.model";
import { BookingsController } from "./bookings.controller";
import { BookingsService } from "./bookings.service";

@Module({
    imports:[MongooseModule.forFeature([{name: 'Booking', schema: BookingSchema}]), AuthModule],
    controllers:[BookingsController],
    providers:[BookingsService],
    exports: [BookingsService]
})
export class BookingsModule{}