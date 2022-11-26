"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const products_module_1 = require("./products/products.module");
const categoies_module_1 = require("./categories/categoies.module");
const typeorm_1 = require("@nestjs/typeorm");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const orders_module_1 = require("./orders/orders.module");
const app_gateway_1 = require("./app.gateway");
const chatting_module_1 = require("./chatting/chatting.module");
const favorites_module_1 = require("./favorites/favorites.module");
const path = require("path");
const nestjs_fcm_1 = require("nestjs-fcm");
const fcm_token_module_1 = require("./fcm-token/fcm-token.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                port: 3306,
                host: 'priva230.spindns.com',
                username: 'nousproyec1_surtiled',
                password: '$!69QL}q?3[;',
                database: 'nousproyec1_surtiled',
                autoLoadEntities: true,
                synchronize: false,
            }),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: 'priva230.spindns.com',
                    auth: {
                        user: 'noreply@nousproyect.com',
                        pass: '!DzSS%XhxvO4',
                    },
                }
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                serveRoot: '/uploads/'
            }),
            nestjs_fcm_1.FcmModule.forRoot({
                firebaseSpecsPath: path.join(__dirname, '../surtiled-rnn-firebase-adminsdk-pc9vs-df158dae77.json'),
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            categoies_module_1.CategoriesModule,
            products_module_1.ProductsModule,
            orders_module_1.OrdersModule,
            chatting_module_1.ChattingModule,
            favorites_module_1.FavoritesModule,
            fcm_token_module_1.FcmTokenModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, app_gateway_1.AppGateway],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map