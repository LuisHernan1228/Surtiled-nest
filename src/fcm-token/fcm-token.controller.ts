import { Body, Controller, Delete, Get, Header, Param, Post } from '@nestjs/common';
import { FcmTokenService } from './fcm-token.service';

@Controller('fcm-token')
export class FcmTokenController {
  constructor(
    private tokenService: FcmTokenService
  ) {}

  @Post()
  addToken (@Body() body: any) {
    return this.tokenService.createToken(body)
  }

  @Get('all')
  getAllToken() {
    return this.tokenService.getAllToken()
  }

  @Get('tokenArray')
  getAllTokenArray() {
    return this.tokenService.getAllTokenArray()
  }

  @Delete(':userId')
  removeToken(@Param('userId') userId: number) {
    return this.tokenService.removeToken(userId)
  }

  @Post('test')
  testFCM(@Body() body: any) {
    return this.tokenService.testFCM(body)
  }
}
