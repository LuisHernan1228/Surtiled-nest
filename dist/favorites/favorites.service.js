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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const favorites_entity_1 = require("./entity/favorites.entity");
let FavoritesService = class FavoritesService {
    constructor(favoriteRepository) {
        this.favoriteRepository = favoriteRepository;
    }
    setFavorite(data) {
        return this.favoriteRepository.save(data);
    }
    async getFavorite(data) {
        try {
            const { productid, userid } = data;
            const favorite = await this.favoriteRepository.findOne({
                where: { userid, product: { id: productid } }
            });
            if (favorite)
                return true;
            else
                return false;
        }
        catch (err) {
            return { status: false };
        }
    }
    async getFavorites(userId) {
        try {
            const result = await this.favoriteRepository.find({
                relations: ['product'],
                where: { userid: userId },
                select: {
                    product: {
                        id: true,
                        imageName: true,
                        name: true,
                        price: true
                    }
                }
            });
            return result.map(item => item.product);
        }
        catch (err) {
            return { status: false };
        }
    }
    async deleteFavorite(data) {
        return await this.favoriteRepository.delete(data);
    }
};
FavoritesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(favorites_entity_1.Favorite)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FavoritesService);
exports.FavoritesService = FavoritesService;
//# sourceMappingURL=favorites.service.js.map