import { Product } from 'src/products/entity/product.entity';
import { Order } from './order.entity';
export declare class OrderList {
    id: number;
    order: Order;
    product: Product;
    quantity: number;
    color: string;
}
