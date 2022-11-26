import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { Repository } from 'typeorm';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Favorite } from './entity/favorites.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
  ) {}

  setFavorite (data: any) {
    return this.favoriteRepository.save(data)
  }

  async getFavorite (data: CreateFavoriteDto) {
    try {
      const {productid, userid} = data
      const favorite = await this.favoriteRepository.findOne({ 
        // relation add
        where: {userid, product: {id: productid}} 
      })

      if(favorite)
        return true
      else
        return false
      
    } catch (err) {
      return { status: false}
    }
  }

  async getFavorites (userId: number)  {
    try {
      const result = await this.favoriteRepository.find({
        relations: ['product'],
        where: { userid: userId},
        select: {
          product: {
            id: true,
            imageName: true,
            name: true,
            price: true
          }
        }
      })
      return result.map(item => item.product)
    } catch (err) {
      return { status: false }
    }
  }

  async deleteFavorite (data: CreateFavoriteDto) {
    return await this.favoriteRepository.delete(data)
  }

}
