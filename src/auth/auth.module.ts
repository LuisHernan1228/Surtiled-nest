import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStretegy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { FcmTokenModule } from 'src/fcm-token/fcm-token.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    FcmTokenModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h'},
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStretegy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
