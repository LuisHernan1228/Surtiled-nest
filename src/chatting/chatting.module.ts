import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { ChattingController } from './chatting.controller';
import { ChattingService } from './chatting.service';
import { Channel } from './entity/channels.entity';
import { Messages } from './entity/messages.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Channel, Messages]),
    UsersModule
  ],
  controllers: [ChattingController],
  providers: [ChattingService],
  exports: [ChattingService]
})
export class ChattingModule {}
