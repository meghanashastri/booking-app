import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { GetCurrentUserById } from './utils/get-user-by-id-decorator';
import { JwtAuthGuard } from './utils/guards/jwt-guards.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(@GetCurrentUserById() userId: number): string {
    console.log("inside app controller", userId);
    return this.appService.getHello(userId);
  }
}
