import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Get('/')
  getHello() {
    return "Hello World"
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('auth/login')
  // async login(@Request() req) {
  //   console.log("user login: ", req.user);
  //   // return this.authService.login(req.user)

  //   const response = this.authService.login(req.user)
  //   console.log("last response: ", response);
    
  //   return response;
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   console.log("profile: ");
    
  //   return req.user;
  // }
}
