import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Hub } from './hub.model';

@Injectable()
export class HubsService{

    constructor(@InjectModel('Hub') private readonly hubModel: Model<Hub>) {}

    async insertHub(name: string, location: [number]){
        const newHub = new this.hubModel({name: name, location: location});
        const result = await newHub.save();
        return result.id as string;
    }

    async getAllHubs(){
        const hubs = await this.hubModel.find().exec();
        return hubs as Hub[];
    }

    async getHub(hubId: string){
        const hub = await this.findHub(hubId);
        return {id: hub.id, name: hub.name};
    }

    async updateHub(hubId: string, name:string){
        const hub = await this.findHub(hubId);

        if(name){
            hub.name = name;
        }

        hub.save();
        
    }

    async deleteHub(hubId: string){
       const result = await this.hubModel.deleteOne({_id: hubId}).exec();
       if(!result.acknowledged){
           throw new NotFoundException('Could not find hub.');  
       }
    }

    private async findHub(hubId: string): Promise<Hub>{
        let hub;
        try {
        hub = await this.hubModel.findById(hubId).exec();
        } catch (error) {
            throw new NotFoundException('Could not find hub.');   
        }

        if(!hub){
            throw new NotFoundException('Could not find hub.');

        }
        return hub;
    }

}