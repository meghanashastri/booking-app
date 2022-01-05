import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HubSchema } from "./hub.model";
import { HubsController } from "./hubs.controller";
import { HubsService } from "./hubs.service";

@Module({
    imports: [MongooseModule.forFeature([{name: 'Hub', schema: HubSchema}])],
    controllers : [HubsController],
    providers: [HubsService]
})
export class HubsModule{}