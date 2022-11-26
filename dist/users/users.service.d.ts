import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { FcmService } from 'nestjs-fcm';
import { FcmTokenService } from 'src/fcm-token/fcm-token.service';
export declare class UsersService {
    private usersRepository;
    private readonly fcmService;
    private readonly fcmTokenService;
    private mailService;
    constructor(usersRepository: Repository<User>, fcmService: FcmService, fcmTokenService: FcmTokenService, mailService: MailerService);
    create(createUserDto: CreateUserDto): Promise<{
        createdAt: Date;
        updatedAt: Date;
        userid: string;
        imageName?: string;
        names: string;
        surnames?: string;
        typeId?: string;
        idNumber?: string;
        cell?: string;
        conventional?: string;
        residence?: string;
        email?: string;
        password?: string;
        role: string;
    } & User>;
    findOne(userid: string): Promise<User>;
    findOneById(id: number): Promise<User>;
    findOneByToken(access_token: string): Promise<User>;
    findUsers(): Promise<User[]>;
    addUser(data: any): Promise<any>;
    updateProfile: (id: number, data: any) => Promise<UpdateResult>;
    updateUser(data: any): Promise<UpdateResult>;
    removeUser(id: number): Promise<DeleteResult>;
    updateUserToken(id: any, access_token: any): Promise<UpdateResult>;
    remove(id: number): Promise<void>;
    getUserByRole(role: string): Promise<User[]>;
    disableUserSocket(socketId: string): Promise<User>;
    addToken(data: any): Promise<UpdateResult | import("typeorm").InsertResult>;
    recoverPassword(email: string): Promise<{
        status: boolean;
    }>;
    changePassword(body: any): Promise<{
        status: boolean;
        type?: undefined;
    } | {
        status: boolean;
        type: string;
    }>;
    sendFcm(token: string): Promise<{
        failureCount: number;
        successCount: number;
        failedDeviceIds: any[];
    }>;
}
