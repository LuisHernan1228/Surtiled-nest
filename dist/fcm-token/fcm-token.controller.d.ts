import { FcmTokenService } from './fcm-token.service';
export declare class FcmTokenController {
    private tokenService;
    constructor(tokenService: FcmTokenService);
    addToken(body: any): Promise<import("typeorm").UpdateResult | import("typeorm").InsertResult>;
    getAllToken(): Promise<import("./entity/fcm_token.entity").FcmToken[]>;
    getAllTokenArray(): Promise<string[]>;
    removeToken(userId: number): Promise<import("typeorm").DeleteResult>;
    testFCM(body: any): Promise<{
        failureCount: number;
        successCount: number;
        failedDeviceIds: any[];
    }>;
}
