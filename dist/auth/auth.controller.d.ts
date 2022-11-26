import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
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
    loginByToken(req: any): Promise<false | {
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
    register(req: any): Promise<false | {
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
    update(id: number, body: any): Promise<import("../users/dto/create-user.dto").CreateUserDto | {
        status: boolean;
        err?: undefined;
    } | {
        status: boolean;
        err: any;
    }>;
    getProfile(req: any): any;
}
