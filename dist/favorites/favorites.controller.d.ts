import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { FavoritesService } from './favorites.service';
export declare class FavoritesController {
    private favoriteService;
    constructor(favoriteService: FavoritesService);
    getFavorites(userId: number): Promise<import("../products/entity/product.entity").Product[] | {
        status: boolean;
    }>;
    deleteFavorite(setFavorite: CreateFavoriteDto): Promise<any>;
}
