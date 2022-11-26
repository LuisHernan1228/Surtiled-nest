import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor (
    private favoriteService: FavoritesService
  ) {}
  
  @Get(':userId')
  getFavorites(@Param('userId') userId: number) {
    const result = this.favoriteService.getFavorites(userId)
    return result
  }

  // @Post('')
  // setFavorite(@Body() setFavorite: CreateFavoriteDto): Promise<any> {
  //   const result = this.favoriteService.setFavorite(setFavorite)
  //   return result
  // }

  @Delete('')
  deleteFavorite(@Body() setFavorite: CreateFavoriteDto): Promise<any> {
    const result = this.favoriteService.deleteFavorite(setFavorite)
    return result
  }
}
