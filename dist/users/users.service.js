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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const mailer_1 = require("@nestjs-modules/mailer");
const user_entity_1 = require("./entity/user.entity");
const nestjs_fcm_1 = require("nestjs-fcm");
const fcm_token_service_1 = require("../fcm-token/fcm-token.service");
let UsersService = class UsersService {
    constructor(usersRepository, fcmService, fcmTokenService, mailService) {
        this.usersRepository = usersRepository;
        this.fcmService = fcmService;
        this.fcmTokenService = fcmTokenService;
        this.mailService = mailService;
        this.updateProfile = (id, data) => {
            return this.usersRepository.update(id, data);
        };
    }
    async create(createUserDto) {
        const data = Object.assign(Object.assign({}, createUserDto), { createdAt: new Date(), updatedAt: new Date() });
        return await this.usersRepository.save(data);
    }
    async findOne(userid) {
        const result = await this.usersRepository.findOne({ where: { userid } });
        return result;
    }
    async findOneById(id) {
        const result = await this.usersRepository.findOne({ where: { id } });
        return result;
    }
    async findOneByToken(access_token) {
        const result = await this.usersRepository.findOne({ where: { access_token } });
        return result;
    }
    findUsers() {
        return this.usersRepository.find();
    }
    async addUser(data) {
        data['password'] = await bcrypt.hash(data['password'], 10);
        data['createdAt'] = new Date();
        return this.usersRepository.save(data);
    }
    async updateUser(data) {
        if (data['password'])
            data['password'] = await bcrypt.hash(data['password'], 10);
        data['updatedAt'] = new Date();
        return await this.usersRepository.update(data.id, data);
    }
    async removeUser(id) {
        return this.usersRepository.delete(id);
    }
    async updateUserToken(id, access_token) {
        return await this.usersRepository.update(id, { access_token });
    }
    async remove(id) {
        await this.usersRepository.delete(id);
    }
    async getUserByRole(role) {
        const result = await this.usersRepository.find({
            where: { role },
            select: {
                id: true,
                names: true,
                surnames: true,
                imageName: true,
                role: true,
                socketId: true,
            }
        });
        return result;
    }
    async disableUserSocket(socketId) {
        const user = await this.usersRepository.findOne({ where: { socketId } });
        let result;
        if (user)
            result = await this.usersRepository.update(user.id, { socketId: '' });
        return user;
    }
    async addToken(data) {
        return this.fcmTokenService.createToken(data);
    }
    async recoverPassword(email) {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (user) {
            const generator = require('generate-password');
            const pwd = generator.generate({ length: 8, numbers: true, uppercase: false, lowercase: false });
            const password = await bcrypt.hash(pwd, 10);
            await this.usersRepository.update(user.id, { password });
            const response = await this.mailService.sendMail({
                to: email,
                from: "noreply@nousproyect.com",
                subject: 'Recovery Password',
                text: 'new password: ' + pwd,
            });
            return { status: true };
        }
        else {
            return { status: false };
        }
    }
    async changePassword(body) {
        const { id, oldPassword, newPassword } = body;
        const user = await this.usersRepository.findOne({ where: { id } });
        const comp = await bcrypt.compare(oldPassword, user.password);
        if (comp) {
            const new_password = await bcrypt.hash(newPassword, 10);
            await this.usersRepository.update(id, { password: new_password });
            return { status: true };
        }
        else {
            return { status: false, type: 'wrong pwd' };
        }
    }
    async sendFcm(token) {
        return this.fcmService.sendNotification([
            'd5hq5kBrQUSXtZXmQzTddl:APA91bGgiBgYH8S_qLSsBJXJvXhc42p1ohPhu6oszFApm2J3rBs-xin9kr8z_-OmveEd3rSk-SeoHmY5zSjcYgH-moy_kNcJXyKTCjjKUQL5yULP80NYoNO-XjmJ0eDvHfq3LYKY9aLe'
        ], {
            notification: {
                title: 'Test Notifi',
                body: 'Test Notifi Body'
            },
            data: {
                name: 'Test',
                value: 'Test Value'
            }
        }, true);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        nestjs_fcm_1.FcmService,
        fcm_token_service_1.FcmTokenService,
        mailer_1.MailerService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map