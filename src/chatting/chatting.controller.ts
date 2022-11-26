import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChattingService } from './chatting.service';

@Controller('chatting')
export class ChattingController {
  constructor(private chattingService: ChattingService) {}

  @Get('users/:userId')
  getChatUsers(@Param('userId') userId: number) {
    console.log("getChatUsers: ", userId);
    const users = this.chattingService.getUsers(userId)
    return users
  }

  @Get('messages/:channelId')
  getChatMessages(@Param('channelId') channelId: number) {
    console.log("getChatMessages: ", channelId);
    const messages = this.chattingService.getMessages(channelId)
    return messages
  }
}
