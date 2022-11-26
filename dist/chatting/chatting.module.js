"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChattingModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("../users/users.module");
const chatting_controller_1 = require("./chatting.controller");
const chatting_service_1 = require("./chatting.service");
const channels_entity_1 = require("./entity/channels.entity");
const messages_entity_1 = require("./entity/messages.entity");
let ChattingModule = class ChattingModule {
};
ChattingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([channels_entity_1.Channel, messages_entity_1.Messages]),
            users_module_1.UsersModule
        ],
        controllers: [chatting_controller_1.ChattingController],
        providers: [chatting_service_1.ChattingService],
        exports: [chatting_service_1.ChattingService]
    })
], ChattingModule);
exports.ChattingModule = ChattingModule;
//# sourceMappingURL=chatting.module.js.map