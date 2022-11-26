"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FcmTokenModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const fcm_token_entity_1 = require("./entity/fcm_token.entity");
const fcm_token_controller_1 = require("./fcm-token.controller");
const fcm_token_service_1 = require("./fcm-token.service");
let FcmTokenModule = class FcmTokenModule {
};
FcmTokenModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([fcm_token_entity_1.FcmToken]),
        ],
        controllers: [fcm_token_controller_1.FcmTokenController],
        providers: [fcm_token_service_1.FcmTokenService],
        exports: [fcm_token_service_1.FcmTokenService]
    })
], FcmTokenModule);
exports.FcmTokenModule = FcmTokenModule;
//# sourceMappingURL=fcm-token.module.js.map