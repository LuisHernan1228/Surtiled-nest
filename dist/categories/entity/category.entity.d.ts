import { Product } from 'src/products/entity/product.entity';
export declare class Category {
    id: number;
    label: string;
    imgUrl: string;
    type: string;
    active: boolean;
    products: Product[];
}
