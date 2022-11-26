import { CreateFcmTokenDto } from 'src/fcm-token/dto/create-fcmtoken.dto';
import { UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
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
    getUser(data: any): Promise<{
        id: number;
        userid: string;
        imageName: string;
        names: string;
        surnames: string;
        typeId: string;
        idNumber?: string;
        cell: string;
        conventional: string;
        residence: string;
        email: string;
        role: string;
        socketId: string;
        createdAt?: Date;
        updatedAt?: Date;
        access_token: string;
        order: import("../orders/entity/order.entity").Order[];
        user1: import("../chatting/entity/channels.entity").Channel[];
        user2: import("../chatting/entity/channels.entity").Channel[];
        token: import("../fcm-token/entity/fcm_token.entity").FcmToken;
    }>;
    findAll(): Promise<User[]>;
    addUser(data: any): Promise<any>;
    updateUser(updateData: any): Promise<UpdateResult>;
    recoverPassword(body: any): Promise<{
        status: boolean;
    }>;
    changePassword(body: any): Promise<{
        status: boolean;
        type?: undefined;
    } | {
        status: boolean;
        type: string;
    }>;
    removeUser(id: number): Promise<import("typeorm").DeleteResult>;
    createFcmToken(body: CreateFcmTokenDto): Promise<UpdateResult | import("typeorm").InsertResult>;
}
