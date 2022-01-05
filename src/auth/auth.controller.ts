import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService) {}

    @Post('login')
    async signInLocal(@Body() dto: AuthDto){
        const user = await this.authService.signInLocal(dto);
        return user;
    }

}