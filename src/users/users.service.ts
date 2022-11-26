import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { MailerService } from '@nestjs-modules/mailer';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { FcmService } from 'nestjs-fcm';
import { FcmTokenService } from 'src/fcm-token/fcm-token.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly fcmService: FcmService,
    private readonly fcmTokenService: FcmTokenService,
    private mailService: MailerService
  ) {}

  async create (createUserDto: CreateUserDto) {
    const data = {
      ...createUserDto,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    return await this.usersRepository.save(data)
      // .then(res => res).catch(e => console.log(e));
  }

  async findOne(userid: string): Promise<User> {
    const result = await this.usersRepository.findOne({where: {userid}});
    return result
  }

  async findOneById(id: number): Promise<User> {
    const result = await this.usersRepository.findOne({where: {id}});
    return result
  }

  async findOneByToken(access_token: string): Promise<User> {
    const result = await this.usersRepository.findOne({where: {access_token}});
    return result
  }

  findUsers(): Promise<User[]>{
    return this.usersRepository.find();
  }

  async addUser(data: any) {
    data['password'] = await bcrypt.hash(data['password'], 10)
    data['createdAt'] = new Date()
    return this.usersRepository.save(data)
  }

  updateProfile = (id: number, data: any) => {
    return this.usersRepository.update(id, data)
  }

  async updateUser(data: any): Promise<UpdateResult> {
    if (data['password'])
      data['password'] = await bcrypt.hash(data['password'], 10)
    data['updatedAt'] = new Date()
    return await this.usersRepository.update(data.id, data)
  }

  async removeUser(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id)
  }

  async updateUserToken(id, access_token): Promise<UpdateResult> {
    return await this.usersRepository.update(id, {access_token})
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id)
  }

  async getUserByRole(role: string): Promise<User[]> {
    const result = await this.usersRepository.find({
      where: {role},
      select: {
        id: true,
        names: true,
        surnames: true,
        imageName: true,
        role: true,
        socketId: true,
      }
    });
    return result
  }

  async disableUserSocket(socketId: string) {
    const user = await this.usersRepository.findOne({where: {socketId}})

    let result: any;
    if(user)
      result = await this.usersRepository.update(user.id, { socketId: ''})
    return user
  }

  async addToken (data: any) {
    // const { userId, role, token } = data
    
    return this.fcmTokenService.createToken(data)
  }

  async recoverPassword (email: string ){
    const user = await this.usersRepository.findOne({where: {email}})
    if(user) {
      // const password = await bcrypt.hash(process.env.RECOVERY_PASSWORD, 10)
      const generator = require('generate-password');
      const pwd = generator.generate({ length: 8, numbers: true, uppercase: false, lowercase: false })
      const password = await bcrypt.hash(pwd, 10)
      await this.usersRepository.update(user.id, {password})
      const response = await this.mailService.sendMail({
        to: email,
        from: "noreply@nousproyect.com",
        subject: 'Recovery Password',
        text: 'new password: ' + pwd, 
       });
      return { status: true }
      // return true
    } else {
      return { status: false }
    }
  }

  async changePassword (body: any) {
    const { id, oldPassword, newPassword} = body
    const user = await this.usersRepository.findOne({where: {id}})
    const comp = await bcrypt.compare(oldPassword, user.password)
    if (comp) {
      const new_password = await bcrypt.hash(newPassword, 10)
      await this.usersRepository.update(id, {password: new_password})
      return { status: true }
    } else {
      return { status: false, type: 'wrong pwd'}
    }
  }

  async sendFcm (token: string) {
    return this.fcmService.sendNotification([
        // 'c2TZWGFJQZShsQVcX7uD32:APA91bHEpw9gPlUgsv8QJj1TPHBZZf7cHSXeKgR3XmO-XQPtoJ30RZ5ZpQ_l1BKK1SgNU0DsEnhFrsz1BOtz3qToil_goCB29H4r_5cxkVMBkYY11hxt1ZTlVHjJKVfCIGLGf2_u9pL4'
        // token,
        'd5hq5kBrQUSXtZXmQzTddl:APA91bGgiBgYH8S_qLSsBJXJvXhc42p1ohPhu6oszFApm2J3rBs-xin9kr8z_-OmveEd3rSk-SeoHmY5zSjcYgH-moy_kNcJXyKTCjjKUQL5yULP80NYoNO-XjmJ0eDvHfq3LYKY9aLe'
      ],
      {
        notification: {
          title: 'Test Notifi',
          body: 'Test Notifi Body'
        },
        data: {
          name: 'Test',
          value: 'Test Value'
        }
      },
      true
    )
  }
}
