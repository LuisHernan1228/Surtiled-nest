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
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const create_bankaccount_dto_1 = require("./dto/create-bankaccount.dto");
const create_order_dto_1 = require("./dto/create-order.dto");
const orders_service_1 = require("./orders.service");
let OrdersController = class OrdersController {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    findOrderProducts() {
        const orders = this.ordersService.findOrderProducts();
        return orders;
    }
    findOrderServices() {
        const orders = this.ordersService.findOrderServices();
        return orders;
    }
    findOrderAll() {
        const orders = this.ordersService.findOrderAll();
        return orders;
    }
    async getOrderedNumber() {
        const products = await (await this.ordersService.findOrderProducts()).length;
        const services = await (await this.ordersService.findOrderServices()).length;
        return { products, services };
    }
    getOrder(id) {
        const orders = this.ordersService.findOne(id);
        return orders;
    }
    getOrderNumber(id) {
        return this.ordersService.generateOrderNumber(id);
    }
    create(createOrderDto) {
        console.log("order add request: ", createOrderDto);
        this.ordersService.create(createOrderDto);
        return true;
    }
    deliveryAction(id) {
        return this.ordersService.deliveryAction(id);
    }
    acceptAction(id) {
        return this.ordersService.acceptAction(id);
    }
    removeAction(id) {
        return this.ordersService.removeAction(id);
    }
    completeAction(id) {
        return this.ordersService.receivedAction(id);
    }
    getCompletedOrder(id) {
        return this.ordersService.getCompletedOrders(id);
    }
    registerBankAccount(data) {
        return this.ordersService.registerBankAccount(data);
    }
    getBankAccount() {
        return this.ordersService.getBankAccount()
            .then(result => result[0])
            .catch(err => err);
    }
};
__decorate([
    (0, common_1.Get)('/product'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findOrderProducts", null);
__decorate([
    (0, common_1.Get)('/service'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findOrderServices", null);
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findOrderAll", null);
__decorate([
    (0, common_1.Get)('ordered-number'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getOrderedNumber", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getOrder", null);
__decorate([
    (0, common_1.Get)('orderNumber/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getOrderNumber", null);
__decorate([
    (0, common_1.Post)('add'),
    (0, common_1.Header)('content-type', 'application/x-www-form-urlencoded'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('delivery/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "deliveryAction", null);
__decorate([
    (0, common_1.Post)('accept/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "acceptAction", null);
__decorate([
    (0, common_1.Post)('remove/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "removeAction", null);
__decorate([
    (0, common_1.Post)('received/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "completeAction", null);
__decorate([
    (0, common_1.Get)('completed/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "getCompletedOrder", null);
__decorate([
    (0, common_1.Post)('bank/add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bankaccount_dto_1.CreateBankAccountDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "registerBankAccount", null);
__decorate([
    (0, common_1.Get)('bank/get'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "getBankAccount", null);
OrdersController = __decorate([
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
exports.OrdersController = OrdersController;
//# sourceMappingURL=orders.controller.js.map