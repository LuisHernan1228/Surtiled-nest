import { Channel } from "./channels.entity";
export declare class Messages {
    id: number;
    channel: Channel;
    senderId: number;
    message: string;
    createdAt: Date;
}
