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
exports.FcmTokenController = void 0;
const common_1 = require("@nestjs/common");
const fcm_token_service_1 = require("./fcm-token.service");
let FcmTokenController = class FcmTokenController {
    constructor(tokenService) {
        this.tokenService = tokenService;
    }
    addToken(body) {
        return this.tokenService.createToken(body);
    }
    getAllToken() {
        return this.tokenService.getAllToken();
    }
    getAllTokenArray() {
        return this.tokenService.getAllTokenArray();
    }
    removeToken(userId) {
        return this.tokenService.removeToken(userId);
    }
    testFCM(body) {
        return this.tokenService.testFCM(body);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FcmTokenController.prototype, "addToken", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FcmTokenController.prototype, "getAllToken", null);
__decorate([
    (0, common_1.Get)('tokenArray'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FcmTokenController.prototype, "getAllTokenArray", null);
__decorate([
    (0, common_1.Delete)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FcmTokenController.prototype, "removeToken", null);
__decorate([
    (0, common_1.Post)('test'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FcmTokenController.prototype, "testFCM", null);
FcmTokenController = __decorate([
    (0, common_1.Controller)('fcm-token'),
    __metadata("design:paramtypes", [fcm_token_service_1.FcmTokenService])
], FcmTokenController);
exports.FcmTokenController = FcmTokenController;
//# sourceMappingURL=fcm-token.controller.js.map