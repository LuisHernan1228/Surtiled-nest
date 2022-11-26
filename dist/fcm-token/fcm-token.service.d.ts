import { Repository } from 'typeorm';
import { FcmToken } from './entity/fcm_token.entity';
import { FcmService } from 'nestjs-fcm';
export declare class FcmTokenService {
    private tokenRepository;
    private readonly fcmService;
    constructor(tokenRepository: Repository<FcmToken>, fcmService: FcmService);
    createToken(data: any): Promise<import("typeorm").UpdateResult | import("typeorm").InsertResult>;
    getAllToken(): Promise<FcmToken[]>;
    getAllTokenArray(): Promise<string[]>;
    getRoleTokenArray(role: string): Promise<string[]>;
    getOneToken(userId: number): Promise<string | false>;
    removeToken(userId: number): Promise<import("typeorm").DeleteResult>;
    sendFCM(body: any, type: string, id?: number): Promise<false | {
        failureCount: number;
        successCount: number;
        failedDeviceIds: any[];
    }>;
    testFCM(body: any): Promise<{
        failureCount: number;
        successCount: number;
        failedDeviceIds: any[];
    }>;
}
