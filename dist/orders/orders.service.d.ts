import { Repository } from 'typeorm';
import { Order } from './entity/order.entity';
import { OrderList } from './entity/orderlist.entity';
import { BankAccount } from './entity/bankaccount.entity';
import { CreateBankAccountDto } from './dto/create-bankaccount.dto';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { FcmTokenService } from 'src/fcm-token/fcm-token.service';
export declare class OrdersService {
    private orderRepository;
    private orderListRepository;
    private bankAccountRepository;
    private usersService;
    private productsService;
    private fcmTokenService;
    constructor(orderRepository: Repository<Order>, orderListRepository: Repository<OrderList>, bankAccountRepository: Repository<BankAccount>, usersService: UsersService, productsService: ProductsService, fcmTokenService: FcmTokenService);
    create(createOrderDto: any): Promise<{
        status: boolean;
    }>;
    findOne(id: number): Promise<any | undefined>;
    findOrderProducts(): Promise<Order[]>;
    findOrderServices(): Promise<Order[]>;
    findOrderAll(): Promise<Order[]>;
    update(id: number, data: any): Promise<import("typeorm").UpdateResult>;
    deliveryAction(id: number): Promise<import("typeorm").UpdateResult>;
    acceptAction(id: number): Promise<import("typeorm").UpdateResult>;
    removeAction(id: number): Promise<{
        status: boolean;
        err?: undefined;
    } | {
        status: boolean;
        err: any;
    }>;
    receivedAction(id: number): Promise<import("typeorm").UpdateResult>;
    getCompletedOrders(userid: number): Promise<Order[]>;
    generateOrderNumber(id: number): Promise<number>;
    registerBankAccount(createBankAccountDto: CreateBankAccountDto): Promise<import("typeorm").UpdateResult | (CreateBankAccountDto & BankAccount)>;
    getBankAccount(): Promise<CreateBankAccountDto[]>;
}
