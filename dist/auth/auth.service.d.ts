import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { FcmTokenService } from 'src/fcm-token/fcm-token.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private fcmTokenService;
    constructor(usersService: UsersService, jwtService: JwtService, fcmTokenService: FcmTokenService);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        status: string;
        user?: undefined;
        access_token?: undefined;
        state?: undefined;
    } | {
        user: {
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
        };
        access_token: string;
        status?: undefined;
        state?: undefined;
    } | {
        state: string;
        status?: undefined;
        user?: undefined;
        access_token?: undefined;
    }>;
    loginByToken(token: string): Promise<false | {
        user: {
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
        };
        access_token: string;
    }>;
    register(user: CreateUserDto): Promise<false | {
        createdAt: Date;
        updatedAt: Date;
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
        id: number;
        socketId: string;
        access_token: string;
        order: import("../orders/entity/order.entity").Order[];
        user1: import("../chatting/entity/channels.entity").Channel[];
        user2: import("../chatting/entity/channels.entity").Channel[];
        token: import("../fcm-token/entity/fcm_token.entity").FcmToken;
    }>;
    update(id: number, user: CreateUserDto): Promise<CreateUserDto | {
        status: boolean;
        err?: undefined;
    } | {
        status: boolean;
        err: any;
    }>;
    decodeToken(token: string): any;
}
