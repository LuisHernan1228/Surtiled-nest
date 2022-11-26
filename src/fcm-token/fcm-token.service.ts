import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FcmToken } from './entity/fcm_token.entity';
import { FcmService } from 'nestjs-fcm';
import { CreateFcmTokenDto } from './dto/create-fcmtoken.dto';

@Injectable()
export class FcmTokenService {
  constructor(
    @InjectRepository(FcmToken)
    private tokenRepository: Repository<FcmToken>,
    private readonly fcmService: FcmService
  ) {}

  async createToken (data: any) {
    if(!data.token || !data.role)
      return
    // const token = await this.tokenRepository.find({where: {userId: data.userId}})
    const token = await this.tokenRepository.find({where: {user: {id: data.user.id}}})
    if(token.length > 0)
      return this.tokenRepository.update(token[0].id, {token: data.token})
    else
      return this.tokenRepository.insert(data)
  }

  getAllToken () {
    return this.tokenRepository.find()
  }

  async getAllTokenArray () {
    const token_list = await this.tokenRepository.find()
    return token_list.map(item => item.token)
  }

  async getRoleTokenArray (role: string) {
    const token_list = await this.tokenRepository.find({where: {role}})
    return token_list.map(item => item.token)
  }

  async getOneToken (userId: number) {
    const user_token = await this.tokenRepository.findOne({where: {user: {id: userId}}})
    if(!user_token)
      return false
    return user_token.token
  }

  removeToken(userId: number) {
    return this.tokenRepository.delete({user: {id: userId}})
  }

  async sendFCM(body: any, type: string, id: number = 0) {
    let token_array = []
    switch (type) {
      case 'ALL':
        token_array = await this.getAllTokenArray()
        break;
      case 'NEW_CHAT':
        token_array[0] = await this.getOneToken(id)
        break;
      case 'NEW_ORDER': {
        const installer_array = await this.getRoleTokenArray('installer')
        const admin_array = await this.getRoleTokenArray('admin')
        token_array = [...installer_array, ...admin_array]
        break;
      }
      case 'REMOVE_ORDER': {
        const installer_array = await this.getRoleTokenArray('installer')
        const admin_array = await this.getRoleTokenArray('admin')
        const order_owner = await this.getOneToken(id)
        token_array = [...installer_array, ...admin_array, order_owner]
        break;
      }
      case 'NEW_PRODUCT':
        token_array = await this.getRoleTokenArray('vendor')
        break;
      default:
        break;
    }
    const { notifi: {title, content}, data } = body
    if (token_array && token_array.length > 0)
      return this.fcmService.sendNotification(
        token_array,
        {
          notification: {
            title,
            body: content
          },
          data
        },
        false
      )
    else 
      return false
  }

  testFCM (body: any) {
    const {notifi: {title, content}, data, tokenArray} = body
    return this.fcmService.sendNotification(
      tokenArray,
      {
        notification: {
          title,
          body: content
        },
        data
      },
      false
    )
  }
}
