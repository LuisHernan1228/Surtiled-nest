import { Category } from 'src/categories/entity/category.entity';
import { Favorite } from 'src/favorites/entity/favorites.entity';
import { OrderList } from 'src/orders/entity/orderlist.entity';
import { ProductColor } from './productColor.entity';
export declare class Product {
    id: number;
    name: string;
    code: string;
    characteristic: string;
    imageName: string;
    price: number;
    balance: number;
    color: string;
    featured: boolean;
    type: string;
    score: number;
    reviewNumber: number;
    active: boolean;
    createdAt: Date;
    category: Category;
    orderList: OrderList[];
    favorites: Favorite[];
    productColor: ProductColor[];
}
