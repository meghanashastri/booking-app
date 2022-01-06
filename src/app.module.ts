import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HubsModule } from './hubs/hubs.module';
import { AuthModule } from './auth/auth.module';
import { BookingsModule } from './bookings/bookings.module';
import { AssignbookingModule } from './assignBooking/assign-booking.module';
import { ScheduleModule } from '@nestjs/schedule';


@Module({
  imports: [AuthModule, HubsModule, BookingsModule, AssignbookingModule, ScheduleModule.forRoot(), MongooseModule.forRoot(
    'mongodb+srv://meghana:sumanuvyshu77@cluster0.6k6ps.mongodb.net/booking-app?retryWrites=true&w=majority'
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
