import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { FavoritesService } from 'src/favorites/favorites.service';
import { CreateFavoriteDto } from 'src/favorites/dto/create-favorite.dto';
import { CategoriesService } from 'src/categories/categories.service';
import { ProductColor } from './entity/productColor.entity';
import { FcmTokenService } from 'src/fcm-token/fcm-token.service';
export declare class ProductsService {
    private productRepository;
    private productColorRepository;
    private categoryService;
    private favoriteService;
    private fcmTokenService;
    constructor(productRepository: Repository<Product>, productColorRepository: Repository<ProductColor>, categoryService: CategoriesService, favoriteService: FavoritesService, fcmTokenService: FcmTokenService);
    create(createProductDto: any): Promise<any>;
    imgUpload(data: string, format: string): Promise<{
        path: string;
    }>;
    findOne(id: number): Promise<Product | undefined>;
    findAll(): Promise<Product[]>;
    addColor(list: string[], product: any): Promise<import("typeorm").InsertResult[]>;
    findProducts(id: number): Promise<any>;
    filterProducts(filtterList: any): Promise<any>;
    filterServices(filtterList: any): Promise<any>;
    findServices(id: number): Promise<any>;
    findProduct(id: number, userid: number): Promise<any>;
    featuredAll(type: any): Promise<Product[]>;
    update(id: number, data: any): Promise<import("typeorm").UpdateResult>;
    updateBalance(id: number, data: any): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").UpdateResult>;
    setFavorite(info: CreateFavoriteDto): Promise<any>;
    getAllList(type: string): Promise<Product[] | {
        status: boolean;
    }>;
}
