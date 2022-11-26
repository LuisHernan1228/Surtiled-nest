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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const fcm_token_service_1 = require("../fcm-token/fcm-token.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, fcmTokenService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.fcmTokenService = fcmTokenService;
    }
    async validateUser(username, pass) {
        const user = await this.usersService.findOne(username);
        if (user && bcrypt.compare(user.password, await bcrypt.hash(pass, 10))) {
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        return null;
    }
    async login(user) {
        console.log("login info: ", user);
        const userInfo = await this.usersService.findOne(user.userid);
        const exist_token = await this.fcmTokenService.getOneToken(userInfo.id);
        if (exist_token && exist_token !== user.token)
            return { status: 'exist' };
        if (userInfo) {
            const comp = await bcrypt.compare(user.password, userInfo.password);
            if (comp) {
                const payload = { username: user.names, sub: user.userId };
                const access_token = this.jwtService.sign(payload);
                await this.usersService.updateUserToken(userInfo.id, access_token);
                if (!exist_token)
                    await this.fcmTokenService.createToken({ user: userInfo, token: user.token, role: userInfo.role });
                const { password } = userInfo, result = __rest(userInfo, ["password"]);
                return {
                    user: result,
                    access_token
                };
            }
            else
                return {
                    state: "Contraseña incorrecta"
                };
        }
        else
            return {
                state: "No existe ningún usuario"
            };
    }
    async loginByToken(token) {
        const userInfo = await this.usersService.findOneByToken(token);
        if (userInfo) {
            const payload = { username: userInfo.names, sub: userInfo.userid };
            const access_token = this.jwtService.sign(payload);
            await this.usersService.updateUserToken(userInfo.id, access_token);
            const { password } = userInfo, result = __rest(userInfo, ["password"]);
            return {
                user: result,
                access_token
            };
        }
        else
            return false;
    }
    async register(user) {
        const exist = await this.usersService.findOne(user.userid);
        if (exist)
            return false;
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
        user['createdAt'] = new Date();
        user['updatedAt'] = new Date();
        let response = await this.usersService.create(user);
        console.log("/register-result: ", response);
        if (response) {
            const { password } = response, result = __rest(response, ["password"]);
            return result;
        }
    }
    async update(id, user) {
        try {
            user['updatedAt'] = new Date();
            let response = await this.usersService.updateProfile(id, user);
            console.log("auth/update-result: ", response);
            if (response.affected === 1)
                return user;
            else
                return { status: false };
        }
        catch (err) {
            return { status: false, err };
        }
    }
    decodeToken(token) {
        return this.jwtService.decode(token);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        fcm_token_service_1.FcmTokenService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map