import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthSchema } from './auth.model';
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy/jwt.strategy";


@Module({
    imports: [JwtModule.register({
        secret: 'super-secret',
    }),
        MongooseModule.forFeature([{
            name: 'Auth', 
            schema: AuthSchema
        }])],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports:[AuthService]
})
export class AuthModule{}