import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Auth } from "./auth.model";
import { AuthDto } from "./dto";

@Injectable()
export class AuthService{

    constructor(@InjectModel('Auth') private readonly authModel: Model<Auth>,
    private jwtService: JwtService){}

    async signInLocal(dto: AuthDto){
        const user = await this.findUser(dto);
       
        if(user.password !== dto.password) throw new UnauthorizedException('Credentials incorrect');
        return this.signUser(user.id, user.phone, user.type);
    }

    async findUserType(userId: string): Promise<string>{
        let userType;
        try {
            userType = await this.authModel.findById(userId).exec();
        } catch (error) {
            throw new NotFoundException('Could not find user.');   
        }

        if(!userType){
            throw new NotFoundException('Could not find user.');

        }
        return userType.type;
    }

    private async findUser(dto: AuthDto) : Promise<Auth>{
        let user;
        try {
            user = await this.authModel.find({"phone":dto.phone}).exec();          
        } catch (error) {
            throw new NotFoundException('Could not find user.');   
        }
        if(!user){
            throw new NotFoundException('Could not find user.'); 
        }
        console.log(user);
        return user[0];
    }

    signUser(userId: string, phone: number, type: string){
        return this.jwtService.sign({
            sub: userId,
            phone,
            type: type,
        });

    }
}