import { ChattingService } from './chatting.service';
export declare class ChattingController {
    private chattingService;
    constructor(chattingService: ChattingService);
    getChatUsers(userId: number): Promise<any[]>;
    getChatMessages(channelId: number): Promise<{
        id: number;
        senderId: number;
        message: string;
        createdAt: Date;
    }[]>;
}
