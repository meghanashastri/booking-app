import { Body, Controller, Post, Get, Param, Patch, Delete, Req} from "@nestjs/common";

import {Request} from "express";

import { BookingsService } from "./bookings.service";

@Controller('bookings')
export class BookingsController{
    constructor(private readonly bookingsService: BookingsService){}

    @Post()
    async postBooking(@Body('status') status: string, @Body('client') client:string, @Body('created_by') created_by: string,
    @Body('from_hub') from_hub: string, @Body('to_hub') to_hub: string) {
        console.log(status);
        const returnValue = await this.bookingsService.insertBooking(status, client, created_by, from_hub, to_hub);
        return {id: returnValue};
    }

   /* @Get()
    async getAllBookings(){
        const bookings = await this.bookingsService.getAllBookings();
        return bookings.map(booking => ({
            id: booking.id,
            status: booking.status,
            client: booking.client,
            from_hub: booking.from_hub,
            to_hub: booking.to_hub
        }));
    }*/

    @Get()
    async getBookings(@Req() req: Request){
        let options = {};

        if (req.query.hubId) {
            options = {
                from_hub: req.query.hubId.toString()
            }
        }

        const query = this.bookingsService.find(options);


        const page: number = parseInt(req.query.page as any) || 1;
        const limit = 9;
        const total = await this.bookingsService.count(options);

        const bookings = await query.skip((page - 1) * limit).limit(limit).exec();

        return {
            bookings,
            total,
            page,
            last_page: Math.ceil(total / limit)
        };
    }

    @Get(':id')
    async getBooking(@Param('id') bookingId: string){
        const booking = await this.bookingsService.getBooking(bookingId);
        return booking;
    }

    @Patch(':id')
    async updateBooking(@Param('id') bookingId: string, @Body('status') status:string, @Body('client') client:string,
    @Body('created_by') created_by:string, @Body('from_hub') from_hub:string, @Body('to_hub') to_hub:string){
        const returnValue = await this.bookingsService.updateBooking(bookingId, status, client, created_by, from_hub, to_hub);
        return {message : returnValue};
    }

    @Patch('startEndTrip/:id')
    async startEndTrip(@Param('id') bookingId: string, @Body('status') status:string, @Body('userId') userId:string){
        console.log(bookingId);
        const returnValue = await this.bookingsService.startEndTrip(bookingId, status, userId);
        return {message: returnValue};

    }

    @Delete(':id')
    async deleteBooking(@Param('id') bookingId: string){
        await this.bookingsService.deleteBooking(bookingId);
        return null;
    }
}