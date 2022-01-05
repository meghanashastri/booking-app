import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";

import { HubsService } from "./hubs.service";

@Controller('hubs')
export class HubsController {
    constructor(private readonly hubsService: HubsService){}

    @Post()
    async postHub(@Body('name') name: string, @Body('location') location:[number]) {
        const returnValue = await this.hubsService.insertHub(name, location);
        return {id: returnValue};
    }

    @Get()
    async getAllHubs(){
        const hubs = await this.hubsService.getAllHubs();
        return hubs.map(hub => ({
            id: hub.id,
            name: hub.name,
            owner: hub.owner
        }));
    }

    @Get(':id')
    async getHub(@Param('id') hubId: string){
        const hub = await this.hubsService.getHub(hubId);
        return hub;
    }

    @Patch(':id')
    async updateHub(@Param('id') hubId: string, @Body('name') name:string){
        await this.hubsService.updateHub(hubId, name);
        return null
    }

    @Delete(':id')
    async deleteHub(@Param('id') hubId: string){
        await this.hubsService.deleteHub(hubId);
        return null;
    }
}