import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FcmToken } from './entity/fcm_token.entity';
import { FcmTokenController } from './fcm-token.controller';
import { FcmTokenService } from './fcm-token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FcmToken]),
  ],
  controllers: [FcmTokenController],
  providers: [FcmTokenService],
  exports: [FcmTokenService]
})
export class FcmTokenModule {}
