import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import e from 'express';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateChannelDto } from './dto/create-channel.dto';
import { Channel } from './entity/channels.entity';
import { Messages } from './entity/messages.entity';

@Injectable()
export class ChattingService {
  constructor(
    @InjectRepository(Channel)
    private channelsRepository: Repository<Channel>,
    @InjectRepository(Messages)
    private messagesRepository: Repository<Messages>,
    private usersService: UsersService,
  ){}

  async getUsers (userId: number) {
    const user = await this.usersService.findOneById(userId)
    let created_rooms = []
    let rooms1 = (await this.channelsRepository.find({
      relations: ['user1', 'user2'],
      where: {user1: { id: user.id}},
      select: {
        id: true,
        user2: {
          id: true,
          names: true,
          surnames: true,
          imageName: true,
          role: true,
          socketId: true,
        },
      }
    })).map(item => {
      let member = item.user2
      member['channelId'] = item.id
      member['connected'] = member['socketId'] ? true: false
        
      return member
    })
    let room1_members = rooms1.map(item => item.id)
    
    let rooms2 = (await this.channelsRepository.find({
      relations: ['user1', 'user2'],
      where: {user2: {id: user.id}},
      select: {
        id: true,
        user1: {
          id: true,
          names: true,
          surnames: true,
          imageName: true,
          role: true,
          socketId: true,
        }
      }
    })).map(item => {
      let member = item.user1
      member['channelId'] = item.id
      return member
    })
    let room2_members = rooms2.map(item => item.id)

    let rooms = [...rooms1, ...rooms2]
    let room_member = [...room1_members, ...room2_members]

    let result = {}
    let chatUsers = []
    if (user.role === 'client') {
      result['admins'] = await this.usersService.getUserByRole('admin')
      result['installers'] = await this.usersService.getUserByRole('installer')
      chatUsers = [...result['admins'], ...result['installers']]
    } else if (user.role === 'admin') {
      result['installers'] = await this.usersService.getUserByRole('installer')
      result['clients'] = await this.usersService.getUserByRole('client')
      chatUsers = [...result['clients'], ...result['installers']]
    } else if (user.role === 'installer') {
      result['admins'] = await this.usersService.getUserByRole('admin')
      result['clients'] = await this.usersService.getUserByRole('client')
      chatUsers = [...result['admins'], ...result['clients']]
    }
    const chatUserList = chatUsers.filter(item => {
      return !room_member.includes(item.id)
    }).map(item => {
      item['connected'] = item.socketId ? true : false
      return item
    })


    return [...chatUserList, ...rooms]
  }

  async getMessages (channelId: number) {
    const messages = await this.messagesRepository.find({
      relations: ['channel'],
      where: {channel: {id: channelId}},
    })
    return messages.map(message => {
      let {channel, ...rest} = message
      let item = rest
      item['channelId'] = channel.id
      return item
    })
  }

  async createChannel (channelInfo: CreateChannelDto) {
    let room = (await this.channelsRepository.find({
      where: [
        {user1: { id: channelInfo.user1}, user2: { id: channelInfo.user2}},
        {user1: { id: channelInfo.user2}, user2: { id: channelInfo.user1}},
      ]
    }))

    if (room.length > 0)
      return room[0]

    const data = {}
    data['user1'] = await this.usersService.findOneById(channelInfo.user1)
    data['user2'] = await this.usersService.findOneById(channelInfo.user2)
    data['createdAt'] = new Date()
    return this.channelsRepository.save(data)
  }

  async createMessage (messageInfo: any) {
    const data = messageInfo
    data['createdAt'] = new Date()
    return this.messagesRepository.save(data)
  }

  async getChannel (id: number) {
    return this.channelsRepository.findOne({
      relations: ['user1', 'user2'],
      where: {id},
      select: {
        id: true,
        user1: { id: true, socketId: true},
        user2: { id: true, socketId: true}
      }
    })
  }
}
