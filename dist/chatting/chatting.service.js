"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChattingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_service_1 = require("../users/users.service");
const typeorm_2 = require("typeorm");
const channels_entity_1 = require("./entity/channels.entity");
const messages_entity_1 = require("./entity/messages.entity");
let ChattingService = class ChattingService {
    constructor(channelsRepository, messagesRepository, usersService) {
        this.channelsRepository = channelsRepository;
        this.messagesRepository = messagesRepository;
        this.usersService = usersService;
    }
    async getUsers(userId) {
        const user = await this.usersService.findOneById(userId);
        let created_rooms = [];
        let rooms1 = (await this.channelsRepository.find({
            relations: ['user1', 'user2'],
            where: { user1: { id: user.id } },
            select: {
                id: true,
                user2: {
                    id: true,
                    names: true,
                    surnames: true,
                    imageName: true,
                    role: true,
                    socketId: true,
                },
            }
        })).map(item => {
            let member = item.user2;
            member['channelId'] = item.id;
            member['connected'] = member['socketId'] ? true : false;
            return member;
        });
        let room1_members = rooms1.map(item => item.id);
        let rooms2 = (await this.channelsRepository.find({
            relations: ['user1', 'user2'],
            where: { user2: { id: user.id } },
            select: {
                id: true,
                user1: {
                    id: true,
                    names: true,
                    surnames: true,
                    imageName: true,
                    role: true,
                    socketId: true,
                }
            }
        })).map(item => {
            let member = item.user1;
            member['channelId'] = item.id;
            return member;
        });
        let room2_members = rooms2.map(item => item.id);
        let rooms = [...rooms1, ...rooms2];
        let room_member = [...room1_members, ...room2_members];
        let result = {};
        let chatUsers = [];
        if (user.role === 'client') {
            result['admins'] = await this.usersService.getUserByRole('admin');
            result['installers'] = await this.usersService.getUserByRole('installer');
            chatUsers = [...result['admins'], ...result['installers']];
        }
        else if (user.role === 'admin') {
            result['installers'] = await this.usersService.getUserByRole('installer');
            result['clients'] = await this.usersService.getUserByRole('client');
            chatUsers = [...result['clients'], ...result['installers']];
        }
        else if (user.role === 'installer') {
            result['admins'] = await this.usersService.getUserByRole('admin');
            result['clients'] = await this.usersService.getUserByRole('client');
            chatUsers = [...result['admins'], ...result['clients']];
        }
        const chatUserList = chatUsers.filter(item => {
            return !room_member.includes(item.id);
        }).map(item => {
            item['connected'] = item.socketId ? true : false;
            return item;
        });
        return [...chatUserList, ...rooms];
    }
    async getMessages(channelId) {
        const messages = await this.messagesRepository.find({
            relations: ['channel'],
            where: { channel: { id: channelId } },
        });
        return messages.map(message => {
            let { channel } = message, rest = __rest(message, ["channel"]);
            let item = rest;
            item['channelId'] = channel.id;
            return item;
        });
    }
    async createChannel(channelInfo) {
        let room = (await this.channelsRepository.find({
            where: [
                { user1: { id: channelInfo.user1 }, user2: { id: channelInfo.user2 } },
                { user1: { id: channelInfo.user2 }, user2: { id: channelInfo.user1 } },
            ]
        }));
        if (room.length > 0)
            return room[0];
        const data = {};
        data['user1'] = await this.usersService.findOneById(channelInfo.user1);
        data['user2'] = await this.usersService.findOneById(channelInfo.user2);
        data['createdAt'] = new Date();
        return this.channelsRepository.save(data);
    }
    async createMessage(messageInfo) {
        const data = messageInfo;
        data['createdAt'] = new Date();
        return this.messagesRepository.save(data);
    }
    async getChannel(id) {
        return this.channelsRepository.findOne({
            relations: ['user1', 'user2'],
            where: { id },
            select: {
                id: true,
                user1: { id: true, socketId: true },
                user2: { id: true, socketId: true }
            }
        });
    }
};
ChattingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(channels_entity_1.Channel)),
    __param(1, (0, typeorm_1.InjectRepository)(messages_entity_1.Messages)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        users_service_1.UsersService])
], ChattingService);
exports.ChattingService = ChattingService;
//# sourceMappingURL=chatting.service.js.map