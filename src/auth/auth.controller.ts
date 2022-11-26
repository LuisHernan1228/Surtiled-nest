import { Controller, Request, Post, UseGuards, Get, Put, Param, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log("/login: ", req.body);
    
    return this.authService.login(req.body)
  }

  @Post('loginbytoken')
  async loginByToken(@Request() req) {
    console.log("/loginByToken: ", req.body);
    
    return this.authService.loginByToken(req.body.access_token)
  }

  @Post('register')
  async register(@Request() req) {
    console.log("/register: ", req.body);
    return this.authService.register(req.body)
  }

  @Put('update/:id')
  async update(@Param('id') id: number, @Body() body: any) {
    console.log("auth/update: ", body);
    return this.authService.update(id, body)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }
}
