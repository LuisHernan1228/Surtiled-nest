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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChattingController = void 0;
const common_1 = require("@nestjs/common");
const chatting_service_1 = require("./chatting.service");
let ChattingController = class ChattingController {
    constructor(chattingService) {
        this.chattingService = chattingService;
    }
    getChatUsers(userId) {
        console.log("getChatUsers: ", userId);
        const users = this.chattingService.getUsers(userId);
        return users;
    }
    getChatMessages(channelId) {
        console.log("getChatMessages: ", channelId);
        const messages = this.chattingService.getMessages(channelId);
        return messages;
    }
};
__decorate([
    (0, common_1.Get)('users/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ChattingController.prototype, "getChatUsers", null);
__decorate([
    (0, common_1.Get)('messages/:channelId'),
    __param(0, (0, common_1.Param)('channelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ChattingController.prototype, "getChatMessages", null);
ChattingController = __decorate([
    (0, common_1.Controller)('chatting'),
    __metadata("design:paramtypes", [chatting_service_1.ChattingService])
], ChattingController);
exports.ChattingController = ChattingController;
//# sourceMappingURL=chatting.controller.js.map