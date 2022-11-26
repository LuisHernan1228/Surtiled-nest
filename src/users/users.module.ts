import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entity/user.entity';
import { FcmTokenModule } from 'src/fcm-token/fcm-token.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    FcmTokenModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule, UsersService],
})

export class UsersModule {}
