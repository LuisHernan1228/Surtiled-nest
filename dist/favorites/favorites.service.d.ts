import { Repository } from 'typeorm';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Favorite } from './entity/favorites.entity';
export declare class FavoritesService {
    private favoriteRepository;
    constructor(favoriteRepository: Repository<Favorite>);
    setFavorite(data: any): Promise<any>;
    getFavorite(data: CreateFavoriteDto): Promise<boolean | {
        status: boolean;
    }>;
    getFavorites(userId: number): Promise<import("../products/entity/product.entity").Product[] | {
        status: boolean;
    }>;
    deleteFavorite(data: CreateFavoriteDto): Promise<import("typeorm").DeleteResult>;
}
