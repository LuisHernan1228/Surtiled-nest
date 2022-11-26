import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateChannelDto } from './dto/create-channel.dto';
import { Channel } from './entity/channels.entity';
import { Messages } from './entity/messages.entity';
export declare class ChattingService {
    private channelsRepository;
    private messagesRepository;
    private usersService;
    constructor(channelsRepository: Repository<Channel>, messagesRepository: Repository<Messages>, usersService: UsersService);
    getUsers(userId: number): Promise<any[]>;
    getMessages(channelId: number): Promise<{
        id: number;
        senderId: number;
        message: string;
        createdAt: Date;
    }[]>;
    createChannel(channelInfo: CreateChannelDto): Promise<Channel>;
    createMessage(messageInfo: any): Promise<any>;
    getChannel(id: number): Promise<Channel>;
}
