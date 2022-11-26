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
exports.FcmTokenService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const fcm_token_entity_1 = require("./entity/fcm_token.entity");
const nestjs_fcm_1 = require("nestjs-fcm");
let FcmTokenService = class FcmTokenService {
    constructor(tokenRepository, fcmService) {
        this.tokenRepository = tokenRepository;
        this.fcmService = fcmService;
    }
    async createToken(data) {
        if (!data.token || !data.role)
            return;
        const token = await this.tokenRepository.find({ where: { user: { id: data.user.id } } });
        if (token.length > 0)
            return this.tokenRepository.update(token[0].id, { token: data.token });
        else
            return this.tokenRepository.insert(data);
    }
    getAllToken() {
        return this.tokenRepository.find();
    }
    async getAllTokenArray() {
        const token_list = await this.tokenRepository.find();
        return token_list.map(item => item.token);
    }
    async getRoleTokenArray(role) {
        const token_list = await this.tokenRepository.find({ where: { role } });
        return token_list.map(item => item.token);
    }
    async getOneToken(userId) {
        const user_token = await this.tokenRepository.findOne({ where: { user: { id: userId } } });
        if (!user_token)
            return false;
        return user_token.token;
    }
    removeToken(userId) {
        return this.tokenRepository.delete({ user: { id: userId } });
    }
    async sendFCM(body, type, id = 0) {
        let token_array = [];
        switch (type) {
            case 'ALL':
                token_array = await this.getAllTokenArray();
                break;
            case 'NEW_CHAT':
                token_array[0] = await this.getOneToken(id);
                break;
            case 'NEW_ORDER': {
                const installer_array = await this.getRoleTokenArray('installer');
                const admin_array = await this.getRoleTokenArray('admin');
                token_array = [...installer_array, ...admin_array];
                break;
            }
            case 'REMOVE_ORDER': {
                const installer_array = await this.getRoleTokenArray('installer');
                const admin_array = await this.getRoleTokenArray('admin');
                const order_owner = await this.getOneToken(id);
                token_array = [...installer_array, ...admin_array, order_owner];
                break;
            }
            case 'NEW_PRODUCT':
                token_array = await this.getRoleTokenArray('vendor');
                break;
            default:
                break;
        }
        const { notifi: { title, content }, data } = body;
        if (token_array && token_array.length > 0)
            return this.fcmService.sendNotification(token_array, {
                notification: {
                    title,
                    body: content
                },
                data
            }, false);
        else
            return false;
    }
    testFCM(body) {
        const { notifi: { title, content }, data, tokenArray } = body;
        return this.fcmService.sendNotification(tokenArray, {
            notification: {
                title,
                body: content
            },
            data
        }, false);
    }
};
FcmTokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(fcm_token_entity_1.FcmToken)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        nestjs_fcm_1.FcmService])
], FcmTokenService);
exports.FcmTokenService = FcmTokenService;
//# sourceMappingURL=fcm-token.service.js.map