import { CategoriesService } from 'src/categories/categories.service';
import { CreateFavoriteDto } from 'src/favorites/dto/create-favorite.dto';
import { UpdateResult } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entity/product.entity';
import { ProductsService } from './products.service';
export declare class ProductsController {
    private productsService;
    private categoriesService;
    constructor(productsService: ProductsService, categoriesService: CategoriesService);
    findFeaturedProducts(): Promise<Product[]>;
    findFeaturedServices(): Promise<Product[]>;
    uploadImage(body: any): Promise<{
        path: string;
    }>;
    uploadImageUri(body: any): {
        path: any;
    };
    create(createProductDto: CreateProductDto): Promise<any>;
    findAll(): Promise<Product[]>;
    filteredProducts(filterList: any): Promise<any>;
    getAllList(type: string): Promise<any>;
    findProducts(id: number): Promise<any>;
    update(id: number, updateProduct: any): Promise<UpdateResult>;
    delete(id: number): Promise<UpdateResult>;
    filteredServices(filterList: any): Promise<any>;
    findServices(id: number): Promise<any>;
    getProduct(id: number, request: any): Promise<Product>;
    setFavorite(info: CreateFavoriteDto): Promise<any>;
}
