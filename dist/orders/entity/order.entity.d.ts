import { User } from 'src/users/entity/user.entity';
import { OrderList } from './orderlist.entity';
export declare class Order {
    id: number;
    orderNumber: number;
    name: string;
    idCard: string;
    homeDelivery: boolean;
    address: string;
    latitude: number;
    longitude: number;
    reference: string;
    payment: string;
    receipt: string;
    type: string;
    accepted: boolean;
    received: boolean;
    delivered: boolean;
    orderedAt: Date;
    deliveredAt: Date;
    orderList: OrderList[];
    user: User;
}
