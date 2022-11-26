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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entity/order.entity");
const orderlist_entity_1 = require("./entity/orderlist.entity");
const bankaccount_entity_1 = require("./entity/bankaccount.entity");
const users_service_1 = require("../users/users.service");
const products_service_1 = require("../products/products.service");
const fcm_token_service_1 = require("../fcm-token/fcm-token.service");
let OrdersService = class OrdersService {
    constructor(orderRepository, orderListRepository, bankAccountRepository, usersService, productsService, fcmTokenService) {
        this.orderRepository = orderRepository;
        this.orderListRepository = orderListRepository;
        this.bankAccountRepository = bankAccountRepository;
        this.usersService = usersService;
        this.productsService = productsService;
        this.fcmTokenService = fcmTokenService;
    }
    async create(createOrderDto) {
        const { products } = createOrderDto, order = __rest(createOrderDto, ["products"]);
        const user = await this.usersService.findOneById(order.userId);
        order['user'] = user;
        order['deliveredAt'] = new Date();
        const insertedOrder = await this.orderRepository.save(order);
        console.log("insertedOrder order: ", order);
        products.length > 0 && products.map(async (item) => {
            const product = await this.productsService.findOne(item.id);
            const stock = product.balance - item.quantity;
            await this.productsService.updateBalance(product.id, { balance: stock });
            item['order'] = insertedOrder.id;
            item['product'] = item.id;
            item['id'] = 0;
            this.orderListRepository.save(item);
            return item;
        });
        const fcm_data = {
            notifi: {
                title: 'Alerta de pedido',
                content: user.names + " " + user.surnames + " envió una nueva solicitud."
            },
            data: {
                title: 'Alerta de pedido',
                content: user.names + " " + user.surnames + " envió una nueva solicitud."
            }
        };
        await this.fcmTokenService.sendFCM(fcm_data, 'NEW_ORDER');
        return { status: true };
    }
    async findOne(id) {
        const order = await this.orderRepository.findOne({
            relations: ['user'],
            where: { id },
            select: {
                user: {
                    id: true,
                    socketId: true,
                }
            }
        });
        const result = await this.orderListRepository.find({
            relations: ['product', 'order'],
            where: { order: { id } },
            select: {
                product: {
                    name: true,
                    price: true,
                    imageName: true,
                },
            }
        });
        const order_list = [];
        result.map(item => {
            let orderItem = {
                quantity: item.quantity,
                name: item.product.name,
                imageName: item.product.imageName,
                price: item.product.price,
                color: item.color
            };
            order_list.push(orderItem);
        });
        order['productList'] = order_list;
        return order;
    }
    async findOrderProducts() {
        return this.orderRepository.find({
            relations: ['user', 'orderList'],
            where: { delivered: false, type: 'product' },
            select: {
                id: true,
                user: {
                    names: true,
                    surnames: true,
                },
            }
        });
    }
    async findOrderServices() {
        return this.orderRepository.find({
            relations: ['user', 'orderList'],
            where: { delivered: false, type: 'service' },
            select: {
                id: true,
                user: {
                    names: true,
                    surnames: true,
                },
            }
        });
    }
    async findOrderAll() {
        return this.orderRepository.find({
            relations: ['user', 'orderList'],
            where: { delivered: false },
            select: {
                id: true,
                type: true,
                user: {
                    names: true,
                    surnames: true,
                },
            }
        });
    }
    async update(id, data) {
        return await this.orderRepository.update({ id }, data);
    }
    deliveryAction(id) {
        console.log("dilivery action: ", id);
        const data = { delivered: true, deliveredAt: new Date() };
        return this.orderRepository.update({ id }, data);
    }
    acceptAction(id) {
        const data = { accepted: true };
        return this.orderRepository.update({ id }, data);
    }
    async removeAction(id) {
        try {
            const orderProductKeys = await this.orderListRepository.find({ where: { order: { id } } });
            await Promise.all(orderProductKeys.map(async (item) => {
                await this.orderListRepository.delete(item.id);
            }));
            const order = await this.orderRepository.findOne({
                relations: ['user'],
                where: { id },
                select: {
                    user: {
                        id: true,
                        names: true,
                        surnames: true
                    }
                }
            });
            await this.orderRepository.delete(id);
            const fcm_data = {
                notifi: {
                    title: 'Alerta de pedido',
                    content: "Pedido de" + order.user.names + " " + order.user.surnames + " cancelado."
                },
                data: {
                    title: 'Alerta de pedido',
                    content: "Pedido de" + order.user.names + " " + order.user.surnames + " cancelado."
                }
            };
            await this.fcmTokenService.sendFCM(fcm_data, 'REMOVE_ORDER', order.user.id);
            return { status: true };
        }
        catch (err) {
            console.log("remove Order Err: ", err);
            return { status: false, err };
        }
    }
    receivedAction(id) {
        const data = { received: true, };
        return this.orderRepository.update({ id }, data);
    }
    getCompletedOrders(userid) {
        return this.orderRepository.find({
            where: { user: { id: userid }, delivered: true, received: false },
            select: {
                id: true,
                orderNumber: true,
                deliveredAt: true,
            }
        });
    }
    async generateOrderNumber(id) {
        const orderCount = await this.orderRepository.count({ where: { user: { id } } });
        console.log("generateOrderNumber: ", id, orderCount);
        return (new Date()).getFullYear() % 100 * 1000 + orderCount + 1 + id * 100000;
    }
    async registerBankAccount(createBankAccountDto) {
        createBankAccountDto['id'] = 1;
        const list = await this.bankAccountRepository.find();
        if (list.length > 0)
            return await this.bankAccountRepository.update(1, createBankAccountDto);
        else
            return await this.bankAccountRepository.save(createBankAccountDto);
    }
    async getBankAccount() {
        const result = await this.bankAccountRepository.find();
        return result;
    }
};
OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(orderlist_entity_1.OrderList)),
    __param(2, (0, typeorm_1.InjectRepository)(bankaccount_entity_1.BankAccount)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        users_service_1.UsersService,
        products_service_1.ProductsService,
        fcm_token_service_1.FcmTokenService])
], OrdersService);
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map